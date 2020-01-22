import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import LoginInput from '../components/user/LoginInput';
import { Row, Col, Button, Input } from 'antd';  
import axios from 'axios';

axios.defaults.withCredentials = true;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin() {
    const { username, password } = this.state;
    const { handleIsLoginChange, handleUsername } = this.props;

    axios
      .post('http://localhost:5000/user/login', {
        username: username,
        password: password,
      })
      .then(() => {
        handleIsLoginChange();
        handleUsername(username);
        this.props.history.goBack();
      })
      .catch(err => {
        this.setState({ errorMessage: err.message });
        console.log(err.message);
      });
  }

  componentDidMount() {
    this.props.changeCurrentPage('login');
  }

  render() {
    const { isLogin } = this.props;
    const { username, password, errorMessage } = this.state;
    const { handleUsernameChange, handlePasswordChange, handleLogin } = this;

    return (
      <div>
        <Row type="flex" justify="center">
          {isLogin ? <Redirect to="/" /> : ''}
          <LoginInput
            onUsernameChange={handleUsernameChange}
            onPasswordChange={handlePasswordChange}
            username={username}
            password={password}
            handleLogin={handleLogin}
          />
          <p>{errorMessage}</p>
        </Row>
      </div>
    );
  }
}

export default withRouter(Login);
