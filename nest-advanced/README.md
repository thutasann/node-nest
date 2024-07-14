# Nestjs Advanced

This is the project where nestjs + nx + pnpm workspace was created from scratch.

## Sources

- [nestjs advanced course](https://www.youtube.com/watch?v=YQQroQPDW38&list=PLIGDNOJWiL1-8hpXEDlD1UrphjmZ9aMT1)

## TechStacks

- Nestjs
- NX Workspace
- PNPM Workspace

## Scripts

### Change Dir to Root

```bash
cd nest-advanced
```

### Build All

```bash
pnpm run build-all
```

### Docker Compose

```bash
docker-compose up
```

### TypeOrm migrations

```bash
cd 01-nestjs-baseline-rest-apis
npm run migration:create --name users
npm run migration:run
```

## Swagger

- http://localhost:3010/docs
