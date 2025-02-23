import { BlobServiceClient } from '@azure/storage-blob';
import { AZURE_STORAGE_CONNECTION_STRING } from '$env/static/private';

const blobServiceClient = BlobServiceClient.fromConnectionString(
	AZURE_STORAGE_CONNECTION_STRING as string
);

const containerClient = blobServiceClient.getContainerClient('user-images');

export default containerClient;
