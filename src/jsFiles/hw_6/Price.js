import { Component } from "react";

class Price extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: props.price,
    };
  }

  changeTheCurrency() {
    let { price } = this.state;
    let priceNumber = parseFloat(price);
    if (price.includes("$")) {
      price = priceNumber * 500 + "֏";
    } else {
      price = priceNumber / 500 + "$";
    }
    this.setState({ price: price });
  }

  render() {
    const { price, currency } = this.state;

    return (
      <div>
        <span>
          Price: {price}
          {currency}
        </span>

        <span>
          <button onClick={() => this.changeTheCurrency()}>
            Change the currency
          </button>
        </span>
      </div>
    );
  }
}

export default Price;
