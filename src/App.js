import React, { useState } from 'react';
import { Input } from './components';
import useCurrency from './hooks/useCurrency';

function App() {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('pkr');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrency(from);

  const swap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  const options = Object.keys(currencyInfo);

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      loading="lazy"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1502920514313-52581002a659?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
              
            }}
          >
            <div className="w-full mb-1">
              <Input
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setAmount(amount)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <Input
                label="To"
                amount={convertedAmount}
                selectCurrency={to}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency) }
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {from.toLocaleUpperCase()} to {to.toLocaleUpperCase()}
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;