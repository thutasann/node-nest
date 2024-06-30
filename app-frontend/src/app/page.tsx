import ProductsTable from '@/components/general/products-table';
import { getProducts } from '@/lib/actions/catalog-actions';

export default async function Home() {
	const products = await getProducts();
	return <ProductsTable products={products} />;
}
