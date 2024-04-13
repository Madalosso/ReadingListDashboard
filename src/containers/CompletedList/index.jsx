import React, { useState } from "react";
import { GlobeAltIcon, TrashIcon, ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import { getFaviconUrl } from "../../utils";

export default function CompletedList(props) {
  const items = props.items.map((item) => {
    const daysAgo = Math.floor((Date.now() - item.creationTime) / (1000 * 60 * 60 * 24));
    return {
      ...item,
      daysAgo,
    };
  });
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {items.map((item, index) => (
        <ReadItem key={index} item={item} />
      ))}
    </div>
  );
}

const ReadItem = ({ item }) => {
  const [imageError, setImageError] = useState(false);

  const removeItem = (url) => chrome.readingList.removeEntry({ url });
  const tagRead = (url) => chrome.readingList.updateEntry({ url, hasBeenRead: false });

  return (
    <div className="relative rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm hover:border-gray-400 flex items-center justify-between">
      {/* Icon and title */}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-3 focus:outline-none"
      >
        {imageError ? (
          <GlobeAltIcon className="text-black h-4 w-4 flex-shrink-0" />
        ) : (
          <img
            className="h-4 w-4"
            src={getFaviconUrl(item.url)}
            alt={`${item.title} icon`}
            onError={() => setImageError(true)}
          />
        )}
        <p className="text-sm font-medium text-gray-900">{item.title}</p>
      </a>

      {/* Buttons */}
      <div className="flex space-x-2">
        <button
          className="inline-flex items-center rounded-full border border-transparent bg-orange-600 p-1 text-sm font-medium leading-4 text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          onClick={(e) => tagRead(item.url)}
        >
          <ArrowUturnLeftIcon className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => removeItem(item.url)}
          className="inline-flex items-center rounded-full border border-transparent bg-gray-500 p-1 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
