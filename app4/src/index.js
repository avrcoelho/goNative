import '~/config/ReactotronConfig';

import React from 'react';
// provider é API de contexto para enviar para todos os componentes filhos as informações dos estados
import { Provider } from 'react-redux';

import store from './store';

import Routes from './routes';
import { setNavigator } from './services/navigation';
// import { Container } from './styles';

const App = () => (
  <Provider store={store}>
    <Routes ref={setNavigator} />
  </Provider>
);

export default App;
