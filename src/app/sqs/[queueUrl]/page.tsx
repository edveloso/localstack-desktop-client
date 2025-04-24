"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function QueueDetails() {
  const { queueUrl } = useParams(); // Next 13/14
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const decodedQueueUrl = decodeURIComponent(queueUrl as string);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await fetch(`/sqs/receive?queueUrl=${encodeURIComponent(decodedQueueUrl)}`);

        if (!res.ok) throw new Error("Erro ao buscar mensagem");

        const data = await res.json();

        if (data && data.Body) {
          setMessage(data.Body);
        }
      } catch (err: any) {
        console.error("Erro ao buscar mensagem:", err);
        setError("Erro ao buscar mensagem");
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [decodedQueueUrl]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detalhe da Fila</h1>
      <p className="mb-2 text-gray-600"><strong>URL:</strong> {decodedQueueUrl}</p>

      {loading && <p>Carregando mensagem...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && message === null && <p>Nenhuma mensagem disponível.</p>}
      {!loading && message && (
        <pre className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap break-words">
          {message}
        </pre>
      )}
    </div>
  );
}
