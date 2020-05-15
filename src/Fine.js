import React from 'react';
import ReactDOM from 'react-dom';
import FineByBorrower from './FineByBorrower'
import './App.css';
// const React = require('react');
// const ReactDOM = require('react-dom');

class Fine extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          searchString : "",
          fineByBorrower: {
            "borrower":{
              "borrowerId": "",
              "firstName": "",
              "lastName": "",
            },
            "fines":[],
            "totalFine":{
              "payableFine":0
            },
            "message":""
          }
      };
      this.handleChange = this.handleChange.bind(this);
      this.refreshFines = this.refreshFines.bind(this);
  }

  refreshFines(event){
    event.preventDefault();
    this.setState(
      prevState => ({
        borrower: {
          ...prevState.borrower
        },
        fines:{
          ...prevState.fines
        },
        totalFine:{
          ...prevState.totalFine
        },
        message: "refreshing fines in background"
      }));
        fetch(`http://localhost:8080/fine/refresh`)
        .then(response=>response.text())
        .then((response) => {
          this.setState(
            prevState => ({
              borrower: {
                ...prevState.borrower
              },
              fines:{
                ...prevState.fines
              },
              totalFine:{
                ...prevState.totalFine
              },
              message: "refreshed fines successfully"
            }));
        })
  }

  handleChange(event) {
      event.preventDefault();
      var newSearchString = document.getElementById("search").value;
      console.log(newSearchString)
      if(newSearchString.trim() === ""){
          this.setState({
              searchString : "",
              fineByBorrower: {
                "borrower":{
                  "borrowerId": "",
                  "firstName": "",
                  "lastName": "",
                },
                "fines":[],
                "totalFine":{
                  "payableFine":0
                },
                "message":""
              }
            });
      }else{
          fetch(`http://localhost:8080/fine/borrower/`+newSearchString)
              .then(res => res.json())
              .then(data => {
                  console.log({ data });
                  this.setState({
                      searchString: newSearchString,
                      fineByBorrower : data
                  });
              })
              .catch(err => {
                console.log(err)
                this.setState({
                  searchString : "",
                  fineByBorrower: {
                    "borrower":{
                      "borrowerId": "",
                      "firstName": "",
                      "lastName": "",
                    },
                    "fines":[],
                    "totalFine":{
                      "payableFine":0
                    },
                    "message":""
                  }
                });
              });
          
      }

  }

  componentDidMount() {
    this.setState({
      searchString : "",
      fineByBorrower : {
        "borrower":{
          "borrowerId": "",
          "firstName": "",
          "lastName": "",
        },
        "fines":[],
        "totalFine":{
          "payableFine":0
        },
        "message":""
      }
    });  
  }

  render() {
      return (
          <div>
              <h1>Library Management System</h1>
              <h2>Fine Portal</h2>
              <button onClick={this.refreshFines}>Refresh Fines</button>
              <br/>
              <p>{this.state.message}</p>
              <br/>
              <h3>Search Borrower Fines</h3>
              <div>
                <form>
                  <input id="search" type="text" placeholder="type borrower id" />
                  <button onClick={this.handleChange}>Search</button>
                  <hr />
                </form>
                
              </div>
              <FineByBorrower fineByBorrower={this.state.fineByBorrower}/>
          </div>
  )
  }
}

export default Fine;
