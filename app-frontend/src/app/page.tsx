import { ModeToggle } from '@/components/general/toggle';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { fetchTest, getProducts } from '@/lib/actions/test-actions';

export default async function Home() {
	const data = await fetchTest();
	const products = await getProducts();

	return (
		<main className="min-h-screen">
			<h1 className="text-xl font-bold text-center">{data.message}</h1>

			<Table className="mt-4 border">
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Name</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Price</TableHead>
						<TableHead className="text-right">Stock</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products &&
						products.map((prod) => (
							<TableRow key={prod.id}>
								<TableCell
									width={300}
									className="font-medium"
								>
									{prod.name}
								</TableCell>
								<TableCell>{prod.description.slice(0, 60)}...</TableCell>
								<TableCell>$ {prod.price}</TableCell>
								<TableCell className="text-right">{prod.stock}</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</main>
	);
}
