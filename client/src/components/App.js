import React,{Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import ContactForm from './Login'

class App extends Component{

  submit = values => {
  // print the form values to the console
  console.log(values)
}


  render(){
  return (
    <BrowserRouter>
      <div className="container">
      <ContactForm onSubmit={this.submit} />
      </div>
    </BrowserRouter>
  );
}
}


export default (App);
