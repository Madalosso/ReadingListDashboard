import React, { useEffect } from "react";
import logo from "../../assets/img/logo.svg";
import Greetings from "../../containers/Greetings/Greetings";
import "./Popup.css";

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/Popup/Popup.jsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React!
        </a>
        <h6 className="text-red-500">The color of this paragraph is defined using Tailwind.</h6>
        <Greetings />
      </header>
    </div>
  );
};

export default Popup;
