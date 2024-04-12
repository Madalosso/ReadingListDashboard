import React from "react";

function Card(props) {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      {props.title && (
        <div className="px-4 py-5 sm:px-6 text-black text-base">
          {props.title}
          {/* We use less vertical padding on card headers on desktop than on body sections */}
        </div>
      )}
      <div className="px-4 py-5 sm:p-6">{props.children}</div>
    </div>
  );
}
export default Card;
