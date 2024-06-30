import ProductsTable from '@/components/general/products-table';
import { fetchTest, getProducts } from '@/lib/actions/catalog-actions';

export default async function Home() {
	const data = await fetchTest();
	const products = await getProducts();

	return (
		<main className="min-h-screen">
			<h1 className="text-xl font-bold text-center">{data.message}</h1>
			<ProductsTable products={products} />
		</main>
	);
}
