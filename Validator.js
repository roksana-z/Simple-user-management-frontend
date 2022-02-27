export default class Validator {
    validateUsername(username) {
        if (username.length === 0) 
            return "The username cannot be empty.";

        return null;
    }

    validatePassword(password) {
        if (password.length === 0) 
            return "The password cannot be empty.";
        if (password.length <= 6)
            return "The password is too short, should contain at least 6 characters.";
        if (password.search(/[A-Z]/) === -1)
            return "The password should contain at least one uppercase character.";
        if (password.search(/[a-z]/) === -1)
            return "The password should contain at least one lowercase character.";
        if (password.search(/\d/) === -1)
            return "The password should contain at least one digit.";
        if (password.search(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/) === -1)
            return "The password should contain at least one special character.";

        return null;
    }

    validateEmail(email) {
        if (email.length === 0) 
            return "The email cannot be empty.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return "The entered email is invalid.";

        return null;
    }
}
