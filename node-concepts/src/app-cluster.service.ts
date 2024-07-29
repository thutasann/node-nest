// @ts-nocheck
import * as cluster from 'cluster';
import * as os from 'os';
import { Injectable } from '@nestjs/common';

const numCPUs = os.cpus().length;

/**
 * App Cluster Service
 * @description
 * - the cluster module allows nodejs to spawn multiple processes
 * - that can share the same server port and handle the incoming requests
 * - each processes runs on a separate CPU core
 * @example
 * - high availability of services
 * - little to no downtime
 * - basic scalability based on demand
 * @link https://www.youtube.com/watch?v=bRZTvCwcp20&list=PL5Lsd0YA4OMGN86vWiW7O52izu-cTxcS3&index=4
 */
@Injectable()
export class AppClusterService {
	static clusterize(callback: Function): void {
		if (cluster.isMaster) {
			console.log(`Master server started on ${process.pid}`);
			for (let i = 0; i < numCPUs; i++) {
				cluster.fork();
			}
			cluster.on('exit', (worker, code, signal) => {
				console.log(`Worker ${worker.process.pid} died. Restarting`);
				cluster.fork();
			});
		} else {
			console.log(`Cluster server started on ${process.pid}`);
			callback();
		}
	}
}
