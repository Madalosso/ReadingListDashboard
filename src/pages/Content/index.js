import { printLine } from "./modules/print";
import { showNotification } from "./Notification";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "show-tooltip") {
    // send request message content (url, title) to the background script and ultimately to the
    // toast component
    showNotification();
  }
});
