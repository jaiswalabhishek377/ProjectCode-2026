const inputpassword= document.getElementById("password");
const copybtn = document.getElementById("copy");
const generatebtn = document.getElementById("generate");

generatebtn.addEventListener("click",function(){
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+~|}{[]:;?><,./-=";
    const passwordLength = 12;
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    inputpassword.value = password;
});

copybtn.addEventListener("click", function(){
    if(inputpassword.value === ""){
        return;
    }
    inputpassword.select();
    document.execCommand("copy");
    alert("Password Copied!");
});