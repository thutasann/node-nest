# Nodejs NGINX

Resource - https://www.youtube.com/watch?v=q8OleYuqntY

## Content

- use 3 instances of the same application instead of just having one

## Scripts

```bash
docker build -t node-nginx:1.0 .
```

```bash
docker images | grep node-nginx
```

```bash
docker run -p 3000:3000 node-nginx:1.0
```

```bash
docker ps
```

```bash
docker stop <Container ID>
```

## NGINX Scrips

```bash
brew install nginx
```

```bash
nginx -v

nginx -V
```

```bash
cat /opt/homebrew/etc/nginx/nginx.conf
```
