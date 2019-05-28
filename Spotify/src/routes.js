import { createAppContainer, createStackNavigator } from 'react-navigation';

import Main from '~/pages/Main';
import Podcast from '~/pages/Podcast';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      Podcast,
    },
    {
      // configuração
      defaultNavigationOptions: {
        // não renderizar o cabeçalho padrão do react-navigation
        header: null,
      },
    },
  ),
);

export default Routes;
