export default class User {
    constructor(username, email, password) {
        // UUID library can be imported to the project to have better unique ID generating, but I don't think it's necessary for now.
        this.id = Math.floor(Math.random() * (1000000 - 1) + 1);
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
