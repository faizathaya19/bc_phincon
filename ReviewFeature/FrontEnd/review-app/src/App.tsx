import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/HomePage'
import TabPage from './pages/TabPage'
import CourseDetailPage from './pages/CourseDetailPage'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tabs" element={<TabPage />} />
          <Route path="/detail/:type/:id" element={<CourseDetailPage />} />
        </Route>
      </Routes>
    </Router>
  )
}
