console.log("This is the background page.");
console.log("Put the background scripts here.");

chrome.commands.onCommand.addListener(async (command) => {
  console.log(command);

  if (command === "toggle-reading-list") {
    console.log(command);
    return;
  }

  if (command === "add-or-toggle-reading-list") {
    console.log("adding to read list");
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      console.log("Active tab", tabs[0]);
      console.log(`Tab title: ${tabs[0].title} and url: ${tabs[0].url}`);
      const { url, title } = tabs[0];

      const items = await chrome.readingList.query({ url });
      console.log("items", items);

      // try {
      //   chrome.readingList.addEntry({
      //     title,
      //     url,
      //     hasBeenRead: false,
      //   });
      // } catch (err) {
      //   console.debug(err);
      //   console.log(err);
      //   if (err == "Duplicate URL") {
      //     chrome.readingList.updateEntry({ url: tabs[0].url, hasBeenRead: true });
      //   }
      // }
      console.log("added to reading list");
    });
  }
});

// READ LATER
// READ
// FAVORITE - STASH
