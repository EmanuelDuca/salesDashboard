const baseURL = 'http://localhost:3000';

const endpoints = {
    testConnection: '/test-connection',
    topCustomers: '/top-customers',
    salesChart: '/sales-chart',
    salesData: '/sales-data'
};

async function fetchData(endpoint, params = {}) {
    try {
        const queryString = new URLSearchParams(params).toString();
        const url = `${baseURL}${endpoint}${queryString ? `?${queryString}` : ''}`;
        console.log(`Request on url: ${url}`);

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching data from ${endpoint}: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error.message);
        throw error;
    }
}

// Example usage with startDate and endDate
// fetchData(endpoints.salesChart, { startDate: '2023-01-01', endDate: '2023-01-31' });

export { fetchData, endpoints };