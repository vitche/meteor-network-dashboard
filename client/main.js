import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// configuration - routes
import '../startup/client';
import '../startup/both';

// components
import '../modules/layout/layout';
import '../modules/authentication/client/layout';
import '../modules/authentication/client/authentication-page'

// templates
import './main.html';