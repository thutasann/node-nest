import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';

@Controller('cluster')
@ApiTags('performance')
export class ClusterController {
	@Get('/')
	welcomeCluster() {
		return 'Welcome From Cluster Controller';
	}

	@Get('/heavy')
	heavy(@Res() res: Response) {
		let total = 0;
		for (let i = 0; i < 50_000_000; i++) {
			total++;
		}
		res.send(`The result of the CPU intensive tasks is ${total}\n`);
	}
}
