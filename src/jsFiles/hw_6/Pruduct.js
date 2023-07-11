import { Component } from "react";
import Describtion from "./Describtion";
import Name from "./Name";
import Price from "./Price";

class Product extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { desc, price, name } = this.props;
    return (
      <>
        <Name name={name} />
        <Price price={price} />
        <Describtion describtion={desc} />
      </>
    );
  }
}

export default Product;
