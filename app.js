import User from "./User.js";
import View from "./View.js";
import Validator from "./Validator.js";
import UsersStorage from "./UsersStorage.js";

export default class App {
    constructor(storage = new UsersStorage(), validator = new Validator()) {
        this.editingUser = null;
        this.users = [];
        this.storage = storage;
        this.validator = validator;
        this.view = new View(this.handlers());
        this.loadUsers();
    }

    loadUsers() {
        this.users = this.storage.getUsers();
        this.view.updateUsersList(this.users);
    }

    handlers() {
        return {
            onUsernameValidation: (username) => {
                this.validateUsername(username);
            },
            onPasswordValidation: (password) => {
                this.validatePassword(password);
            },
            onEmailValidation: (email) => {
                this.validateEmail(email);
            },
            onDelete: (userID) => {
                this.storage.deleteUser(userID);
                this.loadUsers();
            },
            onEdit: (user) => {
                this.editingUser = user;
                this.view.editUser(user);
            },
            onSave: ({ username, email, password }) => {
                if (this.isFormValid({ username, email, password })) {
                    let user = null;
                    if (this.editingUser) {
                        user = this.editingUser;
                        user.username = username;
                        user.email = email;
                        user.password = password;
                    } else {
                        user = new User(username, email, password);
                    }
                    this.storage.saveUser(user);
                    this.loadUsers();
                    this.editingUser = null;
                    this.view.clearAndHideForm();
                } else {
                    this.validateUsername(username);
                    this.validateEmail(email);
                    this.validatePassword(password);
                    this.view.changeButtonState(true);
                }
            },
            onCancel: () => {
                this.editingUser = null;
                this.view.clearAndHideForm();
            },
            onPasswordToggle: () => {
                this.view.togglePasswordVisibility();
            }
        };
    }

    validateUsername(username) {
        const error = this.validator.validateUsername(username);
        this.view.showUsernameError(error);
        this.view.changeButtonState(error !== null);
    }

    validateEmail(email) {
        let error = this.validator.validateEmail(email);
        if (!error) {
            error = this.validateUniqueEmail(email);
        }
        this.view.showEmailError(error);
        this.view.changeButtonState(error !== null);
    }

    validatePassword(password) {
        const error = this.validator.validatePassword(password);
        this.view.showPasswordError(error);
        this.view.changeButtonState(error !== null);
    }

    validateUniqueEmail(email) {
        const existingIndex = this.users.findIndex((user) => user.email === email);
        if (existingIndex === -1)
            return null;

        if (this.editingUser && this.users[existingIndex].id === this.editingUser.id)
            return null;

        return "This email is already used.";
    }

    isFormValid({ username, email, password }) {
        return (
            this.validator.validateUsername(username) === null &&
            this.validator.validateEmail(email) === null &&
            this.validateUniqueEmail(email) === null &&
            this.validator.validatePassword(password) === null
        );
    }
}