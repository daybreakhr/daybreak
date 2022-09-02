import { Link } from "react-router-dom";
import Auth from 'components/auth'
import Login from 'pages/login'

export default function App() {
  const newLocal = 'solid 1px';
  return (
    <nav
      style={{
        borderBottom: newLocal,
        paddingBottom: '1rem',
      }}
    >
      <Link to="/login">Login</Link> |{' '}
      <Link to="/home">Home</Link>
    </nav>
  )
}
