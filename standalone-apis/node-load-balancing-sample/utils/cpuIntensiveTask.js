/**
 * Perform a CPU-intensive task
 * @returns {Promise<number>} - Result of the computation
 */
const cpuIntensiveTask = async () => {
	return new Promise((resolve) => {
		let result = 0;
		for (let i = 0; i < 1e7; i++) {
			result += Math.sqrt(i) * Math.sin(i); // Example computational workload
		}
		resolve(result);
	});
};

module.exports = cpuIntensiveTask;
