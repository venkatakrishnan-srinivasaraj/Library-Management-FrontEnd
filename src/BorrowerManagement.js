import React from 'react';
import ReactDOM from 'react-dom';

class BorrowerManagement extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        borrower:{
            "firstName":"",
            "lastName":"",
            "ssn" : "",
            "email":"",
            "phoneNumber":""
        },
        "message":""
    };  
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInput = this.handleInput.bind(this);
      this.validateSSN = this.validateSSN.bind(this);
  }

  handleInput(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState(
      prevState => ({
        borrower: {
          ...prevState.borrower,
          [name]: value
        }
      }));
  }

  validateSSN(ssnValue){
    var  ssnPattern = /^[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}$/;
    return ssnPattern.test(ssnValue);
  }

  handleSubmit(event) {
    event.preventDefault();
    let borrower = this.state.borrower;
    
    fetch("http://localhost:8080/borrower", {
      method: "POST",
      body: JSON.stringify(borrower),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response=> response.text())
    .then(response => {
       console.log(response)
       this.setState({
        borrower:{
          "firstName":"",
          "lastName":"",
          "ssn" : "",
          "email":"",
          "phoneNumber":""
        },
        "message": response
       })
    })
  }

  componentDidMount() {
    this.setState({
        borrower:{
            "firstName":"",
            "lastName":"",
            "ssn" : "",
            "email":"",
            "phoneNumber":""
        }
    });  
  }

  render() {
      return (
          <div>
              <h1>Library Management</h1>
              <h2>Borrower Management</h2>
              <div>
                <form onSubmit={this.handleSubmit}>
                  <label htmlFor="firstName">Enter FirstName</label>
                  <br/>
                  <input name="firstName" value={this.state.borrower.firstName} type="text" onChange={this.handleInput} required/>
                  <br/>
                  <label htmlFor="lastName" >Enter LastName</label>
                  <br/>
                  <input name="lastName" value={this.state.borrower.lastName} type="text" onChange={this.handleInput} required/>
                  <br/>
                  <label htmlFor="ssn">Enter SSN in below format</label>
                  <br/>
                  <label htmlFor="ssn">Example (123-456-7890)</label>
                  <br/>
                  <input name="ssn" type="text" value={this.state.borrower.ssn} onChange={this.handleInput} required/>
                  <br/>
                  <label htmlFor="email">Enter E-mail</label>
                  <br/>
                  <input name="email" type="text" value={this.state.borrower.email} onChange={this.handleInput}/>
                  <br/>
                  <label htmlFor="phoneNumber">Enter PhoneNumber</label>
                  <br/>
                  <input name="phoneNumber" type="text" value={this.state.borrower.phoneNumber} onChange={this.handleInput}/>
                  <br/>
                  <br/>
                  <br/>
                  <button onClick={this.handleChange}>Create Borrower</button>
                  <p>{this.state.message}</p>
                </form>
              </div>
          </div>
  )
  }
}


export default BorrowerManagement;
