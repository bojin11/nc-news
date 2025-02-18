import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <nav className="navBar">
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/topics">
        <button>Topics</button>
      </Link>
      <Link to="/users">
        <button>Users</button>
      </Link>
    </nav>
  );
}
