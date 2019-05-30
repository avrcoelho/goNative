import {
  call, put, select, take,
} from 'redux-saga/effects';
// eventChannel: ouvir eventListeners dentor do saga
import { eventChannel } from 'redux-saga';
import TrackPlayer from 'react-native-track-player';

import PlayerActions from '~/store/ducks/player';

function* trackChanged() {
  // emitter: deve ser chamado toda vez que recebe um eventlistener
  const channel = eventChannel((emitter) => {
    const onTrackChange = TrackPlayer.addEventListener('playback-check-changed', emitter);

    // quando o eventChanner for fechando, o onTrackChange vai ser removido
    // para não ficar ouvindo desnecessariamente
    return () => onTrackChange.remove();
  });

  try {
    while (true) {
      const { nextTrack } = yield take(channel);

      // seta o id da proxima musica que tem que tocar
      yield put(PlayerActions.setCurrent(nextTrack));
    }
  } finally {
    channel.close();
  }
}

// essa função vai disparada no inicializar da palicação
export function* init() {
  // chama o metodo do trackplayer o setuPlayer para podermos trabalhar com as musicas
  yield call(TrackPlayer.setupPlayer);

  // poder habiliatr controles de musica em background
  TrackPlayer.updateOptions({
    // stopWithApp: true,
    // quais ações o usuario vai poder fazer em background
    //  ios
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      TrackPlayer.CAPABILITY_STOP,
    ],
    // android
    notificationCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      TrackPlayer.CAPABILITY_STOP,
    ],
    // player menor
    compactCapabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
  });

  // aqui pode configurar caso receba uma ligação ai pausar a musica
  TrackPlayer.addEventListener('playback-state', () => {});
}

// desestrutuea o action e pega o podcast
export function* setPodcast({ podcast, episodeId }) {
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
    yield put(PlayerActions.setPodcastSuccess(podcast));
  }

  if (episodeId) {
    // pila para algum episodio passano o id dele
    yield call(TrackPlayer.skip, episodeId);
    yield put(PlayerActions.setCurrent(episodeId));
  }

  // começa a tocar as musicas
  yield put(PlayerActions.play());
  yield call(trackChanged);
}

export function* play() {
  yield call(TrackPlayer.play);
}

export function* pause() {
  yield call(TrackPlayer.pause);
}

export function* prev() {
  const player = yield select(state => state.player);
  const currentIndex = player.podcast.tracks.findIndex(episode => episode.id === player.current);

  if (player.podcast.tracks[currentIndex - 1]) {
    yield call(TrackPlayer.skipToPrevious);
    yield put(PlayerActions.play());
  }
}

export function* next() {
  const player = yield select(state => state.player);
  const currentIndex = player.podcast.tracks.findIndex(episode => episode.id === player.current);

  if (player.podcast.tracks[currentIndex + 1]) {
    yield call(TrackPlayer.skipToNext);
    yield put(PlayerActions.play());
  }
}

export function* reset() {
  // parar de tocar
  yield call(TrackPlayer.stop);
  // reseta a lista de musicas
  yield call(TrackPlayer.reset);
}
