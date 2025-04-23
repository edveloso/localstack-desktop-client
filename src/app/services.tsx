"use client";
import { useState, useEffect } from "react";
import Card from "@/components/Card";
import {
  getS3Client,
  getDynamoDBClient,
  getLambdaClient,
  getCloudWatchClient,
} from "@/lib/aws/config";
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import { ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { ListFunctionsCommand } from "@aws-sdk/client-lambda";
import { DescribeLogGroupsCommand } from "@aws-sdk/client-cloudwatch-logs";

const Services = () => {
  const [services, setServices] = useState<{
    s3: string[];
    dynamodb: string[];
    lambda: string[];
    logs: string[];
  }>({
    s3: [],
    dynamodb: [],
    lambda: [],
    logs: [],
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const s3Client = getS3Client();
        const s3Data = await s3Client.send(new ListBucketsCommand({}));
        setServices((prev) => ({
          ...prev,
          s3: s3Data.Buckets?.map((b) => b.Name!) || [],
        }));
      } catch (error) {
        console.error("Erro ao listar buckets S3:", error);
      }

      try {
        const dynamoClient = getDynamoDBClient();
        const dynamoData = await dynamoClient.send(new ListTablesCommand({}));
        setServices((prev) => ({
          ...prev,
          dynamodb: dynamoData.TableNames || [],
        }));
      } catch (error) {
        console.error("Erro ao listar tabelas DynamoDB:", error);
      }

      try {
        const lambdaClient = getLambdaClient();
        const lambdaData = await lambdaClient.send(new ListFunctionsCommand({}));
        setServices((prev) => ({
          ...prev,
          lambda: lambdaData.Functions?.map((f) => f.FunctionName!) || [],
        }));
      } catch (error) {
        console.error("Erro ao listar funções Lambda:", error);
      }

      try {
        const cwClient = getCloudWatchClient();
        const logsData = await cwClient.send(new DescribeLogGroupsCommand({}));
        setServices((prev) => ({
          ...prev,
          logs: logsData.logGroups?.map((lg) => lg.logGroupName!) || [],
        }));
      } catch (error) {
        console.error("Erro ao listar grupos de log:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Serviços LocalStack</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="S3 Buckets" items={services.s3} emptyMessage="Nenhum bucket encontrado." />
        <Card title="DynamoDB Tables" items={services.dynamodb} emptyMessage="Nenhuma tabela encontrada." />
        <Card title="Lambda Functions" items={services.lambda} emptyMessage="Nenhuma função encontrada." />
        <Card title="CloudWatch Log Groups" items={services.logs} emptyMessage="Nenhum grupo de log encontrado." />
      </div>
    </div>
  );
};

export default Services;
