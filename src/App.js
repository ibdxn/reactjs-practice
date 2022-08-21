import { useEffect, useState } from "react";
import React from 'react';


function USDtoCoins({ prices }) {
  const [amount, setAmount] = React.useState(0);
  const [inverted, setInverted] = React.useState(false);
  const onChange = (event) => {
    console.log(event.target.value);
    setAmount(event.target.value);
    console.log(prices);
  };

  const reset = () => setAmount(0);
  const onInvert = () => {
    reset();
    setInverted((current) => !current);
  };

  return (

    <div>
      <div>
        <label htmlFor="usd">USD</label>
        <input
          value={inverted ? amount * prices : amount}
          id="usd"
          placeholder="USD"
          type="number"
          onChange={onChange}
          disabled={inverted}
        />
      </div>

      <div>
        <label htmlFor="coin">Coins</label>
        <input
          value={inverted ? amount : amount / prices}
          id="coin"
          placeholder="coin"
          type="number"
          onChange={onChange}
          disabled={!inverted}
        />
      </div>
      <button onClick={reset}>Reset</button>
      <button onClick={onInvert}>{inverted ? "Turn back" : "Invert"}</button>
    </div>


  );
}

function App() {

  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [price, setPrice] = useState(0);
  const onSelect = (event) => {
    setPrice(event.target.value)
    console.log(event.target.value);
    // price = event.target.value
    console.log(price);
  }

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=10")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>

      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>

      {loading ? <strong>    Loading...</strong> : null
      }
      <select onChange={onSelect}>
        {coins.map((coin, index) =>
          <option key={index} value={String(coin.quotes.USD.price)} >
            {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
          </option>

        )}
      </select>
      {<USDtoCoins prices={price} />}



    </div>
  );
} export default App;

