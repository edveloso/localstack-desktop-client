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

type Params = Promise<{ bucketName: string }>;

export async function GET(
  req: NextRequest,
  context : { params:  Params  }
) {
  // const { bucketName } = await params;
  const queryParam =  context.params;
  const { bucketName } = await queryParam;

  try {
    const command = new ListObjectsV2Command({ Bucket: bucketName });
    const data = await s3.send(command);
    return Response.json({ objects: data.Contents || [] });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao acessar bucket", details: String(error) }),
      { status: 500 }
    );
  }
}
