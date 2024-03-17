SET SCHEMA 'sales_data';
-- Generate demo data for customer table
INSERT INTO "customer" (first_name, last_name, email)
SELECT 
    'Customer' || generate_series,
    'LastName' || generate_series,
    'customer' || generate_series || '@example.com'
FROM generate_series(1, 1000);

-- Generate demo data for order table
-- Generate demo data for order table
INSERT INTO "order" (customer_id, purchase_date, country, device)
SELECT
    c.customer_id,
    TIMESTAMP '2023-01-01' + (random() * (TIMESTAMP '2023-12-31' - TIMESTAMP '2023-01-01')) as purchase_date,
    'EUR' as country,
    'Device' || floor(random() * 5 + 1)
FROM
    (SELECT customer_id FROM "customer" ORDER BY random() LIMIT 5000) c;

-- Generate demo data for order_item table
INSERT INTO order_item (order_id, ean, quantity, price)
SELECT
    o.order_id,
    'EAN' || floor(random() * 10000 + 1),
    floor(random() * 20 + 1) as quantity,
    CAST((random() * (195 - 5) + 5) AS numeric(12, 2)) as price
FROM
    "order" o
JOIN
    generate_series(1, 5000) gs ON gs <= floor(random() * 6 + 1);
