import { call, put, select } from 'redux-saga/effects';
import TrackPlayer from 'react-native-track-player';

import PlayerActiions from '~/store/ducks/player';

// essa função vai disparada no inicializar da palicação
export function* init() {
  // chama o metodo do trackplayer o setuPlayer para podermos trabalhar com as musicas
  yield call(TrackPlayer.setupPlayer);

  TrackPlayer.addEventListener('playback-track-changed', console.log('playback changed'));
  TrackPlayer.addEventListener('playback-state', console.log('playback changed'));
}

// desestrutuea o action e pega o podcast
export function* setPodcast({ podcast, epdoseId }) {
  // prucura valor no state
  const currentPodcast = yield select(state => state.player.podcast);

  if (!currentPodcast || podcast.id !== currentPodcast.id) {
    // parar de tocar
    yield call(TrackPlayer.stop);
    // reseta a lista de musicas
    yield call(TrackPlayer.reset);

    // TrackPlayer.add: adicona novos audios para a fila do player
    // adiconar todas as tacks atuais do podcast a uma fila
    // cria um novo array para não dar erro de referencia
    yield call(TrackPlayer.add, [...podcast.tracks]);
    yield put(PlayerActiions.setPodcastSuccess(podcast));
  }

  if (epdoseId) {
    // pila para algum episodio passano o id dele
    yield call(TrackPlayer.skip, epdoseId);
    yield put(PlayerActiions.setCurrent(epdoseId));
  }

  // começa a tocar as musicas
  yield call(TrackPlayer.play);
}
