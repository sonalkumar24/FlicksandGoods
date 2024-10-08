import { IconButton } from "@mui/material";
import Styles from "./Header.module.css";
import LogoutIcon from '@mui/icons-material/Logout';
import toast from "react-hot-toast";

const Header = ({ token, showHeader }) => {
  if (!token) { return null }

  const handleLogout = () => {
    localStorage.removeItem('token')
    toast.success("Logged out")

    //Redirect after a delay to allow the toast to show
    setTimeout(() => {
      window.location.href = `/login`;
    }, 500);
  }
  
  // Return null if the header should not be shown
  //if (!showHeader) return null;

  return (
    <div className={token ? Styles.header : Styles.header_login}>
      <img
        src={process.env.PUBLIC_URL + "/movie-image-no-background.png"}
        alt="movieImage"
        className={Styles.movieImage}
      />
      <span className={Styles.title} onClick={() => window.scroll(0, 0)}>
        Flicks & Goods
      </span>
      {token && <IconButton color="error" onClick={handleLogout} style={{ position: "fixed", right: "30px" }} > <LogoutIcon color="error"/></IconButton>}
    </div>
  );
};

export default Header;
