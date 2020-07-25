'use strict'

function openSignUpForm() {
    if(gGame.isOn) return
    document.querySelector('.container').classList.add('non-display');
    document.querySelector('.form').classList.remove('non-display');
}

function checkform() {
    //var errormessage = "";
    //var namevalid, passwordvalid, confirmpasswordvalid;
    var firstname = document.getElementById("firstname1");
    var lastname = document.getElementById("lastname1");
    var password = document.getElementById("password1");
    var confirmpassword = document.getElementById("confirmpassword1");
    localStorage.setItem("lastname1", lastname);
    localStorage.setItem("firstname1", firstname);
    localStorage.setItem("password1", password);
    localStorage.setItem("confirmPassword1", confirmpassword);

    document.querySelector('.form').classList.add('non-display');
    document.querySelector('.container').classList.remove('non-display');

    // if (firstname.value.length >= 2 && lastname.value.length >= 2)   namevalid = true;
    // else namevalid = false;
    // if (password.value.length >= 8) passwordvalid = true;
    // else passwordvalid = false;
    // if (password.value == confirmpassword.value)  confirmpasswordvalid = true;
    // else  confirmpasswordvalid = false;
    // if (namevalid && passwordvalid && confirmpasswordvalid) return true;
    // if (!namevalid)
    //     errormessage += "Names Should Have at least Two Characters, Please Fill Again";
    // if (!passwordvalid)
    //     errormessage += "Too short Password";
    // if (!confirmpasswordvalid)
    //     errormessage += "Password Confirmation is Wrong, Please fill again";
    // alert(errormessage);
    // return false;

}