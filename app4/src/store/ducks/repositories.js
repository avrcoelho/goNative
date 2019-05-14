// actions types -inicio
export const Types = {
  LOAD_REQUEST: 'LOAD_REPOSITORIES_REQUEST',
  LOAD_SUCCESS: 'LOAD_REPOSITORIES_SUCCESS',
  LOAD_FAILURE: 'LOAD_REPOSITORIES_FAILURE',
};
// actions types -fim

// reducer - inicio

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: false,
};

export default function repositories(state = INITIAL_STATE, action) {
  console.log(action);
  switch (action.type) {
    case Types.LOAD_REQUEST:
      return { ...state, loading: true };
    case Types.LOAD_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        error: false,
        loading: false,
      };
    case Types.LOAD_FAILURE:
      return { ...state, error: false, loading: false };
    default:
      return state;
  }
}
// reducer - fim

// action creator - inicio
export const Creators = {
  loadRepositoriesRequest: () => ({
    type: Types.LOAD_REQUEST,
  }),

  loadRepositoriesSuccess: data => ({
    type: Types.LOAD_SUCCESS,
    payload: {
      data,
    },
  }),

  loadRepositoriesFailure: () => ({
    type: Types.LOAD_FAILURE,
  }),
};
// action creator - fim
