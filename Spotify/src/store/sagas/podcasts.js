import { call, put } from 'redux-saga/effects';
import api from '~/services/api';

// as actions são exportadas como default desse arquivo
import PodcastsActions from '~/store/ducks/podcasts';

export function* load() {
  try {
    const { data } = yield call(api.get, 'podcasts');

    yield put(PodcastsActions.loadSuccess(data));
  } catch (err) {
    yield put(PodcastsActions.loadFailure());
  }
}
