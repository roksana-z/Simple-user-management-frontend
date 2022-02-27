export default class UsersStorage {
    constructor() {
        this.users = JSON.parse(localStorage.getItem("users") || "[]");
    }

    getUsers() {
        return this.users;
    }

    saveUser(user) {
        const existingUserIndex = this.users.findIndex((el) => el.id === user.id);
        if (existingUserIndex >= 0) {
            this.users[existingUserIndex] = user;
        } else {
            this.users.push(user);
        }
        localStorage.setItem("users", JSON.stringify(this.users));
    }

    deleteUser(userID) {
        const updatedUsersList = this.users.filter((user) => user.id !== userID);
        localStorage.setItem("users", JSON.stringify(updatedUsersList));
        this.users = updatedUsersList;
    }
}