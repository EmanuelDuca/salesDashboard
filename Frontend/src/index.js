import Chart from 'chart.js/auto';
import { fetchData, endpoints } from './apiClient';
import table from './table.js';

const dateRange = { startDate: '2023-01-01', endDate: '2023-01-30'};

async function getTopCustomers() {
    try {
        const data = await fetchData(endpoints.topCustomers,dateRange);
        table.drawTable(data)
    } catch (error) {
        console.log(error);
    }
}

async function getSalesData() {
    try {
        const response = await fetchData(endpoints.salesData,dateRange);
        const data = response[0]; 

        document.getElementById("sales-data-customer").innerHTML = data.total_customers;
        document.getElementById("sales-data-orders").innerHTML = data.total_orders;
        document.getElementById("sales-data-income").innerHTML = `$${parseFloat(data.total_revenue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        
    } catch (error) {
        console.log(error);
    }
}

async function getChartData() {
    try {
        const data = await fetchData(endpoints.salesChart,dateRange);

        // Extracting the purchase_date and total_orders from the fetched data
        const xValues = data.map(entry => entry.date.substring(8, 10)); 
        const orderValues = data.map(entry => entry.total_orders);
        const incomeValues = data.map(entry => entry.total_revenue);
        
        drawChart(xValues,orderValues,incomeValues);
    } catch (error) {
        console.log(error);
    }
}


function drawChart(xValues,orderValues,incomeValues){
    new Chart("myChart", {
        type: "bar", 
        data: {
            labels: xValues,
            datasets: [{
                label: 'Orders',
                type: 'bar', 
                data: orderValues,
                borderColor: '#4CAF50',
                backgroundColor: "#378CE7",
                yAxisID: 'y-orders', // Associate with the 'orders' y-axis
            },{
                label: 'Income',
                type: 'line', 
                data: incomeValues,
                borderColor: '#7BC87C',
                backgroundColor: 'rgba(76, 175, 80, 0.5)', // Light green background for bars
                yAxisID: 'y-income', // Associate with the 'income' y-axis
            }]
        },
        options: {
            scales: {
                'y-orders': { // Define the 'orders' y-axis
                    type: 'linear',
                    display: true,
                    position: 'right', // Display this axis on the right
                    beginAtZero: true,
                    max: 100, 
                },
                'y-income': { // Define the 'income' y-axis
                    type: 'linear',
                    display: true,
                    position: 'left', // Display this axis on the left
                    beginAtZero: true,
                }
            }
        }
    });
}

getChartData();
getSalesData();
getTopCustomers();