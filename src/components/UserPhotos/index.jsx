// UserPhotos.jsx
import React, { useEffect, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [userName, setUserName] = useState("");
  const [newComments, setNewComments] = useState({});

  useEffect(() => {
    fetchModel(`http://localhost:8081/api/photo/photosOfUser/${userId}`)
      .then((data) => setPhotos(data))
      .catch((err) => {
        console.error("Error fetching photos:", err);
        setPhotos([]);
      });

    fetchModel(`http://localhost:8081/api/user/${userId}`)
      .then((user) => setUserName(`${user.first_name} ${user.last_name}`))
      .catch((err) => {
        console.error("Error fetching user:", err);
        setUserName("");
      });
  }, [userId]);

  const handleAddComment = (photoId) => {
    const comment = newComments[photoId];
    if (comment && comment.trim()) {
      const updatedPhotos = photos.map((photo) => {
        if (photo._id === photoId) {
          const newCommentObj = {
            _id: Date.now().toString(),
            user: {
              _id: userId,
              first_name: userName.split(" ")[0],
              last_name: userName.split(" ")[1],
            },
            comment: comment,
            date_time: new Date(),
          };
          return { ...photo, comments: [...photo.comments, newCommentObj] };
        }
        return photo;
      });
      setPhotos(updatedPhotos);
      setNewComments({ ...newComments, [photoId]: "" });
    }
  };

  const handleCommentChange = (photoId, value) => {
    setNewComments({ ...newComments, [photoId]: value });
  };

  if (photos.length === 0) {
    return <Typography variant="body1">Loading photos...</Typography>;
  }

  return (
    <div className="user-photos-container">
      <Typography variant="h4">Photos of {userName}</Typography>
      <List>
        {photos.map((photo) => (
          <React.Fragment key={photo._id}>
            <ListItem alignItems="flex-start" className="user-photo-block">
              <img
                src={`/images/${photo.file_name}`}
                alt={photo.file_name}
                className="user-photo-image"
              />
              <div className="photo-details">
                <Typography variant="body2">{photo.file_name}</Typography>
                <Typography variant="body2">
                  Added on: {new Date(photo.date_time).toLocaleString()}
                </Typography>

                <TextField
                  label="Add a comment"
                  variant="outlined"
                  fullWidth
                  value={newComments[photo._id] || ""}
                  onChange={(e) =>
                    handleCommentChange(photo._id, e.target.value)
                  }
                  multiline
                  rows={3}
                  style={{ marginTop: "16px" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddComment(photo._id)}
                  style={{ marginTop: "8px" }}
                >
                  Submit Comment
                </Button>

                <List className="user-photo-comment">
                  {(photo.comments || []).map((comment) => (
                    <ListItem key={comment._id}>
                      <Typography variant="body2">
                        <Link
                          to={`/users/${comment.user._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          {comment.user.first_name} {comment.user.last_name}
                        </Link>
                        : {comment.comment} (Posted on:{" "}
                        {new Date(comment.date_time).toLocaleString()})
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </div>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserPhotos;
