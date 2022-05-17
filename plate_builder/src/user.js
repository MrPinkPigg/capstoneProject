var CryptoJS = require("crypto-js");

function checkExistingUser(){
    //pull username/pass from page

    //see if username already exists in db

    //if new account:
        //if not, encryptNewPass()
    //if signing in:
        //if exists, loginUser()
}

function createAccount(){
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();

    //push username/encrypted pass to db
    //sign in
}

function loginUser(){
    //pull encrypted pass from db
    
    // Decrypt
    var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    //compare decrypted db value to password given
    //sign in
}

function changeUserPass(){

}