import "./App.css";
import Homepage from "./components/Homepage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer />
      <Homepage />
    </div>
  );
}

export default App;
