import React,{Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import SignIn from './Login'

class App extends Component{

  render(){
  return (
    <BrowserRouter>
      <div className="container">
      <SignIn />
      </div>
    </BrowserRouter>
  );
}
}


export default (App);
