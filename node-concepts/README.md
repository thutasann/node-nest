# NODE CONCEPTS

In this section, nodejs, nestjs concepts will be included. Here is the Deployed URL - [Nodejs Concepts](https://nodejs-concepts.onrender.com)

## Concepts

- Blocking vs Non-Blocking
- MultiThreading
- Concurrency
- Horizontal Scaling (with K8S multiple instances)
- Async LocalStorage
- Event and Task Scheduling

## Sources

- https://nodejs.org/en/learn/asynchronous-work/overview-of-blocking-vs-non-blocking
- https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick
- https://nodejs.org/en/learn/asynchronous-work/javascript-asynchronous-programming-and-callbacks

## Scipts

### Watch Run

```
yarn start:dev
```

```bash
autocannon localhost:3000/promises -c 10000 -t 30 -d 60
```

### Docker

```bash
docker build -t nodejs-concepts -f Dockerfile .
```

```bash
docker tag nodejs-concepts thutasann/nodejs-concepts:latest
```

```bash
docker push thutasann/nodejs-concepts:latest
```

### Helm

[Source](https://helm.sh/docs/intro/install/)

```bash
brew install helm
```

```bash
cd k8s

helm create nodejs-concepts
```

### K8s Deployment and Service

```bash
cd nodejs-concepts

cd templates
```

```bash
kubectl create deployment nodejs-concepts --image=thutasann/nodejs-concepts:latest --port 3000 --dry-run=client -o yaml > deployment.yaml
```

```bash
kubectl create svc nodeport nodejs-concepts --tcp=3000:3000 --dry-run=client -o yaml > service.yaml
```

```bash
helm install nodejs-concepts .
```

```bash
kubectl get po
```

```bash
kubectl logs <yours>
```

### K8S scaling

```bash
kubectl scale deployment nodejs-concepts --replicas 5
```

```bash
kubectl logs <yours> --follow
```

### AutoCannon

[Source](https://www.npmjs.com/package/autocannon)

```bash
npm i autocannon -g
```

### Check CPU in mac

```bash
top
```

```bash
sysctl -n hw.ncpu
```
