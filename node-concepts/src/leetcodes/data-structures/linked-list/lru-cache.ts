class LRUCache<K, V> {
	private capacity: number;
	private cache: Map<K, V>;

	/**
	 * LRU Cache
	 * @param capacity - cache capacity
	 */
	constructor(capacity: number) {
		this.capacity = capacity;
		this.cache = new Map<K, V>();
	}

	get(key: K): V | undefined {
		if (!this.cache.has(key)) return undefined;

		const value = this.cache.get(key);
		// move the accessed key to the end to mark it as most recently used
		this.cache.delete(key);
		this.cache.set(key, value);
		return value;
	}

	set(key: K, value: V) {
		if (this.cache.has(key)) {
			this.cache.delete(key);
		} else if (this.cache.size >= this.capacity) {
			const lastRecentlyUsedKey = this.cache.keys().next().value;
			this.cache.delete(lastRecentlyUsedKey);
		}
		this.cache.set(key, value);
	}

	has(key: K): boolean {
		return this.cache.has(key);
	}

	delete(key: K): boolean {
		return this.cache.delete(key);
	}

	size(): number {
		return this.cache.size;
	}

	clear(): void {
		this.cache.clear();
	}
}

const lruCache = new LRUCache<string, number>(3);
lruCache.set('a', 1);
lruCache.set('b', 2);
lruCache.set('c', 3);
console.log('a --> ', lruCache.get('a'));
lruCache.set('d', 4); // Removes "b" (least recently used)
console.log('b --> ', lruCache.get('b')); // undefined
console.log(lruCache.get('c')); // 3
console.log(lruCache.get('d')); // 4
