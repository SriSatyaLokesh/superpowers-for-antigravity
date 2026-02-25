# Database Optimization Guide

## 1. Indexing Strategy
- Index foreign keys.
- Index columns used in `WHERE` and `ORDER BY` clauses.
- Avoid over-indexing (write performance impact).

## 2. Query Optimization
- Use `EXPLAIN ANALYZE` to find slow queries.
- Avoid `SELECT *`.
- Use CTEs (Common Table Expressions) for readability on complex queries.

## 3. Connection Pooling
Configure appropriate pool sizes for your environment (e.g., `pg-pool`).

## 4. Vertical vs Horizontal Scaling
Understand when to increase node size vs adding read replicas.
