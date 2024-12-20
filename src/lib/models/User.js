import dynamoose from 'dynamoose';

const levelSchema = new dynamoose.Schema({
	levelId: Number,
	path: String,
	language: String,
	topic: String,
	status: Boolean,
	color: String,
	html: String,
	css: String,
	js: String,
	tasks: {
		type: Array,
		schema: [String]
	}
});

const userSchema = new dynamoose.Schema({
	username: {
		type: String,
		hashKey: true
	},
	name: String,
	email: String,
	password: String,
	levels: {
		type: Array,
		schema: [levelSchema]
	}
});

const User = dynamoose.model('user', userSchema);
export default User;
