"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCloudWatchClient } from "@/lib/aws/config";
import {
  DescribeLogStreamsCommand,
  GetLogEventsCommand,
} from "@aws-sdk/client-cloudwatch-logs";

interface LogEvent {
  message: string;
  timestamp: number;
}

const LogGroupDetailPage = () => {
  const params = useParams();
  const logGroupName = decodeURIComponent(params.logGroupName as string);
  const [events, setEvents] = useState<LogEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogEvents = async () => {
      try {
        const client = getCloudWatchClient();
        const streamsData = await client.send(
          new DescribeLogStreamsCommand({
            logGroupName,
            orderBy: "LastEventTime",
            descending: true,
            limit: 1,
          })
        );

        const latestStream = streamsData.logStreams?.[0];
        if (!latestStream) {
          setEvents([]);
          setLoading(false);
          return;
        }

        const eventsData = await client.send(
          new GetLogEventsCommand({
            logGroupName,
            logStreamName: latestStream.logStreamName!,
            startFromHead: true,
          })
        );

        const logEvents: LogEvent[] =
          eventsData.events?.map((e) => ({
            message: e.message || "Sem mensagem",
            timestamp: e.timestamp || 0,
          })) || [];

        setEvents(logEvents);
      } catch (err) {
        console.error("Erro ao buscar eventos de log:", err);
        setEvents([{ message: "Erro ao carregar eventos.", timestamp: 0 }]);
      } finally {
        setLoading(false);
      }
    };

    fetchLogEvents();
  }, [logGroupName]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Log Events: {logGroupName}</h1>
      {loading ? (
        <p>Carregando eventos...</p>
      ) : events.length === 0 ? (
        <p className="italic text-zinc-500">Nenhum evento encontrado.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {events.map((event, idx) => (
            <li
              key={idx}
              className="bg-zinc-100 dark:bg-zinc-700 p-2 rounded-md"
            >
              <p className="text-xs text-zinc-500 mb-1">{formatDate(event.timestamp)}</p>
              <p>{event.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LogGroupDetailPage;
