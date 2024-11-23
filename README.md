# Nodejs/Nestjs Server side Developments

These are the microservices and server side developments with Nestjs and Nodejs

## Tech Stacks

- Nodejs
- Nestjs
- Nx Workspace
- Mongoose
- TypeORM
- Prisma
- MongoDB
- Postgres
- Docker
- Jest
- Nextjs

## Deployed URLs

- [Nodejs Concepts](https://nodejs-concepts.onrender.com)

## Table of Contents

| Topic                             | Source                                                         | Type                               |
| --------------------------------- | -------------------------------------------------------------- | ---------------------------------- |
| nodejs concepts                   | [Source](./node-concepts/)                                     | ⭐️ Nodejs concepts                |
| nestjs-graphql-ms                 | [Source](./nest-graphql-ms/)                                   | ⭐️ Nestjs + Graphql Microservices |
| nestjs-ecommerce                  | [Source](./nest-ecommerce/)                                    | ⭐️ Nestjs Ecommerce FullStack     |
| nest-advanced                     | [Source](./nest-advanced)                                      | ⭐️ Nestjs + Nx Concepts           |
| tiny nest + next                  | [Source](./tiny-nest-next/)                                    | Tiny Nestjs + Nextjs               |
| nestjs-websockets                 | [Source](./standalone-apis/nestjs-websockets/)                 | Nestjs + Websockets                |
| nestjs-ai-chatbot                 | [Source](./standalone-apis/nestjs-ai-chatbot/)                 | Nestjs + OpenAI + Nextjs           |
| scaling ws using redis            | [Source](./standalone-apis/scaling-web-sockets-using-redis/)   | Nodejs + Redis                     |
| pure nodejs concepts              | [Source](./standalone-apis/pure-nodejs-concepts)               | Nodejs                             |
| custom mini ssg                   | [Source](./custom-static-side-generators/sample-one/)          | Static Side Generator              |
| nodejs cpanel file upload         | [Source](./standalone-apis/node-cpanel/)                       | Cpanel File upload                 |
| socketio realtime device track    | [Source](./standalone-apis/node-socket-realtime-device-track/) | Socket.io Realtime Device Track    |
| nestjs PM2                        | [Source](./standalone-apis/nest-pm2)                           | Nodejs Worker Threads & PM2        |
| nestjs kafka sample               | [Source](./standalone-apis/nest-kafka-sample)                  | Nestjs Kakfa sample                |
| nestjs kafka microservices sample | [Source](./standalone-apis/nest-kafka-microservices)           | Nestjs Kakfa Microservices         |

## Tips & Tricks

### Express Router Global Snippet in VS Code

```json
{
	"Typescript Express Router": {
		"scope": "javascript,typescript",
		"prefix": "router",
		"body": [
			"router.post(\"/\", (req : Request,res : Response) => {",
			"return res.json({})",
			"})"
		],
		"description": "typescript nodejs router"
	}
}
```
