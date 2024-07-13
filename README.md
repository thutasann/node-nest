# Nodejs/Nestjs Microservices

These are the microservices and server side developments with Nestjs and Nodejs

## Tech Stacks

- Nodejs
- Nestjs
- Nx Workspace
- TypeORM
- Prisma
- MongoDB
- Postgres
- Docker
- Jest
- Nextjs

## Deployed URLs

- [Standalone Frontend](https://node-ms.vercel.app/)
- [Standalone Catalog Service](https://node-kafka-catalog.onrender.com/api/v1/catalog)

## Table of Contents

| Topic             | Source                        | Type                       |
| ----------------- | ----------------------------- | -------------------------- |
| app-backend       | [Source](./app-backend/)      | Standalone Nodejs Server   |
| app-frontend      | [Source](./app-frontend)      | Standalone Nextjs Frontned |
| nest-advanced     | [Source](./nest-advanced)     | Nestjs + Nx Concepts       |
| nestjs-websockets | [Source](./nestjs-websockets) | Nestjs + Websockets        |

## Scripts

### Prisma

```bash
npx prisma init
```

```bash
npx prisma generate
```

### Jest

```bash
yarn jest --init
```

```bash
yarn test
```

```bash
yarn test catalog_service/src/routes/__test__/catalog.route.test.ts
```

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
