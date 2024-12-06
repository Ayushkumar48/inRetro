import dynamoose from 'dynamoose';

const levelSchema = new dynamoose.Schema({
	level: {
		type: Number,
		hashKey: true
	},
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
