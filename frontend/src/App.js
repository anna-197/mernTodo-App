import "./App.scss";
import { ShowTodos } from "./components/ShowTodos";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateTodos } from "./components/CreateTodos";
import Header from "./components/Header";
import Login from "./pages/Login";
import UserTodos from "./pages/UserTodos";

function App() {
  return (
    <>
      <div className="app-contents">
        <Header/>
          <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<ShowTodos/>} />
            <Route path="/get-user-todos/:id" element={<UserTodos/>} />
            <Route path="/create-todo" element={<CreateTodos/>} />
          </Routes>
      </div>
    </>
  );
}

export default App;
