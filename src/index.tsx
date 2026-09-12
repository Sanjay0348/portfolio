import "@fontsource/instrument-sans/latin-400.css";
import "@fontsource/instrument-sans/latin-500.css";
import "@fontsource/instrument-sans/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PostHogProvider } from "posthog-js/react";

const analyticsKey = import.meta.env.VITE_APP_PUBLIC_POSTHOG_KEY;
const app = analyticsKey ? (
  <PostHogProvider
    apiKey={analyticsKey}
    options={{ api_host: import.meta.env.VITE_APP_PUBLIC_POSTHOG_HOST }}
  >
    <App />
  </PostHogProvider>
) : (
  <App />
);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(app);
