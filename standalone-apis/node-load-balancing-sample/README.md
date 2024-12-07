# Node.js and Load Balancing Sample

## Algorithms

## Round-Robin

The round-robin algorithm is a straightforward and widely used technique for load balancing. It distributes incoming client requests sequentially and evenly across a pool of available servers in a cyclical manner.

- Initial Request: The first client request is sent to the first server in the pool.
- Subsequent Requests: Each subsequent request is sent to the next server in the list, cycling back to the first server once the last server has been reached.
- Continuous Cycle: This process repeats indefinitely, ensuring that all servers receive an equal number of requests over time.
- Even Distribution: Ensures all servers receive a similar load, assuming requests are of equal weight.
- Stateless: Doesn't require tracking client-server mappings.

**Illustration**

- Assume you have 3 servers: S1, S2, and S3.
- Incoming requests: R1, R2, R3, R4, R5, R6.

The round-robin distribution will be:

- R1 → S1
- R2 → S2
- R3 → S3
- R4 → S1 (cycle restarts)
- R5 → S2
- R6 → S3
