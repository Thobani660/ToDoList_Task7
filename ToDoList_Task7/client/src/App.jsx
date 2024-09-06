import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import TodoList from "./pages/todolist";
import Register from './pages/register';
import Footer from "./components/Footer";
import SignUp from "./pages/signUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="todolist" element={<TodoList />} />
          <Route path="register" element={<Register />} />
          <Route path="signUp" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  // <SignUp></SignUp>
  );
}

export default App;