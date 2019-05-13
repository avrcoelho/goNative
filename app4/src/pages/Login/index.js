import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoginActions from '~/store/actions/login';

import {
  Container, Input, Button, ButtonText, Error,
} from './styles';
import api from '~/services/api';


class Login extends Component {
  state = {
    username: '',
  }

  handleSubmit = async () => {
    const { username } = this.state;
    const { loginSuccess, loginFailure, navigation } = this.props;

    try {
      await api.get(`users/${username}`);

      loginSuccess(username);

      navigation.navigate('Repositories');

    } catch (err) {
      loginFailure();
    }
  }

  render() {
    const { username } = this.state;
    const { error } = this.props;

    return (
      <Container>
        {error && <Error>usuários inexistente</Error>}

        <Input
          value={username}
          onChange={text => this.setSate({ username: text })}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Digite seu usuário"
        />
        <Button onPress={this.handleSubmit}>
          <ButtonText>Entrar</ButtonText>
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  error: state.login.error,
});

const mapDispatchToProps = dispatch => bindActionCreators(LoginActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
