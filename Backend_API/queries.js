const queries = {
    topCustomers: `
    SELECT 
      c.customer_id, 
      c.email AS customer_email, 
      COUNT(o.order_id) AS total_orders, 
      SUM(oi.quantity * oi.price) AS total_money_spent 
    FROM sales_data.customer c 
    LEFT JOIN sales_data."order" o ON c.customer_id = o.customer_id 
    LEFT JOIN sales_data.order_item oi ON o.order_id = oi.order_id
    WHERE 
        o.purchase_date BETWEEN $1 AND $2 
    GROUP BY c.customer_id, c.email 
    ORDER BY total_money_spent DESC LIMIT 10;
    `,
    testConnection: `
    SELECT * FROM sales_data.customer LIMIT 5;
    `,
    salesData: `
    SELECT 
  (SELECT COUNT(*) FROM sales_data."order" WHERE purchase_date >= $1 AND purchase_date < $2) AS total_orders, 
  (SELECT SUM(quantity * price) FROM sales_data.order_item JOIN sales_data."order" ON sales_data.order_item.order_id = sales_data."order".order_id WHERE purchase_date >= $1 AND purchase_date < $2) AS total_revenue, 
  (SELECT COUNT(DISTINCT customer_id) FROM sales_data."order" WHERE purchase_date >= $1 AND purchase_date < $2) AS total_customers;
    `,
    salesChart:`
    SELECT 
    o.purchase_date AS date,
    COUNT(o.order_id) AS total_orders,
    SUM(oi.quantity * oi.price) AS total_revenue
    FROM 
        sales_data."order" o
    JOIN 
        sales_data.order_item oi ON o.order_id = oi.order_id
    WHERE 
        o.purchase_date >= $1 AND o.purchase_date < $2
    GROUP BY 
        o.purchase_date
    ORDER BY 
        o.purchase_date;
    `,
  };
  
  module.exports = queries;