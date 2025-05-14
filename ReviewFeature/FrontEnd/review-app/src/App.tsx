import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/HomePage'
import TabPage from './features/reviewFeature/pages/TabPage'
import DetailPage from './features/reviewFeature/pages/DetailPage'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tabs" element={<TabPage />} />
          <Route path="/detail/:type/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </Router>
  )
}
