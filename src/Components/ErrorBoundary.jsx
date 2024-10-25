import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError : false
        }
    }
    static getDerivedStateFromError(error){
        console.log("Error Handled")
        return {
            hasError : true
        } // inside state
    }
    componentDidCatch(erro , info){
        console.log(erro)
        console.log(info)
    }
    
    render() { 
      if (this.state.hasError){
        return <h1 className='text-danger fw-bold p-5 m-5 notfound text-center '>Something Went Wrong</h1>
      }
      return this.props.children
    }
}
export default ErrorBoundary;