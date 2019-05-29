// reduxsauce: serve para facilitar a criação de ducks
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// reduxsauce podemos criar os Types e os Creatprs na mesma função
const { Types, Creators } = createActions({
  // passa o nome das actions
  setPodcastRequest: ['podcast', 'episodeId'],
  setPodcastSuccess: ['podcast'],
  setCurrent: ['id'],
});

// Types: {LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE}
// Creators:
/*
  loadRequest: () => ({ type: LOAD_REQUEST })
  loadSuccess: () => ({ type: LOAD_REQUEST, data })
  loadFailure: () => ({ type: LOAD_REQUEST })
*/
// aqui não precisa passar o payload

export const PlayerTypes = Types;
export default Creators;

// initial state

// Immutable: faz com que a variavel INITIAL_STATE imutavel. Garante que o valor não seja alterado
export const INITIAL_STATE = Immutable({
  podcast: null,
  current: null,
});

// Reducer
// essa função vai retornar tipo um switch case
export const reducer = createReducer(INITIAL_STATE, {
  // merge: função do Immutable
  // como o state é imutabel, não precisa copiar todo o estado novamente para ele retronar,
  // é só usar o merge e passar o valor que quer alterar
  //  action type na esquerda e o que vai acontecer na direita
  [Types.SET_PODCAST_SUCCESS]: (state, action) => state.merge({ podcast: action.podcast, current: action.podcast.tracks[0].id }),
  [Types.SET_CURRENT]: (state, action) => state.merge({ current: action.id }),
});
