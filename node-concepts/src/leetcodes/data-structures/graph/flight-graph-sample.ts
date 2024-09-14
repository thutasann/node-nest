/** Airport Props */
type Airport = string;

export class FlightGraph {
	private adjacencyList: Map<Airport, { airport: Airport; distance: number }[]>;

	constructor() {
		this.adjacencyList = new Map();
	}

	/** Add Flight */
	addFlight(airport1: Airport, airport2: Airport, distance: number): void {
		if (!this.adjacencyList.has(airport1)) this.addAirport(airport1);
		if (!this.adjacencyList.has(airport2)) this.addAirport(airport2);

		this.adjacencyList.get(airport1).push({
			airport: airport2,
			distance,
		});

		this.adjacencyList.get(airport2).push({
			airport: airport1,
			distance,
		});
	}

	/** Get All Flights */
	getAllFlights(): void {
		console.log('this.adjacencyList', this.adjacencyList);
		this.adjacencyList.forEach((flights, airport) => {
			console.log(`Airport => ${airport} has flights to : `);
			flights.forEach(({ airport: dest, distance }) => {
				console.log(` - ${dest} (${distance} km)`);
			});
		});
	}

	/** Find Shortest Route using BFS */
	findShortestFlight(start: Airport, destination: Airport): Airport[] {
		const visited = new Set<Airport>();
		const queue: [Airport, Airport[]][] = [[start, [start]]];

		while (queue.length > 0) {
			const [currentAirport, path] = queue.shift();
			if (currentAirport === destination) return path;

			if (!visited.has(currentAirport)) {
				visited.add(currentAirport);

				const neighbors = this.adjacencyList.get(currentAirport);
				for (const neighbor of neighbors) {
					queue.push([neighbor.airport, [...path, neighbor.airport]]);
				}
			}
		}

		return [];
	}

	/** Add Airport */
	private addAirport(airport: Airport): void {
		if (!this.adjacencyList.has(airport)) {
			this.adjacencyList.set(airport, []);
		}
	}
}

// Usage Sample :

const flightGraph = new FlightGraph();

flightGraph.addFlight('New York', 'Los Angeles', 4500);
flightGraph.addFlight('New York', 'Chicago', 1200);
flightGraph.addFlight('Chicago', 'Los Angeles', 3000);
flightGraph.addFlight('Chicago', 'Houston', 1500);
flightGraph.addFlight('Los Angeles', 'Houston', 2500);
flightGraph.addFlight('Houston', 'Miami', 1800);

flightGraph.getAllFlights();

const shortestFlight = flightGraph.findShortestFlight('New York', 'Miami');
console.log('Shortest flight route from New York to Miami:', shortestFlight);
