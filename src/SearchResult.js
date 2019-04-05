import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import Checkout from './Checkout'
import './App.css';


class SearchResult extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isCheckoutPossible : false
        }
        this.handleCheckout = this.handleCheckout.bind(this);
    }

    handleCheckout(event) {
        let isCheckoutPossible = this.state.isCheckoutPossible

        if(!isCheckoutPossible){
            event.preventDefault();
        }

    }

    componentDidMount(){
        this.setState({
            isCheckoutPossible : this.props.searchResult.bookAvailableForBorrowing
        })
    }

    render() {
        return (
            <tr>
                <td>{this.props.searchResult.bookAuthorMap.book.isbn13}</td>
                <td>{this.props.searchResult.bookAuthorMap.book.title}</td>
                <td>{this.props.searchResult.bookAuthorMap.author.name}</td>
                <td>{this.props.searchResult.bookAuthorMap.book.publisher}</td>
                <td>{ 
                        !this.props.searchResult.bookAvailableForBorrowing
                        ? <Link className="disabledCursor" onClick={ (e) => e.preventDefault()} to={{
                            pathname: '/checkout',
                            state: {  
                                "checkout":{
                                    "borrowerId": "",
                                    "isbn13": this.props.searchResult.bookAuthorMap.book.isbn13
                                },
                                "checkoutDone":false     
                            }}}>Checkout</Link>
                        : <Link className="notDisabled" to={{
                            pathname: '/checkout',
                            state: {  
                                "checkout":{
                                    "borrowerId": "",
                                    "isbn13": this.props.searchResult.bookAuthorMap.book.isbn13
                                },
                                "checkoutDone":false     
                            }
                        }}>Checkout</Link>
                    }</td>
                {/* <td><Link onClick={this.handleCheckout} style={this.props.searchResult.bookAvailableForBorrowing ? null : {pointerEvents: "none"}} to={{
                                pathname: '/checkout',
                                state: {  
                                    "checkout":{
                                        "borrowerId": "",
                                        "isbn13": this.props.searchResult.bookAuthorMap.book.isbn13
                                    },
                                    "checkoutDone":false     
                                }
                    }} >Checkout</Link></td> */}
            </tr>
        )
    }
  }

  export default SearchResult;