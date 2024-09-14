/** a contiguous piece of memory */
const arrayBuffer = new ArrayBuffer(6);

/**
 * create views into this data
 * - eight bit array
 */
const a8 = new Uint8Array(arrayBuffer);
a8[0] = 45;
a8[2] = 45;

const a16 = new Uint16Array(arrayBuffer);
a16[2] = 0x4545;

console.log('arrayBuffer', arrayBuffer);

console.log(a16[2]);
