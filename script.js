//Add Expense Function
let expenses=[];
function addExpense(){
    const title=document.getElementById('title').value;
    const amount=parseFloat(document.getElementById('amount').value);

    if(!title||isNaN(amount)){
        alert('please enter vaild title and amount');
        return;
    }
    const expense={
        id:Date.now(),
        title:title,
        amount:amount
    };
    expenses.push(expense);
    displayExpenses();
    updateTotal();
    saveExpenses();      // Save to localStorage ✅
    displayExpenses();
    updateTotal();
    //clear input
    document.getElementById('title').value='';
    document.getElementById("amount").value='';

}
// Display Expenses
function displayExpenses() {
    const list = document.getElementById("expenseList");
    list.innerHTML = "";
  
    expenses.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.title}: ₹${item.amount}
        <button onclick="deleteExpense(${item.id})" style="float:right; background:red; color:white; border:none; padding:5px; cursor:pointer;">🗑️</button>
      `;
      list.appendChild(li);
    });
  }
  
//Update Total
function updateTotal() {
    const total = expenses.reduce((sum, item) => sum + item.amount, 0);
    document.getElementById("total").innerText = total.toFixed(2);
  }
  
  function deleteExpense(id) {
    expenses = expenses.filter(item => item.id !== id);
    saveExpenses(); 
    displayExpenses();
    updateTotal();
  }
  function saveExpenses() {
    localStorage.setItem("myExpenses", JSON.stringify(expenses));
  }
  function loadExpenses() {
    const data = localStorage.getItem("myExpenses");
    if (data) {
      expenses = JSON.parse(data);
      displayExpenses();
      updateTotal();
    }
  }
  
  // Load data when page loads
  window.onload = loadExpenses;
    