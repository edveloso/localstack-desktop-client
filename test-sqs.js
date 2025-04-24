import { SQSClient, ListQueuesCommand } from "@aws-sdk/client-sqs";

const client = new SQSClient({
  region: "us-east-1",
  endpoint: "http://localhost:4566",
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test",
  },
});

(async () => {
  const result = await client.send(new ListQueuesCommand({}));
  console.log(result);
})();
