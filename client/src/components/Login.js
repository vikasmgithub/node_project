import React,{Component} from 'react'
import {connect} from 'react-redux';
import {signInAction} from '../actions/index'


class Signin extends Component{
  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      username:'',
      password:''
    };
  }

  handleEmailChange(e){
    this.setState({username:e.target.value})
  }
  handlePasswordChange(e){
    this.setState({password:e.target.value})
  }

  onFormSubmit(event){
      event.preventDefault();
      const values = {
        username:this.state.username,
        password:this.state.password
      }
      this.props.dispatch(signInAction(values,this.props.history));
  }

  errorMessage() {
  if (this.props.errorMessage) {
    return (
      <div className="info-red">
        {this.props.errorMessage}
      </div>
    );
  }
}

  debugger(){
    if(this.props.authenticated){
      return(
        <div className="info-red">true
        </div>
      )
    }
    else{
      return(
        <div className="info-red">False
        </div>
      )
    }
  }

  render(){
    return(
      <div>
      <form className="form-signin" onSubmit={this.onFormSubmit}>
                <h2 className="form-signin-heading"> Please sign in </h2>
                <label className="sr-only"> Email address
                </label>
                <input value={this.state.email} id="inputEmail" onChange={this.handleEmailChange} className="form-control" placeholder="Username" required  />
                <label className="sr-only"> Password</label>
                <input value={this.state.password} id="inputPassword" onChange={this.handlePasswordChange} className="form-control" placeholder="Password" required />
                <button className="btn btn-lg btn-primary btn-block" type="submit"> Sign in
                </button>
      </form>
      {this.errorMessage()}
      {this.debugger()}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { errorMessage: state.auth.error,
            authenticated:state.auth.authenticated};
}

export default connect(mapStateToProps,{signInAction})(Signin)
