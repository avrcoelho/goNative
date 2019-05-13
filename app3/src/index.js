import '~/config/ReactotronConfig';

import React from 'react';
// provider é API de contexto para enviar para todos os componentes filhos as informações dos estados
import { Provider } from 'react-redux';

import store from './store';
import TodoList from './todoList';

// import { Container } from './styles';

const App = () => (
  <Provider store={store}>
    <TodoList />
  </Provider>
);

export default App;
