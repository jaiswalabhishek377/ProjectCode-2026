import React, { useState } from 'react'
import InputBox from './Components/InputBox/inputbox.jsx'
import useCurrencyInfo from './hooks/useCurrencyInfo.js'

const App = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("inr");
  const [result, setResult] = useState(0);
  const fromCurrencyInfo = useCurrencyInfo(fromCurrency);
  const options = Object.keys(fromCurrencyInfo || {});

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(amount);
    setAmount(result);
  }
  
  const handleConvert = () => {
    if(fromCurrency === toCurrency){
      setResult(amount);
    }else{
      const conversionRate = fromCurrencyInfo[toCurrency];
      setResult(amount * conversionRate);
    }
  }


  return (
    <div className='w-full h-screen flex flex-wrap justify-center items-center bg-cover' style={{backgroundImage:`url("https://images.pexels.com/photos/33321643/pexels-photo-33321643.jpeg")`}}>
      <div className='w-200 h-100 border border-white bg-white opacity-65 rounded-2xl flex justify-center items-center flex-col gap-2 relative'>
        <InputBox srcdest="From" amount={amount} onAmountChange={(amount) => setAmount(amount)} currencyOptions={options}  selectedCurrency={fromCurrency} onCurrencyChange={setFromCurrency} />
        <button onClick={handleSwap} className='absolute top-43 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-amber-100 p-2 text-center rounded-xl w-30 h-10 bg-amber-100 hover:bg-amber-200' >Swap</button>
        <InputBox srcdest="To" amount={result} amountDisabled={true} currencyOptions={options} selectedCurrency={toCurrency} onCurrencyChange={setToCurrency} />
        <button onClick={handleConvert} className='border-2 border-amber-100 p-2 text-center rounded-xl w-30 h-10 bg-amber-100 hover:bg-amber-200 mb-1' >Convert</button>
      </div>
    </div>
  ) 
}

export default App