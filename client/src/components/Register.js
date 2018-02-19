import React,{Component} from 'react'
import {connect} from 'react-redux'
import {signUpAction} from '../actions/index'



class Signup extends Component{

  constructor(props)
  {
    super(props)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.state = {
      name:'',
      username:'',
      email:'',
      password:''
    }
  }

  handleNameChange(e){
    this.setState({name:e.target.value})
  }
  handleEmailChange(e){
    this.setState({email:e.target.value})
  }
  handleUsernameChange(e){
    this.setState({username:e.target.value})
  }
  handlePasswordChange(e){
    this.setState({password:e.target.value})
  }


  onFormSubmit(event){
      event.preventDefault();
      const values = {
        name:this.state.name,
        email:this.state.email,
        username:this.state.username,
        password:this.state.password
      }
      this.props.signUpAction(values,this.props.history);
  }





  render(){
    return(
      <div>
      <form className="form-signin" onSubmit={this.onFormSubmit}>
                <h2 className="form-signin-heading"> Please sign up </h2>
                <label className="sr-only"> Name
                </label>
                <input value={this.state.name} id="inputEmail" onChange={this.handleNameChange} className="form-control" placeholder="Name" required  />
                <label className="sr-only"> Email</label>
                <input value={this.state.Email} id="inputPassword" onChange={this.handleEmailChange} className="form-control" placeholder="Email" required />
                <label className="sr-only"> Username
                </label>
                <input value={this.state.username} id="inputEmail" onChange={this.handleUsernameChange} className="form-control" placeholder="Username" required  />
                <label className="sr-only"> Password
                </label>
                <input type="password" value={this.state.password} id="inputEmail" onChange={this.handlePasswordChange} className="form-control" placeholder="Password" required  />
                <button className="btn btn-lg btn-primary btn-block" type="submit"> Sign Up
                </button>
      </form>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return { errorMessage: state.reg.error };
}


export default connect(mapStateToProps,{signUpAction})(Signup)
