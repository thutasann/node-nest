# Servers (Monorepo)

## TechStacks

- Graphql
- Apollo Client
- Prisma
- MongoDb

## Scripts

### Run Services

```bash
yarn start:dev <service-name>
```

### Build Services

```bash
yarn build <service-name>
```

### Prisma

```bash
npx prisma format
```

```bash
npx prisma generate
```

```bash
npx prisma db push
```

```bash
npx prisma db studio
```

### Graphql

- http://localhost:4001/graphql

```graphql
query UserQuery {
	getUsers {
		name
	}
}
```

```
mutation {
  register(
    registerInput: {
      name: "thuta sann"
      email: "test@gmail.com"
      password: "test123test"
    }
  ) {
    user {
      id
      name
      email
      password
      avatar {
        id
        public_id
        url
      }
      role
      createdAt
      updatedAt
    }
  }
}

```

## Resources

- https://www.apollographql.com/docs/federation/
