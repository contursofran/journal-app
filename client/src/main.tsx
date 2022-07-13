import ReactDOM from "react-dom/client";
import "../firebase";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
