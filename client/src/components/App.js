import React,{Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import SignIn from './Login'
import SignUp from './Register'
import noAuth from './hoc/no_auth'
import requireAuth from './hoc/require_auth'
import UserFeed from './userfeed';


class App extends Component{
  render(){
  return (
    <BrowserRouter>
    <div>
      <Route path="/signin" component={noAuth(SignIn)} />
      <Route path="/signup" component={noAuth(SignUp)}/>
      <Route path="/secret" component={requireAuth(UserFeed)}/>
    </div>
    </BrowserRouter>
  );
}
}


export default (App);
