"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getS3Client } from "@/lib/aws/config";
import { ListObjectsCommand } from "@aws-sdk/client-s3";

const BucketDetailPage = () => {
  const params = useParams();
  const bucketName = decodeURIComponent(params.bucketName as string);
  const [objects, setObjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const client = getS3Client();

        // Ajuste para usar MaxKeys para limitar a quantidade de objetos
        const data = await client.send(
          new ListObjectsCommand({
            Bucket: bucketName,
            MaxKeys: 2, // Ajuste para retornar até 1000 objetos
          })
        );

        // Log para ver a resposta completa
        console.log("Resposta completa do ListObjectsCommand:", data);

        // Verificar a estrutura de dados
        if (data && data.Contents) {
          console.log("Objetos encontrados:", data.Contents.length);
          if (data.Contents.length > 0) {
            setObjects(data.Contents.map((obj) => obj.Key || ""));
          } else {
            console.log("Nenhum objeto encontrado no bucket.");
            setObjects([]);
          }
        } else {
          console.log("A resposta não contém 'Contents' ou 'Contents' está vazio.");
          setObjects([]);
        }
      } catch (err) {
        console.error("Erro ao listar objetos do bucket:", err);
        setError("Erro ao carregar objetos.");
      } finally {
        setLoading(false);
      }
    };

    fetchObjects();
  }, [bucketName]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Objetos no Bucket: {bucketName}</h1>
      {loading ? (
        <p>Carregando objetos...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : objects.length === 0 ? (
        <p className="italic text-zinc-500">Nenhum objeto encontrado.</p>
      ) : (
        <ul className="list-disc list-inside space-y-1">
          {objects.map((key) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BucketDetailPage;
