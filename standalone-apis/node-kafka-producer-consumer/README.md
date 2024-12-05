# Nodejs Kafka Producer & Consumer

## Create Kafka Topic

```bash
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh \
  --create \
  --bootstrap-server 127.0.0.1:9092 \
  --replication-factor 1 \
  --partitions 1 \
  --topic test
```
