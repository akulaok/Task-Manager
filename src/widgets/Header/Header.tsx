import type {JSX} from "@emotion/react/jsx-runtime";
import {AppBar, Toolbar, Typography} from "@mui/material";

function Header(): JSX.Element {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#8995dc",
          color: "white",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div">
            Task Manager
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
