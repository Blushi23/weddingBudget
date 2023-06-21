import Action from "/classes/action.js";
import actionsManager from "/classes/actionsManager.js";
let manager = new actionsManager();
// let DJ = new Action("expense", "DJ", 0, "");
// manager.addAction(DJ);
// let Dress = new Action("expense", "Dress", 0, "");
// manager.addAction(Dress);
console.log(manager.actions);
// manager.updateAction(DJ.id, 0)
// manager.updateAction(Dress.id, 0)
manager.calcBalance();
console.log(manager.balance);

// a function that shows all the actions according to manager actions array.
function showActionsInTable() {
    document.getElementById("actions").innerHTML = "";
    for (let action of manager.actions) {
        document.getElementById("actions").innerHTML += `<tr class=${action.type == "income" ? "text-success" : "text-danger"}> <td> ${action.description} </td><td>${action.payer} </td><td>${action.amount}</td><td><i class="fa-solid fa-pen-to-square" onclick="updateAction(${action.id})"></i> </td> <td><i class="fa-solid fa-trash" onclick="deleteAction(${action.id})"></i></td></tr > `
    }
}
showActionsInTable();

window.addNewAction = () => {
    //take the form value
    let type = document.getElementById("type").value;
    let description = document.getElementById("description").value;
    let payer = document.getElementById("payer").value;
    let amount = +document.getElementById("amount").value;

    //create action object
    let newAction = new Action(type, description, amount, payer);

    //add newAction to manager actions array
    manager.addAction(newAction);
    console.log(manager.actions);
    document.getElementById("description").value = "";
    document.getElementById("payer").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("type").value = "income";
    showActionsInTable();
};

window.updateAction = (id) => {
    //prompt for new amount
    let newPayer = prompt("Who paid?");
    let newAmount = prompt("Enter the new amount:");
    if (newPayer == null || newPayer == "" || newAmount == null || newAmount == "" || newAmount != +newAmount) alert("Sorry! Something went wrong");
    else {
        //update action
        manager.updateAction(id, +newAmount)
        manager.updateActionPayer(id, newPayer)

        localStorage.setItem('actions', JSON.stringify(manager.actions));
        showActionsInTable();
    }

};

window.deleteAction = (id) => {
    //confirm
    if (confirm("Are you sure?")) {
        manager.deleteAction(id);

        localStorage.setItem('actions', JSON.stringify(manager.actions));
        showActionsInTable();
    }
};
