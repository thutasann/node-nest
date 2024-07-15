import express, {
	type NextFunction,
	type Request,
	type Response,
} from 'express';
import { CatalogService } from '../services/catalog.service';
import { CatalogRepository } from '../repository/catalog.repository';
import { RequestValidator } from '../utils/requestValidator';
import { CreateProductRequest, UpdateProductRequest } from '../dto/product.dto';
import { IGetProductsQuery, IGetSingleProductParams } from '../dto/catalog.dto';
import { logger } from '../utils/logger';
import { formatDate } from '../utils';

const router = express.Router();

export const catalogService = new CatalogService(new CatalogRepository());

router.get('/example', (req: Request, res: Response) => {
	const message = `Hello, world! ${formatDate(new Date())}`;
	logger.info(`message : ${message}`);
	res.json({ message });
});

router.post('/products', async (req: Request, res: Response) => {
	try {
		const { errors, input } = await RequestValidator(
			CreateProductRequest,
			req.body,
		);
		if (errors) return res.status(400).json(errors);
		const data = await catalogService.createProduct(input);
		if (data && data.id) {
			return res.status(201).json(data);
		}
	} catch (err) {
		const error = err as Error;
		return res.status(500).json(error.message);
	}
});

router.patch(
	'/products/:id',
	async (req: Request<IGetSingleProductParams>, res: Response) => {
		try {
			const id = req.params.id;
			const { errors, input } = await RequestValidator(
				UpdateProductRequest,
				req.body,
			);
			if (errors) return res.status(400).json(errors);

			const data = await catalogService.updateProduct({ id, ...input });
			return res.status(200).json(data);
		} catch (error) {
			const err = error as Error;
			console.log('err.message', err.message);
			return res.status(500).json(err.message);
		}
	},
);

router.get(
	'/products',
	async (req: Request<{}, {}, {}, IGetProductsQuery>, res: Response) => {
		const limit = Number(req.query['limit']);
		const offset = Number(req.query['offset']);
		try {
			const data = await catalogService.getProducts(limit, offset);
			return res.status(200).json(data);
		} catch (error) {
			const err = error as Error;
			return res.status(500).json(err.message);
		}
	},
);

router.get(
	'/products/:id',
	async (
		req: Request<IGetSingleProductParams>,
		res: Response,
		next: NextFunction,
	) => {
		const id = req.params.id;
		try {
			const data = await catalogService.getProduct(id);
			return res.status(200).json(data);
		} catch (error) {
			return next(error);
		}
	},
);

router.delete(
	'/products/:id',
	async (req: Request<IGetSingleProductParams>, res: Response) => {
		const id = req.params.id;
		try {
			const data = await catalogService.deleteProduct(id);
			return res.status(200).json(data);
		} catch (error) {
			const err = error as Error;
			return res.status(500).json(err.message);
		}
	},
);

export default router;
