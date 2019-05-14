import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import api from '~/services/api'
import { navigate } from '~/services/navigation'

import { Creators as LoginActions, Types as LoginTypes } from '~/store/ducks/login';
import { Creators as RepositoriesActions, Types as RepositoriesTypes } from '~/store/ducks/repositories';

function* login(action) {
  try {
    const { username } = action.payload;

    yield call(api.get, `/users/${username}`);

    yield put(LoginActions.loginSuccess(username));

    navigate('Repositories');

  } catch (err) {
    yield put(LoginActions.loginFailure());
  }
}

function* loadRepositories() {
  try {
    // select busca informação de um estado dentro do redux
    // no select recebe todo os estado da aplicação
    const { username } = yield select(state => state.login);

    const { data } = yield call(api.get, `/users/${username}/repos`);

    yield put(RepositoriesActions.loadRepositoriesSuccess(data))
  } catch (err) {
    yield put(RepositoriesActions.loadRepositoriesFailure())
  }
}

export default function* rootSaga() {
  return yield all([
    takeLatest(LoginTypes.REQUEST, login),
    takeLatest(RepositoriesTypes.LOAD_REQUEST, loadRepositories),
  ]);
}
