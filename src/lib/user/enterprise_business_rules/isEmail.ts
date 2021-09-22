
export default async function isEmail(email:string,) {
	const patronEmail = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
	if (patronEmail.test(email,)=== false){
		return "The email address is incorrect.";
	}
	return true;
}
