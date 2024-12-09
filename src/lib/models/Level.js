import dynamoose from 'dynamoose';

const levelSchema = new dynamoose.Schema({
	levelId: {
		type: Number,
		hashKey: true
	},
	path: String,
	language: String,
	topic: String,
	color: String,
	html: String,
	css: String,
	js: String,
	tasks: {
		type: Array,
		schema: [String]
	}
});

const Level = dynamoose.model('level', levelSchema);
export default Level;
