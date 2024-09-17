/**
 * ## Monitorying network traffic for detecting unusual activity
 * - an application that monitors network traffic and measures the amount of data transmitted over a network in each second
 * - The goal is to detect if the network is under a heavy load by identifying the maximum amount of data transferred over any 5-second window.
 * ### Problem
 * - You have a stream of data representing the amount of traffic (in MB) transmitted per second
 * - you want to find the maximum traffic in any 5-second window.
 * ### Solution
 * - use the sliding window pattern to sum up the traffic over 5 seconds,
 * - then slide the window by one second at a time, keeping track of the maximum traffic in each 5-second period.
 */
export abstract class NetworkTrafficMonitoring {
	/**
	 * Max Traffic in 5-second Window
	 * @param traffic - MB per second traffic oever 10 seconds
	 * @param windowSize - Monitor 5-second windows
	 */
	public static maxTrafficInWindow(
		traffic: number[],
		windowSize: number,
	): number {
		let maxTraffic = 0;
		let currentWindowTraffic = 0;

		// Initialize the window with the first `windowSize` seconds of traffic
		for (let i = 0; i < windowSize; i++) {
			currentWindowTraffic += traffic[i];
		}

		maxTraffic = currentWindowTraffic;

		// Slide the window across the traffic data
		for (let i = windowSize; i < traffic.length; i++) {
			// Update the window by subtracting the outgoing traffic and adding the new incoming traffic
			currentWindowTraffic += traffic[i] - traffic[i - windowSize];
			maxTraffic = Math.max(maxTraffic, currentWindowTraffic);
		}

		return maxTraffic;
	}
}
