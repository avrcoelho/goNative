import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StatusBar, AsyncStorage, ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

import api from '~/services/Api';

export default class Welcome extends Component {
  // essa função vai lidar com o fluxo que precisa fazer
  state = {
    username: '',
    loading: false,
    error: false,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  checkUserExists = async (username) => {
    const user = await api.get(`/users/${username}`);

    return user;
  }

  saveUser = async (username) => {
    await AsyncStorage.setItem('@Gihuner:username', username);
  }

  signIn = async () => {
    const { username } = this.state;
    // quando se usa o navigation por padrão ele retorna um propriedade
    const { navigation } = this.props;

    this.setState({ loading: true });

    try {
      await this.checkUserExists(username);
      await this.saveUser(username);

      navigation.navigate('Repositories');
    } catch (err) {
      this.setState({ error: true });
      console.tron.log('Not found');
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { username, loading, error } = this.state;

    return (
      <View styles={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Bem vindo</Text>
        <Text style={styles.text}>
          Para continuar precisamos que você informe seu usuário no Github
        </Text>

        {error && <Text style={styles.error}>Usuário inexistente.</Text>}

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            // nenhuma letra em caixa alta
            autoCapitalize="none"
            // não corrigir automaticamente
            autoCorrect={false}
            placeholder="Digite seu usuário"
            // no android todo input tem um linha por baixo do texto, assim ela não aparece
            underlineColorAndroid="transparent"
            value={username}
            onChangeText={text => this.setState({ username: text })}
          />

          <TouchableOpacity style={styles.button} onPress={this.signIn}>
            {loading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.buttonText}>Prosseguir</Text>}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
