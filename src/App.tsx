import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dinosaur from "./pages/Dinosaur.tsx";
import "./App.css";
import Blog from "./pages/blog/Blog.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/:selectedDinosaur" element={<Dinosaur />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
