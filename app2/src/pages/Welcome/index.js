import React, { Component } from 'react';

import {
  View, Text, TextInput, TouchableOpacity, StatusBar, AsyncStorage
} from 'react-native';

import styles from './styles';

import api from '~/services/Api';

export default class Welcome extends Component {
  // essa função vai lidar com o fluxo que precisa fazer
  state = {
    username: '',
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

    try {
      await this.checkUserExists(username);
      await this.saveUser(username);

      navigation.navigate('Repositories');
    } catch (err) {
      console.tron.log('Not found');
    }


  };

  render() {
    const { username } = this.state;

    return (
      <View styles={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Bem vindo</Text>
        <Text style={styles.text}>
          Para continuar precisamos que você informe seu usuário no Github
        </Text>

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
            <Text style={styles.buttonText}>Prosseguir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
