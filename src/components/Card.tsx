import React from "react";

interface CardProps {
  title: string;
  items: string[];
  emptyMessage?: string;
  customContent?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, items, emptyMessage, customContent }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-300">
      <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4 border-b border-zinc-200 dark:border-zinc-700 pb-2">
        {title}
      </h2>
      {customContent ? (
        <div>{customContent}</div>
      ) : (
        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 text-sm">
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
