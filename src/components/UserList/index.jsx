// src/components/UserList.jsx
import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Badge,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchModel("http://localhost:8081/api/user/list")
      .then((data) => {
        console.log("Users with counts:", data);
        setUsers(data);
      })
      .catch((err) => {
        console.error("Error fetching user list:", err);
        setUsers([]);
      });
  }, []);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        User List
      </Typography>
      <List component="nav">
        {users.map((user) => {
          const photoCount = user.photoCount ?? 0;
          const commentCount = user.commentCount ?? 0;

          return (
            <React.Fragment key={user._id}>
              <ListItem className="user-list-item">
                <ListItemText
                  primary={
                    <Link
                      to={`/users/${user._id}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      {`${user.first_name} ${user.last_name}`}
                    </Link>
                  }
                />
                <Box
                  className="badge-box green-bubble"
                  title="Photos"
                  onClick={() => navigate(`/photos/${user._id}`)}
                  sx={{ cursor: "pointer" }}
                >
                  <Badge badgeContent={photoCount} color="success" />
                </Box>
                <Box
                  className="badge-box red-bubble"
                  title="Comment"
                  onClick={() => navigate(`/comments/${user._id}`)}
                  sx={{ cursor: "pointer" }}
                >
                  <Badge badgeContent={commentCount} color="error" showZero />
                </Box>
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );
}

export default UserList;
