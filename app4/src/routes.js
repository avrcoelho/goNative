import { createAppContainer, createStackNavigation } from 'react-navigation';

import Login from '~/pages/Login';
import Repositories from '~/pages/Repositories';

const Routes = createAppContainer(
  createStackNavigation({
    Login,
    Repositories,
  }),
);

export default Routes;
