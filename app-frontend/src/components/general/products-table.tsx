import React from 'react';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { IProduct } from '@/dto/IProduct';

function ProductsTable({ products }: { products: IProduct[] }) {
	return (
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
	);
}

export default ProductsTable;
