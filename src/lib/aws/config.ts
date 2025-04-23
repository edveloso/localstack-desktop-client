// src/lib/aws/clients.ts

import { S3Client } from "@aws-sdk/client-s3";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { LambdaClient } from "@aws-sdk/client-lambda";
import { localstackConfig } from "./client";
import { CloudWatchLogsClient } from "@aws-sdk/client-cloudwatch-logs";


export const getS3Client = () => new S3Client(localstackConfig);
export const getDynamoDBClient = () => new DynamoDBClient(localstackConfig);
export const getLambdaClient = () => new LambdaClient(localstackConfig);
export const getCloudWatchClient = () => new CloudWatchLogsClient(localstackConfig);

