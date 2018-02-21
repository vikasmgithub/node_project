import React,{Component} from 'react'
import {connect} from 'react-redux'
import {profileRequest} from '../actions/index'
//token = JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTg3ZDFhNzlmYWE5YjU4ZTAxMzRiNTciLCJuYW1lIjoidmlrYXMiLCJlbWFpbCI6InZpa2FzQG5zamNuIiwidXNlcm5hbWUiOiJ2aWthc20iLCJwYXNzd29yZCI6IiQyYSQxMCRJaktkYnRhWEtMU0hudUE1aFZZTnJ1ZHEzSVIxTm1ZbjhJcHhTUlNGM1VNMk5pSjVwOEYzSyIsIl9fdiI6MCwiaWF0IjoxNTE5MDQ0NjkzLCJleHAiOjE1MTk2NDk0OTN9.tFdFHIskj4vQPvL979U-oeLHzge0m0y4VpjLdhRSb9k

class UserFeed extends Component{

  componentWillMount(){
    var token = localStorage.getItem('user');
    var values = {
      Authorization:token
    }
      this.props.profileRequest(values);
  }




  render(){
    const ProfileDisplay = ({currentProfile}) => {
      if (!currentProfile) { // evaluates to true if currentVideo is null
        return <div>Loading...</div>;
      }
      return (
        <div>
        <div>
        Name:{currentProfile.user.name}
        </div>
        <div>
        Email:{currentProfile.user.email}
        </div>
        </div>
      );
    };

    return(
      <div>
          <ProfileDisplay currentProfile={this.props.ProfileData} />
      </div>
    )
  }
}

function mapStateToProps(state){
    return {
      ProfileData:state.prof.profile,
    }
}


export default connect(mapStateToProps,{profileRequest})(UserFeed)
