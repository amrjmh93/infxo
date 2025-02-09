const fs = require('fs');
const path = require('path');

let transactions = [];

// Load transactions from local file on startup
try {
    const data = fs.readFileSync(path.join(__dirname, 'transactions.json'), 'utf8');
    transactions = JSON.parse(data);
} catch (err) {
    // If the file doesn't exist or is empty, start with an empty array
    console.error('Error loading transactions:', err);
    transactions = [];
}

function addTransaction() {
    const account = document.getElementById('account').value;
    const transactionType = document.getElementById('transactionType').value;
    const wallet = document.getElementById('wallet').value;
    const currency = document.getElementById('currency').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const reason = document.getElementById('reason').value;
    const date = document.getElementById('date').value;

    if (isNaN(amount) || amount <= 0) {
        alert('الرجاء إدخال مبلغ صحيح');
        return;
    }

    let newTransaction = { account, transactionType, wallet, currency, amount, reason, date };
    transactions.push(newTransaction);
    renderTransactions();

    // Clear the form fields after adding a transaction
    document.getElementById('amount').value = '';
    document.getElementById('reason').value = '';

    // Save transactions to local file
    try {
        fs.writeFileSync(path.join(__dirname, 'transactions.json'), JSON.stringify(transactions, null, 2));
    } catch (err) {
        console.error('Error saving transactions:', err);
    }
}

function renderTransactions() {
    const tbody = document.querySelector('#transactionsTable tbody');
    tbody.innerHTML = '';

    transactions.forEach((transaction, index) => {
        const row = document.createElement('tr');

        const accountCell = document.createElement('td');
        accountCell.textContent = transaction.account === 'amr' ? 'عامر' : 'تامر';
        row.appendChild(accountCell);

        const transactionTypeCell = document.createElement('td');
        transactionTypeCell.textContent = transaction.transactionType;
        row.appendChild(transactionTypeCell);

        const walletCell = document.createElement('td');
        walletCell.textContent = transaction.wallet;
        row.appendChild(walletCell);

        const currencyCell = document.createElement('td');
        currencyCell.textContent = transaction.currency;
        row.appendChild(currencyCell);

        const amountCell = document.createElement('td');
        amountCell.textContent = transaction.amount.toFixed(2);
        row.appendChild(amountCell);

        const reasonCell = document.createElement('td');
        reasonCell.textContent = transaction.reason;
        row.appendChild(reasonCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = transaction.date;
        row.appendChild(dateCell);

        tbody.appendChild(row);
    });

    // Calculate and display total amount
    const totalAmount = transactions.reduce((acc, transaction) => acc + transaction.amount, 0).toFixed(2);
    document.getElementById('totalAmount').textContent = totalAmount;
}

function showPreviousRecord() {
    // Load transactions from local file again
    try {
        const data = fs.readFileSync(path.join(__dirname, 'transactions.json'), 'utf8');
        transactions = JSON.parse(data);
        renderTransactions();
    } catch (err) {
        console.error('Error loading transactions:', err);
    }
}