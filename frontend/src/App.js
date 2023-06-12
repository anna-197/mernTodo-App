import "./App.scss";
import { ShowTodos } from "./components/ShowTodos";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateTodos } from "./components/CreateTodos";

function App() {
  return (
    <>
      <div className="app-contents">
        
          <Routes>
            <Route path="/" element={<ShowTodos/>} />
            <Route path="/create-todo" element={<CreateTodos/>} />
          </Routes>
      </div>
    </>
  );
}

export default App;
