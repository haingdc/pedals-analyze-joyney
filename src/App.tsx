import { ConfigProvider } from "@components/App/Config/index.tsx"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Analysis from "./pages/Analysis/index.tsx"
import Posts from "./pages/Posts/index.tsx"

function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Analysis />} />
          <Route path='/blog' element={<Posts />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
