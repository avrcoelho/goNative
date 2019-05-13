import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, AsyncStorage, ActivityIndicator, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from '~/services/Api';

// componentes
import Header from '~/components/Header';
import OrganizationItem from './OrganizationItem';
import styles from './styles';

// criou em formato de função para poder pegar a "tintColor" e passar para o Icone
const TabIcon = ({ tintColor }) => <Icon name="building" size={20} color={tintColor} />;

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default class Organizations extends Component {
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
    this.loadingOrganizations();
  }

  loadingOrganizations = async () => {
    this.setState({ refreshing: true });

    const username = await AsyncStorage.getItem('@Githuber:username');
    console.log(username)
    // busca todos osrepositorios do usuario no github
    const { data } = await api.get(`/users/${username}/orgs`);


    this.setState({ data, loading: false, refreshing: false });
  }

  renderListItem = ({ item }) => <OrganizationItem organization={item} />

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
        onRefresh={this.loadingOrganizations}
        // numero de colunas por linha
        numColumns={2}
        columnWrapperStyle={styles.columnWrapperStyle}
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
