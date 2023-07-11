import { Component } from "react";


class Counter extends Component{
    constructor(props) {
        super(props)
    }
    render () {
       
        return (
            <div>Hello Everyone {this.props.greetingNumber} times
            <button onClick={(event)=>{console.log(event);}}>log the event</button>
            </div>
        )
    }
}

export default Counter;