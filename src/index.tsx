import "@atlaskit/css-reset"; // Optional: Atlassian CSS reset
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/App.css"; // Global styles

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
