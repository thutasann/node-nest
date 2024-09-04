type CityAdjacencyList = {
	[city: string]: string[];
};

const flightRoutes: CityAdjacencyList = {
	'New York': ['Los Angeles', 'Chicago', 'Miami'],
	'Los Angeles': ['New York', 'San Francisco', 'Las Vegas'],
	Chicago: ['New York', 'Dallas', 'Miami'],
	Miami: ['New York', 'Chicago', 'Houston'],
	'San Francisco': ['Los Angeles', 'Seattle'],
	'Las Vegas': ['Los Angeles', 'Denver'],
	Dallas: ['Chicago', 'Houston'],
	Houston: ['Miami', 'Dallas'],
	Seattle: ['San Francisco'],
};

/** Function to add a new flight route between two cities */
function addFlightRoute(
	flightRoutes: CityAdjacencyList,
	city1: string,
	city2: string,
): void {
	if (!flightRoutes[city1]) flightRoutes[city1] = [];
	if (!flightRoutes[city2]) flightRoutes[city2] = [];

	flightRoutes[city1].push(city2);
	flightRoutes[city2].push(city1);
}

addFlightRoute(flightRoutes, 'Boston', 'New York');
console.log(flightRoutes);
