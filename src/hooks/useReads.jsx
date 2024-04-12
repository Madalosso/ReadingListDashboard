import react, { useState } from "react";
import { useEffect } from "react";

export default function useReadingList() {
  const [readingList, setReadingList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReadingList = async () => {
    setLoading(true);
    const items = await chrome.readingList.query({});
    setReadingList(items);
    setLoading(false);
  };

  useEffect(() => {
    // Fetch the reading list when the component first renders
    fetchReadingList();

    // Define the event handlers
    const handleEntryAdded = () => fetchReadingList();
    const handleEntryRemoved = () => fetchReadingList();
    const handleEntryChanged = () => fetchReadingList();

    // Add the event listeners
    chrome.readingList.onEntryAdded.addListener(handleEntryAdded);
    chrome.readingList.onEntryRemoved.addListener(handleEntryRemoved);
    chrome.readingList.onEntryUpdated.addListener(handleEntryChanged);

    // Remove the event listeners when the component is unmounted
    return () => {
      chrome.readingList.onEntryAdded.removeListener(handleEntryAdded);
      chrome.readingList.onEntryRemoved.removeListener(handleEntryRemoved);
      chrome.readingList.onEntryUpdated.removeListener(handleEntryChanged);
    };
  }, []);

  return { readingList, loading };
}
