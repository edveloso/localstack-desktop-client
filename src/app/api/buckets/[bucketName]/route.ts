// src/app/api/buckets/[bucketName]/route.ts
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";

const s3 = new S3Client({
  region: "us-east-1",
  endpoint: "http://localhost:4566",
  forcePathStyle: true,
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test",
  },
});

export async function GET(
  req: NextRequest,
  { params }: { params: { bucketName: string } }
) {
  const bucketName = decodeURIComponent(params.bucketName);

  try {
    const command = new ListObjectsV2Command({ Bucket: bucketName });
    const data = await s3.send(command);
    return Response.json({ objects: data.Contents || [] });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao acessar bucket", details: error }),
      { status: 500 }
    );
  }
}
