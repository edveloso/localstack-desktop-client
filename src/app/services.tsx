"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import {
  getS3Client,
  getDynamoDBClient,
  getLambdaClient,
  getCloudWatchClient,
  getSQSClient,
} from "@/lib/aws/config";
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import { ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { ListFunctionsCommand } from "@aws-sdk/client-lambda";
import { DescribeLogGroupsCommand } from "@aws-sdk/client-cloudwatch-logs";
import { ListQueuesCommand } from "@aws-sdk/client-sqs";

const Services = () => {
  const [services, setServices] = useState<{
    s3: string[];
    dynamodb: string[];
    lambda: string[];
    logs: string[];
    sqs: string[];
  }>({
    s3: [],
    dynamodb: [],
    lambda: [],
    logs: [],
    sqs: [],
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
        const logGroups = logsData.logGroups?.map((lg) => lg.logGroupName!) || [];

        setServices((prev) => ({
          ...prev,
          logs: logGroups,
        }));
      } catch (error) {
        console.error("Erro ao listar grupos de log:", error);
      }

      try {
        const res = await fetch("/api/queues");
        if (!res.ok) throw new Error("Erro ao buscar filas");
        const data = await res.json();
        const queueUrls = data.queues;


        setServices((prev) => ({
          ...prev,
          sqs: queueUrls,
        }));
      } catch (error) {
        console.error("Erro ao listar filas SQS:", error);
      }
    };

    fetchServices();
  }, []);

  const renderLogGroupLinks = (logs: string[]) => {
    return (
      <ul className="list-disc list-inside space-y-2">
        {logs.map((logGroup) => (
          <li key={logGroup}>
            <Link href={`/logs/${encodeURIComponent(logGroup)}`} className="text-blue-600 hover:underline">
              {logGroup}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  const renderBucketLinks = (buckets: string[]) => {
    return (
      <ul className="list-disc list-inside space-y-2">
        {buckets.map((bucket) => (
          <li key={bucket}>
            <Link href={`/buckets/${encodeURIComponent(bucket)}`} className="text-blue-600 hover:underline">
              {bucket}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  const renderQueueLinks = (queues: string[]) => {
    return (
      <ul className="list-disc list-inside space-y-2">
        {queues.map((queueUrl) => (
          <li key={queueUrl}>
            <Link href={`/sqs/${encodeURIComponent(queueUrl)}`} className="text-blue-600 hover:underline">
              {queueUrl}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Serviços</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Card
          title="S3 Buckets"
          items={[]}
          customContent={services.s3.length > 0 ? renderBucketLinks(services.s3) : null}
          emptyMessage="Nenhum bucket encontrado."
        />
        <Card title="DynamoDB Tables" items={services.dynamodb} emptyMessage="Nenhuma tabela encontrada." />
        <Card title="Lambda Functions" items={services.lambda} emptyMessage="Nenhuma função encontrada." />
        <Card
          title="CloudWatch Log Groups"
          items={[]}
          customContent={services.logs.length > 0 ? renderLogGroupLinks(services.logs) : null}
          emptyMessage="Nenhum grupo de log encontrado."
        />
        <Card
          title="SQS Queues"
          items={[]}
          customContent={services.sqs.length > 0 ? renderQueueLinks(services.sqs) : null}
          emptyMessage="Nenhuma fila encontrada."
        />
      </div>
    </div>
  );
};

export default Services;
