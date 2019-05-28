import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PodcastsActions from '~/store/ducks/podcasts';

import {
  Container, PodcastList, PageTitle, Podcast, Title, Info, Count, Cover,
} from './styles';

class Main extends Component {
  componentDidMount() {
    const { loadRequest } = this.props;

    loadRequest();
  }

  render() {
    const { podcasts } = this.props;

    return (
      <Container>
        <PodcastList
          // coloca um item no topo da lista
          ListHeaderComponent={() => <PageTitle>Podcasts</PageTitle>}
          data={podcasts.data}
          // recebe cada podcast e retorna o id como string
          keyExtractor={podcast => String(podcast.id)}
          // renerica cada item do podcast
          // renomei o item para o que quiser
          renderItem={({ item: podcast }) => (
            // renderiza um botão para clique
            <Podcast onPress={() => {}}>
              <Cover source={{ uri: podcast.cover }} />
              <Info>
                <Title>{podcast.title}</Title>
                <Count>{`${podcast.tracks.length}`}</Count>
              </Info>
            </Podcast>
          )}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  podcasts: state.podcasts,
});

const mapDispatchToProps = dispatch => bindActionCreators(PodcastsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
