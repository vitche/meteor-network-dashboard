import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// configuration - routes
import '../config/routers/auth.routes';
import '../config/routers/dashboard.routes';
import '../config/routers/peers.routes';

// components
import '../modules/layout/layout';
import '../modules/authentication/client/login';

// templates
import './main.html';