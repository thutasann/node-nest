# Nodejs Microservices with Elastic Search

This is the tiny two microservices with Nodejs from scratch

> This repo is mainly focused on Backend.

## Tech Stacks

- Nodejs
- Prisma
- MongoDB
- Jest
- Nextjs

## Deployed URLs

- [Frontend](https://node-kafka-ms.vercel.app/)
- [Catalog Service](https://node-kafka-catalog.onrender.com/api/v1/catalog)

## Folder Structure

```bash
└───node-kafka
  |    ├───app-backend
  |    |   ├───catalog_service
  |    |   ├───order_service
  |    ├───app-frontend
```

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
