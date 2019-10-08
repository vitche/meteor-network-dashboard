import { Template } from 'meteor/templating';

import './authentication-page.html';

Template['override-atPwdFormBtn'].replaces('atPwdFormBtn');
Template['override-atTitle'].replaces('atTitle');
Template['override-atTextInput'].replaces('atTextInput');
Template['override-atError'].replaces('atError');