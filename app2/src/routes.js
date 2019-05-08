import { createAooContainer, createSwitchNavigator } from 'react-navigation';

import Welcome from '~/pages/Welcome';
import Repositories from '~/pages/Repositories';

// createAooContainer: não da funcionalidade de rota, mas da o container da rotas da aplicação
// sempre que for trabalhar com rota precisa do createAooContainer
const Routes = (userLogged = false) => createAooContainer(
  createSwitchNavigator({
    Welcome,
    Repositories,
  }, {
    // rota inciial do app
    // se userLogged for true chama Repositories senão chama welcome
    initialRouteName: userLogged ? 'Repositories' : 'Welcome',
  }),
);

export default Routes;
