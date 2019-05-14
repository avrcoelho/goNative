import { createAppContainer, createStackNavigator } from 'react-navigation';

import Login from '~/pages/Login';
import Repositories from '~/pages/Repositories';

const Routes = createAppContainer(
  createStackNavigator({
    Login,
    Repositories,
  }),
);

export default Routes;
