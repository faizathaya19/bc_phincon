import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
// import Home from './pages/HomePage'
import Cart from './pages/CartPage'
import TransactionStatus from './pages/TransactionStatus'
import ProductDetail from './components/ProductDetail/ProductDetail'
import ReviewPage from './components/Review/ReviewPage'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ReviewPage />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:product_id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/transaction-status" element={<TransactionStatus />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
