import {currentRoute} from './model';
import {ErrorPage} from './ui';

export const ErrorRoute = {
  view: ErrorPage,
  route: currentRoute,
};
