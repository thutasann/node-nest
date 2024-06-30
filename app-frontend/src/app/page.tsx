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
import { fetchTest } from '@/lib/actions/test-actions';

export default async function Home() {
	const data = await fetchTest();
	return (
		<main className="min-h-screen">
			<div className="flex justify-center items-center py-2 bg-primary-foreground mb-6 gap-2">
				<span className="text-lg font-bold">Node Kafka</span> <ModeToggle />
			</div>

			<h1 className="text-xl font-bold">{data.message}</h1>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Invoice</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Method</TableHead>
						<TableHead className="text-right">Amount</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell className="font-medium">INV001</TableCell>
						<TableCell>Paid</TableCell>
						<TableCell>Credit Card</TableCell>
						<TableCell className="text-right">$250.00</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</main>
	);
}
