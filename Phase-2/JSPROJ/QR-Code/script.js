const textinput = document.getElementById("text-input");
const generateBtn = document.getElementById("generate-btn");
const qrcode= document.getElementById("qrcode");

generateBtn.addEventListener("click",generateqr);
const url= " https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="
function generateqr(){
    const text = textinput.value.trim();
    if(text === ""){
        alert("Please enter some text to generate QR code.");
        return;
    }
    const qrUrl = url + encodeURIComponent(text);
    qrcode.src = qrUrl;
    qrcode.alt= "QR Code";
    qrcode.style.display= "block";
}

// another way using qrcode container div not directly in img tag
// const qrcodeContainer = document.getElementById("qrcode-container");
// function generateqr(){
//     const text = textinput.value.trim();
//     if(text === ""){
//         alert("Please enter some text to generate QR code.");
//         return;
//     }
//     const qrUrl = url + encodeURIComponent(text);
//     qrcodeContainer.innerHTML = `<img src="${qrUrl}" alt="QR Code">`;
//     qrcodeContainer.style.display= "block";
//     qrcodeContainer.style.margin= "0 auto";
// }