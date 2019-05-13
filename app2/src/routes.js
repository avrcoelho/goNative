import { createAppContainer, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import Welcome from '~/pages/Welcome';
import Repositories from '~/pages/Repositories';
import Organizations from '~/pages/Organizations';

import { colors} from '~/styles'
// createAooContainer: não da funcionalidade de rota, mas da o container da rotas da aplicação
// sempre que for trabalhar com rota precisa do createAooContainer
const Routes = (userLogged = false) => createAppContainer(
  createSwitchNavigator({
    Welcome,
    // pode criar rota dentro de rora
    User: createBottomTabNavigator({
      Repositories,
      Organizations,
    },
    {
      // ocnfiguração do menu de rota
      tabBarOptions: {
        showIcon: true,
        // desabilita o texto
        showLabel: false,
        activeTintColor: colors.white,
        inactiveTintColor: colors.whiteTransparent,
        style: {
          backgroundColor: colors.secundary,
        }
      }
    }),
  }, {
    // rota inciial do app
    // se userLogged for true chama Repositories senão chama welcome
    initialRouteName: userLogged ? 'User' : 'Welcome',
  }),
);

export default Routes;
