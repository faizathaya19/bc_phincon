import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import Home from './pages/HomePage'
import PublicRoute from './routes/PublicRoute'
import AuthPage from './features/authFeature/pages/AuthPage'
import PrivateRoute from './routes/PrivateRoute'
import TabPage from './features/reviewFeature/pages/TabPage'
import DetailPage from './features/reviewFeature/pages/DetailPage'
import ChatRoomListPage from './features/chatFeature/pages/ChatRoomListPage'
import ChatPage from './features/chatFeature/pages/ChatPage'

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />

        {/* Protected routes */}
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/tabs"
            element={
              <PrivateRoute>
                <TabPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/detail/:type/:id"
            element={
              <PrivateRoute>
                <DetailPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat/:roomId"
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/listChat"
            element={
              <PrivateRoute>
                <ChatRoomListPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  )
}
