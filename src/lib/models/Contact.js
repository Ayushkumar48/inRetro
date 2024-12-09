import dynamoose from 'dynamoose';

const contactSchema = new dynamoose.Schema({
	dt: {
		type: String,
		hashKey: true
	},
	name: String,
	email: String,
	message: String
});

const Contact = dynamoose.model('contact', contactSchema);
export default Contact;
