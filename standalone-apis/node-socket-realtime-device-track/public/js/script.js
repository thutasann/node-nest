const socket = io();

if (navigator.geolocation) {
	navigator.geolocation.watchPosition(
		(position) => {
			const { latitude, longitude } = position.coords;
			socket.emit('send:location', { latitude, longitude });
		},
		(error) => {
			console.error('watch position error : ', error.message);
		},
		{
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0,
		},
	);
}

// map set view
const map = L.map('map').setView([0, 0], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Singapore',
}).addTo(map);

/** makers map */
const markers = {};

socket.on('receive:location', (res) => {
	const { id, latitude, longitude } = res;
	map.setView([latitude, longitude], 16);
	if (markers[id]) {
		markers[id].setLatLng([latitude, longitude]);
	} else {
		markers[id] = L.marker([latitude, longitude]).addTo(map);
	}
});

socket.on('user:disconnect', (id) => {
	if (markers[id]) {
		map.removeLayer(markers[id]);
		delete markers[id];
	}
});

console.log('markers', Object.keys(markers));
