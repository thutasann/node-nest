docker compose down
export UPSTASH_REDIS_REST_URL=rediss://default:AWgOAAIjcDE5NWUwYjA1MTViMDQ0YTYyOGJiZmI1YzBmODg1ZDEzZnAxMA@golden-moose-26638.upstash.io:6379
export CORS_ORIGIN=http://localhost:3000
docker compose up -d --build