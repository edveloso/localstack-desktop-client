"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface BucketObject {
  Key: string;
  Size: number;
  LastModified?: string;
}

const BucketDetailPage = () => {
  const params = useParams();
  const bucketName = decodeURIComponent(params.bucketName as string);
  const [objects, setObjects] = useState<BucketObject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const res = await fetch(`/api/buckets/${bucketName}`);
        const data = await res.json();
        setObjects(data.objects || []);
      } catch (err) {
        console.error("Erro ao buscar objetos do bucket:", err);
        setObjects([]);
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
      ) : objects.length === 0 ? (
        <p className="italic text-zinc-500">Nenhum objeto encontrado.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {objects.map((obj, idx) => (
            <li
              key={idx}
              className="bg-zinc-100 dark:bg-zinc-700 p-2 rounded-md"
            >
              <p className="font-mono">{obj.Key}</p>
              <p className="text-xs text-zinc-500">Tamanho: {obj.Size} bytes</p>
              {obj.LastModified && (
                <p className="text-xs text-zinc-500">
                  Modificado em: {new Date(obj.LastModified).toLocaleString()}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BucketDetailPage;
