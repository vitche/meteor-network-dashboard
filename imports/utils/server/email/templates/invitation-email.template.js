Accounts.emailTemplates.enrollAccount = {
	subject() {
		return 'Welcome to SoftEthic Platform';
	},
	html(user, url) {
		return `<h3>Hey! You have been invited to SoftEthic Platform.</h3> 
		<p>Please, click on this link to continue registration process: ${ url }</p>`;
	}
};