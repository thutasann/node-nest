# Nodejs Kafka Microservices with Elastic Search

This is the tiny microservices with Kafka and elastic search from scratch.

> This repo is mainly focused on Backend.

## Tech Stacks

- Nodejs
- Kafka
- Elastic Search
- Prisma
- Graphql
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
