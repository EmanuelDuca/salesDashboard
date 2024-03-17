const { Pool } = require('pg');
const connectionString = 'postgresql://postgres:7319@localhost:5432/postgres';

const pool = new Pool({
  connectionString
});

module.exports = pool;



/*
This code can be used to test the connection with the database, 
If every thing is ok it should return a succes message with some data

In order to use just uncomment the code bellow
*/

/*
async function testConnection() {
    try {
      console.log("Try to connect")
      const client = await pool.connect(); 
      console.log('Successfully connected to the database');
      client.release(); 
    } catch (err) {
      console.error('Failed to connect to the database:', err);
    }
  }
  
  async function fetchData() {
    try {
      const result = await pool.query('SELECT * FROM sales_data.customer LIMIT 5;'); 
      if (result.rows.length > 0) {
        console.log('Data retrieval test successful. First row:', result.rows);
      } else {
        console.log('Data retrieval test successful but no data found.');
      }
    } catch (err) {
      console.error('Failed to retrieve data:', err);
    }
  }

  async function testDatabase() {
    await testConnection(); // Test the connection
    await fetchData(); // Fetch data
    await pool.end(); // Close the pool here, after all operations are complete
  }

  testDatabase(); 
  */
