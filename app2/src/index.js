import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import '~/config/ReactotronConfig';

import createNavigator from './routes';

export default class App extends Component {
  state = {
    userChecked: false,
    userLogged: false,
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@Githuber:username');

    // !! troca o valor para booleano
    await this.setState({ userChecked: true, userLogged: !!username });
  }

  render() {
    const { userChecked, userLogged } = this.state;

    // para não retornar nada
    if (!userChecked) return null;

    const Routes = createNavigator(userLogged);

    return <Routes />;
  }
}
