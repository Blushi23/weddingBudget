export default class actionsManager {
    constructor() {
        // this.actions = [];
        this.actions = localStorage.getItem('actions') ? JSON.parse(localStorage.getItem('actions')) : [];
        this.balance = 0;
    }

    get(propName) {
        return this[propName];
    }

    set(propName, value) {
        this[propName] = value;
    }

    addAction(action) {
        this.actions.push(action);
        this.calcBalance();
        localStorage.setItem('actions', JSON.stringify(this.actions));
    }

    deleteAction(id) {
        let indexToDelete = this.actions.findIndex((action) => action.id == id);
        this.actions.splice(indexToDelete, 1);
        this.calcBalance();
    }
    updateAction(id, newAmount) {
        let indexToUpdate = this.actions.findIndex((action) => action.id == id);
        this.actions[indexToUpdate].amount = this.actions[indexToUpdate].type == "expense" ? -newAmount : newAmount;
        this.calcBalance();
    }
    updateActionPayer(id, newPayer) {
        let indexToUpdate = this.actions.findIndex((action) => action.id == id);
        this.actions[indexToUpdate].payer = this.actions[indexToUpdate].type == "expense" ? newPayer : newPayer;
        this.calcBalance();

    }
    calcBalance() {
        this.balance = this.actions.reduce((total, action) => total + action.amount, 0);
        document.getElementById("balance").innerText = `Balance: ${this.balance}`;
    }
}

