import React from "react";
import { connect } from 'dva';
import UsersList from "../components/Users"

// import * as apis from '../services/example'

class Users extends React.PureComponent {
  render() {
    console.log("this.props", this.props);
    return (
      <UsersList></UsersList>
    );
  }
}
Users.propTypes = {}
export default connect()(Users);
