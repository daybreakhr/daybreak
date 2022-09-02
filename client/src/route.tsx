import App from './App'
import Login from './pages/login'
import Home from './pages/home'
import {
    HashRouter,
    Routes,
    Route,
} from 'react-router-dom'

const MainRoute = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="login" element={<Login />} />
                <Route path="home" element={<Home />} />
            </Routes>
        </HashRouter>
    )
}

export default MainRoute