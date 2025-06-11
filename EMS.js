let employees = [];
let editIndex = null;

const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const roleInput = document.getElementById("role");
const tableBody = document.querySelector("#employee-table tbody");

// Eventlistener for adding or updating employee

form.addEventListener("submit", function(e){
    e.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const role = roleInput.value.trim();

    // case 1 -> for any missing value

    if(!name || !email || !role) return;

    const employeeData = {name, email, role};

    if (editIndex === null){
        employees.push(employeeData);
    }
    else{
        employees[editIndex] = employeeData;
        editIndex = null;
        form.querySelector("button").innerHTML = "Add Employee";
    }
    form.reset();
    renderTable();
})

//table render

function renderTable(){
    tableBody.innerHTML = "";
    employees.forEach((emp,index) =>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.role}</td>
        <td class = "action-btns">
            <button onClick = "editEmployee(${index})"> Edit </button>
            <button onClick = "deleteEmployee(${index})"> Delete </button>
        </td>
        `

        tableBody.appendChild(row);
    })
}

// Edit Employee

function editEmployee(index){
    const emp = employees[index];
    nameInput.value = emp.name;
    emailInput.value = emp.email;
    roleInput.value = emp.role;
    editIndex = index;
    form.querySelector("button").innerText = "Update Employee";
}

// Delete Employee

function deleteEmployee(index){
    if(confirm("Are you sure you want to delete ??")){
        employees.splice(index,1);
        if(editIndex === index){
            form.reset();
            editIndex = null;
            form.querySelector("button").textContent = "Add  Employee";
        }
        renderTable();
    }
}