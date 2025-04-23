import React from "react";

interface CardProps {
  title: string;
  items: string[];
  emptyMessage?: string;
  customContent?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, items, emptyMessage, customContent }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-md transition hover:shadow-lg">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {customContent ? (
        <div>{customContent}</div>
      ) : (
        <ul className="list-disc list-inside space-y-1 text-sm">
          {items.length > 0 ? (
            items.map((item, idx) => <li key={idx}>{item}</li>)
          ) : (
            <li className="italic text-zinc-500">{emptyMessage || "Nenhum item encontrado."}</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Card;
