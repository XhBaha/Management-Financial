document.addEventListener("DOMContentLoaded", () => {
    const transactionForm = document.getElementById("transaction-form");
    const transactionList = document.getElementById("transaction-list");
    const totalAmount = document.getElementById("total-amount");
    const filterCategory = document.getElementById("filter-category");

    let transactions = [];

    transactionForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("transaction-name").value;
        const amount = parseFloat(document.getElementById("transaction-amount").value);
        const category = document.getElementById("transaction-category").value;
        const date = document.getElementById("transaction-date").value;

        const transaction = {
            id: Date.now(),
            name,
            amount,
            category,
            date
        };

        transactions.push(transaction);
        displayTransactions(transactions);
        updateTotalAmount();

        transactionForm.reset();
    });

    transactionList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const id = parseInt(e.target.dataset.id);
            transactions = transactions.filter(transaction => transaction.id !== id);
            displayTransactions(transactions);
            updateTotalAmount();
        }

        if (e.target.classList.contains("edit-btn")) {
            const id = parseInt(e.target.dataset.id);
            const transaction = transactions.find(transaction => transaction.id === id);

            document.getElementById("transaction-name").value = transaction.name;
            document.getElementById("transaction-amount").value = transaction.amount;
            document.getElementById("transaction-category").value = transaction.category;
            document.getElementById("transaction-date").value = transaction.date;

            transactions = transactions.filter(transaction => transaction.id !== id);
            displayTransactions(transactions);
            updateTotalAmount();
        }
    });

    filterCategory.addEventListener("change", (e) => {
        const category = e.target.value;
        if (category === "All") {
            displayTransactions(transactions);
        } else {
            const filteredTransactions = transactions.filter(transaction => transaction.category === category);
            displayTransactions(filteredTransactions);
        }
    });

    function displayTransactions(transactions) {
        transactionList.innerHTML = "";
        transactions.forEach(transaction => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${transaction.name}</td>
                <td>$${transaction.amount.toFixed(2)}</td>
                <td>${transaction.category}</td>
                <td>${transaction.date}</td>
                <td>
                    <button class="edit-btn" data-id="${transaction.id}">Edit</button>
                    <button class="delete-btn" data-id="${transaction.id}">Delete</button>
                </td>
            `;

            transactionList.appendChild(row);
        });
    }

    function updateTotalAmount() {
        const total = transactions.reduce((sum, transaction) => {
            return transaction.category.toLowerCase() === "expense" ? sum - transaction.amount : sum + transaction.amount;
        }, 0);
        totalAmount.textContent = total.toFixed(2);
    }
});