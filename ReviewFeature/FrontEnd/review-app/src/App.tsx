import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import Home from './pages/HomePage'
import TabPage from './features/reviewFeature/pages/TabPage'
import DetailPage from './features/reviewFeature/pages/DetailPage'
import LoginPage from './features/loginFeature/pages/LoginPage'
import RegisterPage from './features/loginFeature/pages/RegisterPage'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
import Chat from './pages/ChatPage'
import ChatList from './pages/ChatList'

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
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
                <Chat />
              </PrivateRoute>
            }
          />
          <Route
            path="/listChat"
            element={
              <PrivateRoute>
                <ChatList />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  )
}
