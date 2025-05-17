import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import models from "../../modelData/models"; // Đảm bảo đường dẫn đúng

import "./styles.css";

function TopBar() {
  const { userId } = useParams();
  const location = useLocation();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (userId) {
      const user = models.userModel(userId);
      if (user) {
        setUserName(`${user.first_name} ${user.last_name}`);
      } else {
        setUserName(""); // fallback
      }
    }
  }, [userId]);

  let title = "Home";

  if (userId) {
    if (location.pathname.includes("photos")) {
      title = `Photos of ${userName}`;
    } else {
      title = `Details of ${userName}`;
    }
  }

  return (
    <AppBar position="absolute" className="topbar-appBar">
      <Toolbar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">Photo Share App</Typography>
        </Box>
        <Box>
          <Typography variant="body1">{title}</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
