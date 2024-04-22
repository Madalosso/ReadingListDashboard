import React, { useEffect, Fragment, useState } from "react";
import icon from "../../assets/img/icon-128.png";

// import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";

const Popup = () => {
  useEffect(() => {
    console.log("Popup component mounted");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log("Active tab", tabs[0]);
      console.log(`Tab title: ${tabs[0].title} and url: ${tabs[0].url}`);
      chrome.readingList.addEntry({
        title: tabs[0].title,
        url: tabs[0].url,
        hasBeenRead: false,
      });
    });
    return () => {
      console.log("Popup component unmounted");
    };
  }, []);

  return (
    <div>
      <header>
        <div className="max-w-sm bg-slate-300 rounded max-h-52 flex flex-row text-black">
          <CardComponent />

          {/* <p>Page added to the reading list</p> */}
          {/* <img src={icon} alt="extension icon" /> */}
        </div>
      </header>
    </div>
  );
};

export default Popup;

function CardComponent() {
  const [show, setShow] = useState(true);

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          {/* <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          > */}
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">Successfully saved!</p>
                  <p className="mt-1 text-sm text-gray-500">Anyone with a link can now view this file.</p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => {
                      setShow(false);
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* </Transition> */}
        </div>
      </div>
    </>
  );
}
