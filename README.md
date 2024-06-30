# Nodejs Kafka Microservices with Elastic Search

This is the tiny microservices with Kafka and elastic search from scratch.

> This repo is mainly focused on Backend.

## Tech Stacks

- Nodejs
- Kafka
- Elastic Search
- Prisma
- Graphql
- Mysql
- Nextjs

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

## Tips & Tricks

### Express Router Global Snippet in VS Code

```json
{
	// Place your global snippets here. Each snippet is defined under a snippet name and has a scope, prefix, body and
	// description. Add comma separated ids of the languages where the snippet is applicable in the scope field. If scope
	// is left empty or omitted, the snippet gets applied to all languages. The prefix is what is
	// used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders.
	// Placeholders with the same ids are connected.
	// Example:
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
