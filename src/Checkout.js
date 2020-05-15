import React from 'react';
import ReactDOM from 'react-dom';

class Checkout extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        "checkout":{
          "borrowerId":"",
          "isbn13":""
        },
        "message":""        
      };  
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState(
      prevState => ({
        checkout: {
          ...prevState.checkout,
          [name]: value
        }
      }));
  }

  handleSubmit(event) {
    event.preventDefault();
    let checkout = this.state.checkout;
    
    console.log(this.state)

    fetch("http://localhost:8080/book/checkout/", {
      method: "POST",
      body: JSON.stringify(checkout),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
      .then(response => {
       console.log(response.message)
       this.setState(
        prevState => ({
            ...prevState.checkout,
            "message": response.message
        }));
    })
  }

  componentDidMount() {
    this.setState(this.props.location.state);  
    this.setState(
      prevState => ({
          ...prevState.checkout,
          "message": ""
      }));
  }

  render() {
      return (
          <div>
              <h1>Library Management</h1>
              <h2>Checkout Portal</h2>

              <div>
                <form onSubmit={this.handleSubmit}>
                  <label htmlFor="isbn13">Enter ISBN 13</label>
                  <br/>
                  <input name="isbn13" value={this.state.checkout.isbn13} type="text" onChange={this.handleInput} required/>
                  <br/>
                  <label htmlFor="borrowerId">Enter Borrower ID</label>
                  <br/>
                  <input name="borrowerId" value={this.state.checkout.borrowerId} type="text" onChange={this.handleInput} required/>
                  <br/>
                  <button onClick={this.handleSubmit}>Checkout</button>                  
                </form>
                <p>{this.state.message}</p>
              </div>
          </div>
  )
  }
}


export default Checkout;
