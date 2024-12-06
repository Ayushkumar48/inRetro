import dynamoose from 'dynamoose';
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION } from '$env/static/private';

let isConnected = false;

export default async function connectDB() {
	if (!isConnected) {
		try {
			const ddb = new dynamoose.aws.ddb.DynamoDB({
				credentials: {
					accessKeyId: ACCESS_KEY_ID,
					secretAccessKey: SECRET_ACCESS_KEY
				},
				region: REGION
			});
			dynamoose.aws.ddb.set(ddb);
			isConnected = true;
			console.log('Connected to DynamoDB successfully.');
		} catch (error) {
			console.error('Error connecting to DynamoDB:', error);
			throw error;
		}
	}
}
