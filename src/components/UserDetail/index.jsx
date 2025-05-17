// UserDetail.jsx
import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`http://localhost:8081/api/user/${userId}`)
      .then((data) => setUser(data))
      .catch((err) => {
        console.error("Error fetching user:", err);
        setUser(null);
      });
  }, [userId]);

  if (!user) {
    return <Typography variant="body1">Loading user details...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="body1">Location: {user.location}</Typography>
      <Typography variant="body1">Occupation: {user.occupation}</Typography>
      <Typography variant="body1">Description: {user.description}</Typography>

      <Link to={`/photos/${userId}`} style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary">
          View Photos
        </Button>
      </Link>
    </div>
  );
}

export default UserDetail;
