import { printLine } from "./modules/print";
import { showNotification } from "./Notification";

console.log("Content script works!");
console.log("Must reload extension for modifications to take effect.");

printLine("Using the 'printLine' function from the Print Module");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "show-tooltip") {
    console.log("Content captured");
    // send request message content (url, title) to the background script and ultimately to the
    // toast component
    showNotification();
  }
});
