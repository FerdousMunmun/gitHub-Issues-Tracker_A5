//machine id-> input value

function getValueFromInput(id){
    const input = document.getElementById(id);
    const value = input.value;
    console.log(id,value);
    return value;
};


document.getElementById("login-btn").addEventListener ("click",function () {
    // 1-get the mobile number

    const nameInput = document.getElementById("input-name");
    const contactName = nameInput.value;
   
    
    //2 get the password input

    const inputPassword = document.getElementById("input-password");
    const password = inputPassword.value;
    
    //3-match name & password
    if(contactName=="admin" && password=="admin1234"){
 //3-1 true::: alert > homepage
alert("Login Success")
// window.location.replace("/home.html")
// replace use korla browser ra history add hoi na but assing use korla history addkora
window.location.assign("home.html")
    }
    else{
 //3-1 flase::: alert> return
 alert("Login Failed");
 return;

    }

    
   
   
   
   

});