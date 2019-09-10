import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// configuration - routes
import '../modules/authentication/useraccounts-configuration';
import '../config/routers/dashboard.routes';
import '../config/routers/peers.routes';

// components
import '../modules/layout/layout';
import '../modules/authentication/client/layout';
import '../modules/authentication/client/authentication-page'

// templates
import './main.html';