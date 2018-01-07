import coreLayoutComponent from '../core/layout.component/layout.container';
import loginComponent from './login';
import dashboardComponent from './dashboard';
import tournamentsComponent from './tournaments';
import tournamentDetailsComponent from './tournament-details';
import registrationComponent from './registration';
import profileComponent from './profile';

export const createRoutes = (store) => ({
  path: '/',
  component: coreLayoutComponent,
  indexRoute: loginComponent,
  childRoutes: [
    dashboardComponent,
    tournamentsComponent(store),
    tournamentDetailsComponent(store),
    registrationComponent(store),
    profileComponent(store)
  ]
});

export default createRoutes;
