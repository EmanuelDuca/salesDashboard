const express = require('express');
const pool = require('./db');
const queries = require('./queries')

const app = express();
const port = 3000;

// Enable CORS for all origins
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1234');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json());

app.get('/test-conection', async (req, res) => {
    try {
        const result = await pool.query(queries.testConnection);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching data');
    }
});

app.get('/top-customers', async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const result = await pool.query(queries.topCustomers, [startDate, endDate]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching data');
    }
});

/*   (Total-orders | Total-unique-customers) for a specific date in timeframe of 1 month. */
app.get('/sales-chart', async (req, res) => {
    const { startDate, endDate } = req.query; 
    if (!startDate || !endDate) {
        return res.status(400).send('Please provide both startDate and endDate');
    }

    try {
        const result = await pool.query(queries.salesChart, [startDate, endDate]);
        res.json(result.rows); 
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching data');
    }
});

app.get("/sales-data", async (req, res) => {
    const { startDate, endDate } = req.query; // Extracting startDate and endDate from query parameters

    // Ensure startDate and endDate are provided
    if (!startDate || !endDate) {
        return res.status(400).send('Please provide both startDate and endDate');
    }

    try {
        const result = await pool.query(queries.salesData, [startDate, endDate]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching data');
    }
});

/*
app.get("/sales-data", async (req,res) => {
    try{
        const result = await pool.query(queries.salesData);
        res.json(result.rows);
    }catch(error){
        console.error(error);
        res.status(500).send('An error occurred while fetching data');
    }
});
*/

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

