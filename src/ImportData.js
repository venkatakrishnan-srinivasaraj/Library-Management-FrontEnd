import React from 'react';
import ReactDOM from 'react-dom';
import SearchResults from './SearchResults'
import CheckinSearchResult from './CheckinSearchResult';

class ImportData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "message": "" 
        };
        this.importBooks = this.importBooks.bind(this);
        this.importBorrower = this.importBorrower.bind(this);
    }
  
    importBooks(event) {
        event.preventDefault();
        this.setState({
            "message": "importing books data in background" 
        })
        fetch(`http://localhost:8080/dataimport/book`)
            .then(res => res.text())
            .then(res => {
                console.log({ res });
                this.setState({
                    "message": "imported books data successfully" 
                })
            })          
    }

    importBorrower(event) {
        event.preventDefault();
        this.setState({
            "message": "importing borrower data in background" 
        })
        fetch(`http://localhost:8080/dataimport/borrower`)
            .then(res => res.text())
            .then(res => {
                console.log({ res });
                this.setState({
                    "message": "imported borrower data successfully" 
                })
            })
  
    }
  
    componentDidMount() {
      this.setState({
         "message":""
      });  
    }
  
    render() {
        return (
            <div>
                <h1>Library Management System</h1>
                <h2>Data Importer</h2>
                <div>
                    <button onClick={this.importBorrower}>Import Borrower Data</button>
                    <br/>
                    <br/>
                    <br/>
                    <button onClick={this.importBooks}>Import Borrower Data</button>                  
                </div>
                <p>{this.state.message}</p>
            </div>
    )
    }

}
export default ImportData;
