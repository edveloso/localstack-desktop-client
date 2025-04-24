// src/app/api/sqs/receive/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ReceiveMessageCommand } from "@aws-sdk/client-sqs";
import { getSQSClient } from "@/lib/aws/config";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queueUrl = searchParams.get("queueUrl");

  if (!queueUrl) {
    return NextResponse.json({ error: "Parâmetro 'queueUrl' é obrigatório." }, { status: 400 });
  }

  try {
    const sqsClient = getSQSClient();
    const command = new ReceiveMessageCommand({
      QueueUrl: decodeURIComponent(queueUrl),
      MaxNumberOfMessages: 1,
      WaitTimeSeconds: 1,
    });

    const result = await sqsClient.send(command);
    return NextResponse.json(result.Messages?.[0] || null);
  } catch (err: any) {
    console.error("Erro ao receber mensagem:", err);
    return NextResponse.json({ error: "Erro ao buscar mensagem", detail: err.message }, { status: 500 });
  }
}
