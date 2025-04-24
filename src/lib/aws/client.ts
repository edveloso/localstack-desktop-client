// src/lib/aws/config.ts

const isRunningInDocker = process.env.DOCKER === "true";

// Define endpoint de acordo com ambiente
const endpoint = isRunningInDocker
  ? "http://host.docker.internal:4566" // Docker acessando o host local
  : "http://localhost:4566";           // Desenvolvimento local

export const localstackConfig = {
  region: "us-east-1",
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test",
  },
  endpoint,
};
