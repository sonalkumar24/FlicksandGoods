import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect } from "react";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import Styles from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@material-ui/core";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const theme = createTheme({
  palette: {
    primary: green,
    secondary: green,
  },
});

export default function IconLabelTabs({ token }) {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (token) {
      if (value === 0) navigate("/");
      else if (value === 1) navigate("/series");
      else if (value === 2) navigate("/cart");
    }
  },[value, navigate]);
  if (!token) { return null }
  return (
    <ThemeProvider theme={theme}>
      <div className={Styles.navbar}>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: { backgroundColor: "goldenrod" },
          }}
          textColor="inherit"
        >
          <Tab icon={<MovieIcon />} label="Movies" />
          <Tab icon={<TvIcon />} label="TV series" />
          <Tab icon={<ShoppingCartIcon />} label="Cart" />
        </Tabs>
      </div>
    </ThemeProvider>
  );
}
