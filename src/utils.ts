export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export const getFaviconUrl = (fullUrl: string) => {
  try {
    const url = new URL(fullUrl);
    return `${url.protocol}//${url.hostname}/favicon.ico`;
  } catch (error) {
    console.error("Invalid URL", fullUrl);
    return "default_icon_url"; // Return a default icon URL if the provided URL is invalid
  }
};
