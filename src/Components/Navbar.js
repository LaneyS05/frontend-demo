import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <Link style={{ color: "lime" }} to="/">
        Home
      </Link>
      <Link style={{ color: "pink" }} to="/new">
        New
      </Link>
    </>
  );
}
export default Navbar;
