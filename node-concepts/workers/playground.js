// ---------------- playground file ----------------

Promise.resolve().then(() => console.log('this is promice.resolve 1'));
process.nextTick(() => console.log('this is process.nextTick 1'));
