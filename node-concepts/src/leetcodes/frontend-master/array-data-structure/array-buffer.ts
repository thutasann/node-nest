class ArrayBufferSamples {
	public sampleOne() {
		/** buffer of 16 bytes */
		const buffer = new ArrayBuffer(16);

		/** create a view for the buffer as an 8-int integer array */
		const int8View = new Int8Array(buffer);

		int8View[0] = 100;
		int8View[1] = -30;

		console.log('int8View', int8View);

		const float32View = new Float32Array(buffer);
		console.log('float32View', float32View);
	}

	public dataView() {
		const buffer = new ArrayBuffer(16);
		const dataView = new DataView(buffer);
		dataView.setInt8(0, 42);
		dataView.setInt16(1, 65535, true);

		// Read the data back
		const int8 = dataView.getInt8(0);
		const uint16 = dataView.getUint16(1, true);

		console.log('dataView int8', int8);
		console.log('dataView uint16', uint16);
	}

	public copyABuffer() {
		const buffer16 = new ArrayBuffer(16);
		const view8 = new Uint8Array(buffer16);
		view8.set([10, 20, 30, 40, 50]);
		console.log('view8', view8);

		const newBuffer = buffer16.slice(0, 5);
		console.log('newBuffer', newBuffer);
		const newView = new Uint8Array(newBuffer);
		console.log('newView ', newView); // Uint8Array(5) [10, 20, 30, 40, 50]
	}

	public convertStringToArrayBuffer() {
		const encoder = new TextEncoder();
		const encodedData = encoder.encode('Hello, World!');
		console.log('encodedData', encodedData);
	}
}

const arrayBufferSamples = new ArrayBufferSamples();

arrayBufferSamples.sampleOne();
arrayBufferSamples.dataView();
arrayBufferSamples.copyABuffer();
arrayBufferSamples.convertStringToArrayBuffer();
