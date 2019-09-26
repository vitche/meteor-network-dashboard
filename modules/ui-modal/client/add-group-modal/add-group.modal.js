import { Template } from "meteor/templating";

import './add-group.modal.html';

Template.addGroupModal.inheritsHelpersFrom('baseModal');
Template.addGroupModal.inheritsEventsFrom('baseModal');
Template.addGroupModal.inheritsHooksFrom('baseModal');

Template.addGroupModal.onCreated(function () {
	console.log(this.data)
});