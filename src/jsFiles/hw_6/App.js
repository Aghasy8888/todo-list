import "./App.css";

import Product from "./jsFiles/hw_6/Pruduct";
import Input from "./jsFiles/hw_6/input";

function App() {
  const fruits = [
    {
      name: "Apple",
      price: "2$",
      desc: "Apples from Armenia",
    },
    {
      name: "Banana",
      price: "3$",
      desc: "Fresh bananas from Ecuador",
    },
    {
      name: "Watermelon",
      price: "3.5$",
      desc: "Sweet Watermelons from Armavir",
    },
    {
      name: "Pitch",
      price: "2$",
      desc: "Big pitches from Shirak",
    },
  ];
  const li = fruits.map((fruit, index) => {
    return (
      <li key={index}>
        <Product name={fruit.name} price={fruit.price} desc={fruit.desc} />
      </li>
    );
  });

  return (
    <div className="App">
      <Input />
      <header className="App-header">{/*<Product />*/}</header>
      <ol>{li}</ol>
    </div>
  );
}

export default App;
