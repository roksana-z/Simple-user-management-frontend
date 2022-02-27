export default class View {
    constructor(handlers) {
        this.handlers = handlers;
        this.form = document.querySelector("#form-modal");
        this.addEventListeners();
    }

    addEventListeners() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const userData = Object.fromEntries(formData);
            this.handlers.onSave(userData);
        });
        this.form.username.addEventListener("blur", (e) => {
            this.handlers.onUsernameValidation(e.target.value);
        });
        this.form.password.addEventListener("blur", (e) => {
            this.handlers.onPasswordValidation(e.target.value);
        });
        this.form.email.addEventListener("blur", (e) => {
            this.handlers.onEmailValidation(e.target.value);
        });

        this.form.username.addEventListener("input", () => {
            this.showUsernameError();
            this.changeButtonState(false);
        });
        this.form.password.addEventListener("input", () => {
            this.showPasswordError();
            this.changeButtonState(false);
        });
        this.form.email.addEventListener("input", () => {
            this.showEmailError();
            this.changeButtonState(false);
        });

        const addBtn = document.querySelector(".add-btn");
        addBtn.addEventListener("click", () => {
            document.getElementById("form").style.display = "block";
        });

        const cancelBtn = document.querySelector("#cancel-button");
        cancelBtn.addEventListener("click", () => {
            this.handlers.onCancel();
        });

        const togglePassword = document.querySelector('#toggle-password');
        togglePassword.addEventListener('click', () => {
            this.handlers.onPasswordToggle();
        })
    }

    clearAndHideForm() {
        document.getElementById("form").style.display = "none";
        this.form.reset();
        this.showUsernameError();
        this.showPasswordError();
        this.showEmailError();
        this.changeButtonState(false);
        if (this.form.password.type === "text") this.togglePasswordVisibility();
    }

    updateUsersList(users) {
        const usersListContainer = document.querySelector("#usersList");

        usersListContainer.innerHTML =
            users.length === 0
                ? "<div class=\"mt-20\">There are no saved users yet. You can start adding by pressing 'Add user' button.</div>"
                : "";

        users.forEach((user) => {
            const container = document.createElement("div");
            container.classList.add("grid", "user-wrapper");
            container.setAttribute("data-user-id", user.id);

            const nameElement = document.createElement("div");
            nameElement.innerHTML = user.username;

            const emailElement = document.createElement("div");
            emailElement.innerHTML = user.email;

            const passwordElement = document.createElement("div");
            passwordElement.innerHTML = user.password;

            const btnsContainer = document.createElement("div");
            btnsContainer.classList.add("justify-self-end", "btns-container");

            const btnEdit = document.createElement("a");
            btnEdit.classList.add("mr-20");
            btnEdit.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512" class="btn-form icon" data-form="form">
                <path
                d="M22.853,1.148a3.626,3.626,0,0,0-5.124,0L1.465,17.412A4.968,4.968,0,0,0,0,20.947V23a1,1,0,0,0,1,1H3.053a4.966,4.966,0,0,0,3.535-1.464L22.853,6.271A3.626,3.626,0,0,0,22.853,1.148ZM5.174,21.122A3.022,3.022,0,0,1,3.053,22H2V20.947a2.98,2.98,0,0,1,.879-2.121L15.222,6.483l2.3,2.3ZM21.438,4.857,18.932,7.364l-2.3-2.295,2.507-2.507a1.623,1.623,0,1,1,2.295,2.3Z" />
            </svg>
            `;

            btnEdit.addEventListener("click", () => {
                document.getElementById("form").style.display = "block";
                this.handlers.onEdit(user);
            });

            const btnDelete = document.createElement("a");
            btnDelete.classList.add("mr-20");
            btnDelete.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512" class="icon">
                <path
                    d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z" />
                <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z" />
                <path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
            </svg>
            `;
            btnDelete.addEventListener("click", () => {
                const doDelete = confirm(
                    "Are you sure you want to delete this user?"
                );

                if (doDelete) {
                    this.handlers.onDelete(user.id);
                }
            });
            btnsContainer.append(btnEdit, btnDelete);

            container.append(
                nameElement,
                emailElement,
                passwordElement,
                btnsContainer
            );
            usersListContainer.append(container);
        });
    }

    editUser(user) {
        this.form.username.value = user.username;
        this.form.email.value = user.email;
        this.form.password.value = user.password;
    }

    showUsernameError(error) {
        if (error) {
            this.form.username.classList.add("is-invalid");
            document.querySelector(".error-username").innerHTML = error;
        } else {
            this.form.username.classList.remove("is-invalid");
            document.querySelector(".error-username").innerHTML = "";
        }
    }

    showPasswordError(error) {
        if (error) {
            this.form.password.classList.add("is-invalid");
            document.querySelector(".error-ps").innerHTML = error;
        } else {
            this.form.password.classList.remove("is-invalid");
            document.querySelector(".error-ps").innerHTML = "";
        }
    }

    showEmailError(error) {
        if (error) {
            this.form.email.classList.add("is-invalid");
            document.querySelector(".error-email").innerHTML = error;
        } else {
            this.form.email.classList.remove("is-invalid");
            document.querySelector(".error-email").innerHTML = "";
        }
    }

    changeButtonState(disabled) {
        document.getElementById("submit-button").disabled = disabled;
        if (disabled) {
            document.getElementById("submit-button").classList.add("submit-disabled");
        } else {
            document.getElementById("submit-button").classList.remove("submit-disabled");
        }
    }

    togglePasswordVisibility() {
        const togglePassword = document.querySelector('#toggle-password');
        if (this.form.password.type === "password") {
            this.form.password.type = "text";
            togglePassword.innerHTML = `
                <?xml version="1.0" encoding="UTF-8"?>
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512" class="icon">
                <path d="M23.271,9.419A15.866,15.866,0,0,0,19.9,5.51l2.8-2.8a1,1,0,0,0-1.414-1.414L18.241,4.345A12.054,12.054,0,0,0,12,2.655C5.809,2.655,2.281,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162A15.866,15.866,0,0,0,4.1,18.49l-2.8,2.8a1,1,0,1,0,1.414,1.414l3.052-3.052A12.054,12.054,0,0,0,12,21.345c6.191,0,9.719-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419ZM2.433,13.534a2.918,2.918,0,0,1,0-3.068C3.767,8.3,6.782,4.655,12,4.655A10.1,10.1,0,0,1,16.766,5.82L14.753,7.833a4.992,4.992,0,0,0-6.92,6.92l-2.31,2.31A13.723,13.723,0,0,1,2.433,13.534ZM15,12a3,3,0,0,1-3,3,2.951,2.951,0,0,1-1.285-.3L14.7,10.715A2.951,2.951,0,0,1,15,12ZM9,12a3,3,0,0,1,3-3,2.951,2.951,0,0,1,1.285.3L9.3,13.285A2.951,2.951,0,0,1,9,12Zm12.567,1.534C20.233,15.7,17.218,19.345,12,19.345A10.1,10.1,0,0,1,7.234,18.18l2.013-2.013a4.992,4.992,0,0,0,6.92-6.92l2.31-2.31a13.723,13.723,0,0,1,3.09,3.529A2.918,2.918,0,0,1,21.567,13.534Z"/></svg>
            `;
        } else {
            this.form.password.type = "password";
            togglePassword.innerHTML = `
                <?xml version="1.0" encoding="UTF-8"?>
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512" class="icon">
                <path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z"/><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"/></svg>                
            `;
        }
    }
}
