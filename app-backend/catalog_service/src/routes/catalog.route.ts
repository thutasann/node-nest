import express, {
	type NextFunction,
	type Request,
	type Response,
} from 'express';
import { CatalogService } from '../services/catalog.service';
import { CatalogRepository } from '../repository/catalog.repository';
import { error } from 'console';
import { RequestValidator } from '../utils/requestValidator';
import { CreateProductRequest } from '../dto/product.dto';

const router = express.Router();

export const catalogService = new CatalogService(new CatalogRepository());

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
