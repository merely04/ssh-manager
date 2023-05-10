import {currentRoute} from '~/pages/home/model';
import {HomePage} from '~/pages/home/ui';

export const HomeRoute = {
  view: HomePage,
  route: currentRoute,
};
