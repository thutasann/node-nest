import { createAtom } from './atom';

const [message, { watch, update }] = createAtom('Hello');

console.log('current message', message);

watch((newMessage) => {
	console.log('newMessage ', newMessage);
});

update((oldMessage) => `${oldMessage} World`);
