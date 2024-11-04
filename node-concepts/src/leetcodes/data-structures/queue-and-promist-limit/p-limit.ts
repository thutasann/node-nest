import Queue from './queue';

/**
 * Any function
 */
type AnyFunction = (...args: any[]) => any;

/**
 * Limits the concurrency of the input function
 * @param concurrency - The concurrency
 * @returns A function that limits the concurrency of the input function
 *
 * @example
 * ```ts
 * // define concurrency limit
 * const limit = pLimit(5);
 * // mock user ids
 * const userIds = Array.from({ length: 10 }, (_, i) => i + 1);
 * // fetch user data
 * const run = async () => {
 * 	const results = await Promise.all(
 * 		userIds.map((userId) => limit(() => fetchUserData(userId))),
 * 	);
 * 	console.log('All user data fetched:', results);
 * };
 * // run
 * run().catch(console.error);
 * ```
 */
export default function pLimit<T extends AnyFunction>(concurrency: number) {
	validateConcurrency(concurrency);

	const queue = new Queue<() => void>();
	let activeCount = 0;

	/**
	 * Resumes the next function in the queue
	 */
	const resumeNext = (): void => {
		if (activeCount < concurrency && queue.size > 0) {
			queue.dequeue()?.();
			activeCount++;
		}
	};

	/**
	 * Decrements the active count and resumes the next function in the queue
	 */
	const next = (): void => {
		activeCount--;
		resumeNext();
	};

	/**
	 * Runs the function
	 * @param function_ - The function to run
	 * @param resolve - The resolve function
	 * @param arguments_ - The arguments
	 */
	const run = async (
		function_: T,
		resolve: (value: ReturnType<T> | PromiseLike<ReturnType<T>>) => void,
		arguments_: Parameters<T>,
	): Promise<void> => {
		const result = (async () => function_(...arguments_))();
		resolve(result);

		try {
			await result;
		} catch {}

		next();
	};

	/**
	 * Enqueues the function
	 * @param function_ - The function to enqueue
	 * @param resolve - The resolve function
	 * @param arguments_ - The arguments
	 */
	const enqueue = (
		function_: T,
		resolve: (value: ReturnType<T>) => void,
		arguments_: Parameters<T>,
	): void => {
		new Promise<void>((internalResolve) => {
			queue.enqueue(internalResolve);
		}).then(() => run(function_, resolve, arguments_));

		(async () => {
			await Promise.resolve();

			if (activeCount < concurrency) {
				resumeNext();
			}
		})();
	};

	/**
	 * Generates a function that limits the concurrency of the input function
	 * @param args - The arguments
	 * @returns A function that limits the concurrency of the input function
	 */
	const generator = (...args: Parameters<T>): Promise<ReturnType<T>> => {
		return new Promise((resolve) => {
			enqueue(args[0] as T, resolve, args.slice(1) as Parameters<T>);
		});
	};

	/**
	 * Defines the properties of the generator
	 */
	Object.defineProperties(generator, {
		activeCount: {
			get: () => activeCount,
		},
		pendingCount: {
			get: () => queue.size,
		},
		clearQueue: {
			value: () => queue.clear(),
		},
		concurrency: {
			get: () => concurrency,
			set(newConcurrency: number) {
				validateConcurrency(newConcurrency);
				concurrency = newConcurrency;

				queueMicrotask(() => {
					while (activeCount < concurrency && queue.size > 0) {
						resumeNext();
					}
				});
			},
		},
	});

	return generator;
}

/**
 * Validate the concurrency
 * @param concurrency - The concurrency
 * @description The concurrency must be a number from 1 and up
 * @internal
 */
function validateConcurrency(concurrency: number): void {
	if (
		!(
			Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY
		) ||
		concurrency <= 0
	) {
		throw new TypeError('Expected `concurrency` to be a number from 1 and up');
	}
}
