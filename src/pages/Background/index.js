// READ LATER
// READ
// FAVORITE - STASH

// Maybe another set of cmds
// 1 Add/remove from list
// 2 advance reading status (unread -> read -> favorite)

chrome.commands.onCommand.addListener(async (command) => {
  console.log(command);

  if (command === "toggle-reading-list") {
    console.log(command);
    return;
  }

  if (command === "add-or-toggle-reading-list") {
    console.log("adding to read list");
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const { url, title } = tabs[0];

      const items = await chrome.readingList.query({ url });
      if (items.length > 0) {
        // should probably be 1
        // TODO: Check how query parameters interfere here.
        // ex: https://developer.chrome.com/docs/extensions/reference/api/readingList
        // and https://developer.chrome.com/docs/extensions/reference/api/readingList#mark-item-read
        // We should probably ignore the query params

        const item = items[0];
        if (item.hasBeenRead) {
          // chrome.readingList.removeEntry({ url });
          // TODO: Add to bookmarks folder (extension)
          return;
        }
        chrome.readingList.updateEntry({ url, hasBeenRead: true });
        // console.log("Read");
        return;
      }

      chrome.readingList.addEntry({
        title,
        url,
        hasBeenRead: false,
      });
      // console.log("Read later");
    });
  }
});
