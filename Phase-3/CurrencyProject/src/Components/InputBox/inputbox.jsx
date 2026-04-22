import React, { useId } from 'react'

function InputBox({ 
srcdest ,
amount,
onAmountChange,
onCurrencyChange,
currencyOptions=[],
selectedCurrency="USD",
amountDisabled=false,
currencyDisabled=false,}){

const amountInputId = useId();
const currencySelectId = useId();
 
  return (
    <div className='w-150 h-40 my-2 border border-amber-50 bg-blue-100 rounded-2xl flex justify-between  items-center'>
        <div className='flex flex-col gap-2 mx-2'>
            <label htmlFor={amountInputId}>{srcdest}</label>
            <input type="number" id={amountInputId} value={amount} onChange={(e)=>onAmountChange && onAmountChange( e.target.value != '' ? Number(e.target.value) : '')}  disabled={amountDisabled} placeholder='0' className='border-2 border-gray-300 rounded-lg p-2 w-50 h-10 outline-none' />
        </div>
        <div className='flex flex-col gap-2 mx-2'>
            <label htmlFor={currencySelectId}>Currency Type</label>
            <select id={currencySelectId} value={selectedCurrency} onChange={(e)=>onCurrencyChange && onCurrencyChange(e.target.value)} disabled={currencyDisabled} className='border-2 border-gray-300 rounded-lg p-2 w-30 h-10'>
                {currencyOptions.map((currency) => (
                    <option key={currency} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
        </div>
    </div>
  )
}

export default InputBox