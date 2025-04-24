// src/lib/aws/config.ts
export const localstackConfig = {
    region: "us-east-1",
    credentials: {
      accessKeyId: "test",
      secretAccessKey: "test",
    },
    endpoint: "http://localhost:4566", // Endpoint padrão do LocalStack
    // endpoint: "http://localhost:3000/localstack", // Usando o proxy do Next.js

  };
  