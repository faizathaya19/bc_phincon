import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ProfileProvider } from './features/loginFeature/contexts/ProfileContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProfileProvider>
      <App />
    </ProfileProvider>
  </React.StrictMode>
)
