const localStorageKey = "feedback-form-state";

const valuesObject = {
    email: "",
    message: "",
    updateEmail(value) {
        this.email = value.trim();
        this.saveToStorage();
    },
    updateMessage(value) {
        this.message = value.trim();
        this.saveToStorage();
    },
    getEmail() {
        this.getFromStorage();
        return this.email;
    },
    getMessage() {
        this.getFromStorage();
        return this.message;
    },
    reset() {
        this.email = "";
        this.message = "";
        localStorage.removeItem(localStorageKey);
    },
    saveToStorage() {
        localStorage.setItem(localStorageKey, JSON.stringify(this));
    },
    getFromStorage() {
        const storagedString = localStorage.getItem(localStorageKey);
        if (storagedString !== null) {
            const storaged = JSON.parse(storagedString);
            this.email = storaged.email;
            this.message = storaged.message;
        }
    }
}

const form = document.querySelector(".feedback-form");
const emailInput = form.elements.email;
const messageInput = form.elements.message;

emailInput.value = valuesObject.getEmail();
messageInput.value = valuesObject.getMessage();

form.addEventListener("input", event => {
    const value = event.target.value.trim();
    if (event.target.name === "email") {
        valuesObject.updateEmail(value);
    } else if (event.target.name === "message") {
    valuesObject.updateMessage(value);
    }
})

form.addEventListener("submit", event => {
    event.preventDefault();
    if (emailInput.value.trim() === "" || messageInput.value.trim() === "") {
        alert('All form fields must be filled in!');
        return;
    }

    console.log({
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
    });
    valuesObject.reset();
    form.reset();
})