import { Link } from "react-router-dom";
import Auth from 'components/auth'
import Login from 'pages/login'

export default function App() {
  return (
    <nav
      style={{
        borderBottom: "solid 1px",
        paddingBottom: "1rem",
      }}
    >
      <Link to="/login">Login</Link> |{" "}
      <Link to="/home">Home</Link>
    </nav>
  )
}
