import { NextResponse } from "next/server";
import { getSQSClient } from "@/lib/aws/config";
import { ListQueuesCommand } from "@aws-sdk/client-sqs";

export async function GET() {
  try {
    const sqsClient = getSQSClient();
    const data = await sqsClient.send(new ListQueuesCommand({}));
    return NextResponse.json({ queues: data.QueueUrls || [] });
  } catch (error) {
    console.error("Erro na API de filas:", error);
    return NextResponse.json({ error: "Erro ao listar filas" }, { status: 500 });
  }
}
