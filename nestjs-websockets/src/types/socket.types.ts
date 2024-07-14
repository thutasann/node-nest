/**
 * Socket.io with Typescript
 * @link https://socket.io/docs/v4/typescript/#types-for-the-server
 */
export class SocketIOWithTypescript {}

/**
 * Server To Client Events
 * @description The events declared in the ServerToClientEvents interface are used when sending and broadcasting events:
 */
export interface ServerToClientEvents {
	noArg: () => void;
	basicEmit: (a: number, b: string, c: Buffer) => void;
	withAck: (d: string, callback: (e: number) => void) => void;
	onMessage: (payload: { msg: string; content: any }) => void;
}

/**
 * Client to Server Events
 * @description The ones declared in the ClientToServerEvents interface are used when receiving events:
 */
export interface ClientToServerEvents {
	hello: () => void;
}

/**
 * Inter Server Events
 * @description The ones declared in the InterServerEvents interface are used for inter-server communication
 */
export interface InterServerEvents {
	ping: () => void;
}

/**
 * Socket Data
 * @description SocketData type is used to type the socket.data
 */
export interface SocketData {
	name: string;
	age: number;
}
