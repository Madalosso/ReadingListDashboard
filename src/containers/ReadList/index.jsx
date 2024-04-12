import React, { useMemo } from "react";
import useReadingList from "../../hooks/useReads";

const getFaviconUrl = (fullUrl) => {
  try {
    const url = new URL(fullUrl);
    return `${url.protocol}//${url.hostname}/favicon.ico`;
  } catch (error) {
    console.error("Invalid URL", fullUrl);
    return "default_icon_url"; // Return a default icon URL if the provided URL is invalid
  }
};

export default function ReadList(props) {
  const items = props.items.map((item) => {
    const daysAgo = Math.floor((Date.now() - item.creationTime) / (1000 * 60 * 60 * 24));
    return {
      title: item.title,
      icon: item.icon,
      daysAgo,
    };
  });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
        >
          <div className="flex justify-between">
            {/* First row: icon and title */}
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 focus:outline-none"
            >
              <img
                className="h-6 w-6"
                src={getFaviconUrl(item.url)} // Use the getFaviconUrl function to get the correct favicon URL
                alt={`${item.title} icon`}
              />
              <p className="text-sm font-medium text-gray-900">{item.title}</p>
            </a>
            {/* Note/tag for time since item was added */}
            <div className="ml-4 flex-shrink-0 self-start inline-block rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-800">
              {item.daysAgo} days old
            </div>
          </div>

          {/* Second row: buttons */}
          <div className="flex justify-end mt-2">
            <button className="mr-2 inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-1 text-sm font-medium leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Confirm
            </button>
            <button className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-1 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
  // return (
  //   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  //     {props.items.map((person) => (
  //       <div
  //         key={person.url}
  //         className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
  //       >
  //         <div className="flex-shrink-0">
  //           <img
  //             className="h-10 w-10 rounded-full"
  //             src={
  //               "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
  //             }
  //             alt=""
  //           />
  //         </div>
  //         <div className="min-w-0 flex-1">
  //           <a href="#" className="focus:outline-none">
  //             <span className="absolute inset-0" aria-hidden="true" />
  //             <p className="text-sm font-medium text-gray-900">{person.title}</p>
  //             {/* <p className="truncate text-sm text-gray-500">{person.role}</p> */}
  //           </a>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );
}
