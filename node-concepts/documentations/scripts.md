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

### Loadtest

```bash
npx loadtest -n 1200 -c 400 -k http://localhost:3000/cluster/heavy
```

### PM2

```bash
npx pm2 start dist/main.js
```

```bash
npx pm2 kill
```
