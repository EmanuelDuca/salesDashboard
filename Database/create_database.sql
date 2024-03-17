CREATE SCHEMA sales_data;
SET SCHEMA 'sales_data';

CREATE TABLE "customer" (
    customer_id SERIAL PRIMARY KEY,
    first_name varchar(250),
    last_name varchar(250),
    email varchar(100) UNIQUE NOT NULL
);

CREATE TABLE "order" (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    purchase_date date NOT NULL,
    country varchar(3) NOT NULL,
    device varchar(250),
    FOREIGN KEY (customer_id) references customer(customer_id)
);

CREATE TABLE order_item (
  item_id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL,
  ean varchar(13) NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  FOREIGN KEY (order_id) references "order"(order_id)
);
