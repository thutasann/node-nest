# NODE CONCEPTS

In this section, nodejs concepts will be included.

## Concepts

- Blocking vs Non-Blocking
- Concurrency

## Sources

- https://nodejs.org/en/learn/asynchronous-work/overview-of-blocking-vs-non-blocking
- https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick
- https://nodejs.org/en/learn/asynchronous-work/javascript-asynchronous-programming-and-callbacks

## Scipts

### Watch Run

```
yarn start:dev
```

### AutoCannon

[Source](https://www.npmjs.com/package/autocannon)

```bash
npm i autocannon -g
```

```bash
autocannon localhost:3000/promises -c 10000 -t 30 -d 60
```

### Check CPU in mac

```bash
top
```
