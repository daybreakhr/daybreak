import App from './App'
import Login from './pages/login'
import Home from './pages/home'
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom'

const MainRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="login" element={<Login />} />
                <Route path="home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoute