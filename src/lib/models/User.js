import dynamoose from 'dynamoose';

const userSchema = new dynamoose.Schema({
	username: {
		type: String,
		hashKey: true
	},
	name: String,
	email: String,
	password: String
});

const User = dynamoose.model('user', userSchema);
export default User;
