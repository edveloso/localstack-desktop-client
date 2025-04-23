"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getS3Client } from "@/lib/aws/config";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

const BucketDetailPage = () => {
  const params = useParams();
  const bucketName = decodeURIComponent(params.bucketName as string);
  const [objects, setObjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const client = getS3Client();
        const data = await client.send(
          new ListObjectsV2Command({ Bucket: bucketName })
        );
        setObjects(data.Contents?.map((obj) => obj.Key!) || []);
      } catch (error) {
        console.error("Erro ao listar objetos:", error);
        setObjects(["Erro ao carregar objetos."]);
      } finally {
        setLoading(false);
      }
    };

    fetchObjects();
  }, [bucketName]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Objetos no bucket: {bucketName}</h1>
      {loading ? (
        <p>Carregando objetos...</p>
      ) : objects.length === 0 ? (
        <p className="italic text-zinc-500">Nenhum objeto encontrado.</p>
      ) : (
        <ul className="list-disc list-inside space-y-1 text-sm">
          {objects.map((obj, idx) => (
            <li key={idx}>{obj}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BucketDetailPage;
