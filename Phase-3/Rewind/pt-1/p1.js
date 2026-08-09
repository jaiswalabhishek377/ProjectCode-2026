const color = "blue";

if(true){
    let animal = "lion";
    var food = "pasta";
}

console.log(color);
console.log(food);
// console.log(animal); //error 

//arrowfn

const createVault =  (secretpass) => {
    return (passwordguess) =>  {
        return secretpass === passwordguess ? "Access Granted!" : "Access Denied!";
    };
};

const myVault = createVault("supersecret");
console.log(myVault("hey"));
console.log(myVault("supersecret"));