import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import Logo from "../assets/image/logo.jpg";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(
    window.innerWidth > 800 ? true : false
  );
  const { currentUser } = useContext(UserContext);

  const closeNavhandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true);
    }
  };

  return (
    <nav>
      <div className="container nav_container">
        <Link to="/" className="nav_logo" onClick={closeNavhandler}>
          <img src={Logo} alt="navbar logo" />
        </Link>
        {currentUser?.id && isNavShowing && (
          <ul className="nav_menu">
            <li>
              <Link to={`/profile/${currentUser.id}`} onClick={closeNavhandler}>
                {currentUser?.name}
              </Link>
            </li>
            <li>
              <Link to="/create" onClick={closeNavhandler}>
                Create Post
              </Link>
            </li>
            <li>
              <Link to="/authors" onClick={closeNavhandler}>
                Authors
              </Link>
            </li>
            <li>
              <Link to="/logout" onClick={closeNavhandler}>
                Logout
              </Link>
            </li>
          </ul>
        )}
        {!currentUser?.id && isNavShowing && (
          <ul className="nav_menu">
            <li>
              <Link to="/authors" onClick={closeNavhandler}>
                Authors
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={closeNavhandler}>
                Login
              </Link>
            </li>
          </ul>
        )}
        <button
          className="nav_toogle-btn"
          onClick={() => setIsNavShowing(!isNavShowing)}
        >
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
