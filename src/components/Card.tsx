import React from "react";

interface CardProps {
  title: string;
  items: string[];
  emptyMessage?: string;
  customContent?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, items, emptyMessage, customContent }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out break-words overflow-wrap break-word">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        {title}
      </h2>
      {customContent ? (
        <div className="whitespace-pre-wrap break-words text-sm text-gray-700 dark:text-gray-300">
          {customContent}
        </div>
      ) : (
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300 break-words">
          {items.length > 0 ? (
            items.map((item, idx) => (
              <li key={idx} className="whitespace-pre-wrap break-words">
                {item}
              </li>
            ))
          ) : (
            <li className="italic text-gray-400">{emptyMessage || "Nenhum item encontrado."}</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Card;
