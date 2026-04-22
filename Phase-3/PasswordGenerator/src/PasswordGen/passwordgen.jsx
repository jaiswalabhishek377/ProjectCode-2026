import React, { useCallback, useRef, useState } from 'react'

const PassGeneration = () => {

    const [password,setPassword] = useState("");
    const [length,setLength] = useState(6);
    const [includeNumbers,setIncludeNumbers] = useState(false);
    const [includeSymbols,setIncludeSymbols] = useState(false);

    const passRef = useRef(null);
    const generatePassword = useCallback(() => {
        let charPool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (includeNumbers) {
            charPool += "0123456789";
        }
        if (includeSymbols) {
            charPool += "!@#$%^&*()_+";
        }
        
        let newPass = "";
        for (let i = 0; i < length; i++) {
            newPass += charPool[Math.floor(Math.random() * charPool.length)];
        }
        setPassword(newPass);

    }, [length, includeNumbers, includeSymbols,setPassword]);

    function copyToClipboard(){
       // navigator.clipboard.writeText(passRef.current.value);
        navigator.clipboard.writeText(password);
        alert("Password copied to clipboard!");
    }

    // useEffect(() => {
    //     generatePassword();
    // }, [length, includeNumbers, includeSymbols, generatePassword]);

  return (
    <div className='w-200 h-50 bg-white text-black p-8 rounded-2xl shadow-lg flex flex-col gap-8 justify-center items-center'>
        <div>
            <input className='outline-none border-2 border-black rounded-xl py-5 px-5  w-100 h-10' type="text" placeholder="Generated Password" value={password} readOnly/>
            <button className='border-2 text-amber-50 bg-amber-950 rounded-2xl py-4 px-4 text-center w-20 h-10' onClick={copyToClipboard}>Copy</button>
        </div>
        <div className='flex justify-center items-center gap-4'>
            <div className='gap-2 flex justify-center items-center'>
                <input type="range" min="6" max="50" value={length} ref={passRef} onChange={(e)=>setLength(e.target.value)}/>
                <label>Length:{length}</label>  
            </div>
            <div className='gap-2 flex justify-center items-center'> 
                <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
                <label >Numbers</label>
            </div>
            <div className='gap-2 flex justify-center items-center'>
                <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
                <label >Symbols</label>
            </div>
        </div>
        <button className='border-2 text-amber-50 bg-amber-950 rounded-2xl py-4 px-4 text-center w-20 h-10' onClick={generatePassword}>Generate</button>
    </div>
  )
}

export default PassGeneration;