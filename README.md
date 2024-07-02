# Nodejs/Nestjs Microservices

These are the microservices and backend developments with Nestjs and Nodejs

## Tech Stacks

- Nodejs
- Nestjs
- Prisma
- MongoDB
- Jest
- Nextjs

## Deployed URLs

- [Standalone Frontend](https://node-ms.vercel.app/)
- [Standalone Catalog Service](https://node-kafka-catalog.onrender.com/api/v1/catalog)

## Folder Structure

```bash
└───root
  |    ├───app-backend
  |    |   ├───catalog_service
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
