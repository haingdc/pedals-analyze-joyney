import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Blog from "./pages/blog/Blog.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
