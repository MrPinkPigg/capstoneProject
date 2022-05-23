var CryptoJS = require("crypto-js");

function checkExistingUser(){
    //pull username from page
    var dbUsers = [];
    var inputUser = document.getElementById("username");
    //see if username already exists in db
    dbUsers.forEach(element => {
        if (inputUser === element){
            return true;
        }
        else{
            return false;
        }
    });
}

function createAccount(){
    //if username already exists, give error
    //else add new account to db
    if (checkExistingUser() === true){
    
    }
    else{
        //pull pass from input
        var pass = document.getElementById("newPass");
        // Encrypt
        var ciphertext = CryptoJS.AES.encrypt(pass, 'secret key 123').toString();

        //push username/encrypted pass to db
        //sign in
    }

}

function loginUser(){
    //pull encrypted pass from db
    var ciphertext = "placeholder";
    // Decrypt
    var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    var inputPass = document.getElementById("pass");
    //compare decrypted db value to password given
    if(originalText === inputPass){
        //sign in
    }
    else{
        //give error
    }

}

function changeUserPass(){
    //pull new pass from input
    var newPass = document.getElementById("");
    //encrypt new pass
    var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();

    //push to db
}