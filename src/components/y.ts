import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

// Create the shared doc
export const doc = new Y.Doc();

// Create a websocket provider
export const provider = new WebsocketProvider(
  "wss://localhost:3000",
  "y-presence-react-live-cursors",
  doc
);

// Export the provider's awareness API
export const awareness = provider.awareness;