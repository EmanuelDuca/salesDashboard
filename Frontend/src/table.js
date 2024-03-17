function drawTable(data) {
    try {
        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = '';

        data.forEach((customer, index) => {
            const row = tableBody.insertRow();
            // Column 1 - Index (for #)
            let cell = row.insertCell();
            cell.textContent = index + 1;

            // Column 2 - Email
            cell = row.insertCell();
            cell.textContent = customer.customer_email;

            // Column 3 - Orders
            cell = row.insertCell();
            cell.textContent = customer.total_orders;

            // Column 4 - Money Spent
            cell = row.insertCell();
            cell.textContent = `$${parseFloat(customer.total_money_spent).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`; // Formatting as currency string
        });

    } catch (error) {
        console.error('Error displaying customer data:', error);
    }
}
module.exports = {drawTable};