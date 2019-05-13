import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, AsyncStorage, ActivityIndicator, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from '~/services/Api';

// componentes
import Header from '~/components/Header';
import RepositoryItem from './RepositoryItem';

// styles
import styles from './styles';

// criou em formato de função para poder pegar a "tintColor" e passar para o Icone
const TabIcon = ({ tintColor }) => <Icon name="list-alt" size={20} color={tintColor} />;

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default class Repositories extends Component {
  // é o que o react navigatiion vai buscar dentro de cada pagina para ver as configurações especificas
  static navigationOptions = {
    tabBarIcon: TabIcon,
  };

  state = {
    data: [],
    loading: true,
    refreshing: false
  };

  componentDidMount() {
    this.loadingRepositories();
  }

  loadingRepositories = async () => {
    this.setState({ refreshing: true });

    const username = await AsyncStorage.getItem('@Githuber:username');
    // busca todos osrepositorios do usuario no github
    const { data } = await api.get(`/users/${username}/repos`);

    this.setState({ data, loading: false, refreshing: false });
  }

  renderListItem = ({ item }) => <RepositoryItem repository={item} />

  renderList = () => {
    const { data, refreshing } = this.state;

    return (
      <FlatList
      // data que vai montar a lista
        data={data}
        // recebe cada item da lista e reortna o valor que é unico
        // o react native pede para retornar isso como string, por isso o "String" por volta
        keyExtractor={item => String(item.id)}
        // como vai renderizar cada item da lista
        renderItem={this.renderListItem}
        // faz o refresh ao puxar a lista para baixo
        onRefresh={this.loadingRepositories}
        refreshing={refreshing}
       />
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <View style={styles.container}>
        <Header title="Repositórios" />
        {loading ? <ActivityIndicator style={styles.loading} /> : this.renderList() }
      </View>
    );
  }
}
