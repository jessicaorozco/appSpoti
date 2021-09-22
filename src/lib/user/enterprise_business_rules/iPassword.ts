
async function isPassword(password:string,) {
	const patronPassword = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{6,10}$/;
	if (patronPassword.test(password,)=== false){
		return "Please enter a password containing at least 10 characters, a lowercase letter, a capital letter and one of the following characters:!, @, # ,? or].";
	}
	return true;
}

export default isPassword;