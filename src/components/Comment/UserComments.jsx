import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";

function UserComments() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchModel(`http://localhost:8081/api/comment/list?user_id=${userId}`)
      .then((data) => setComments(data))
      .catch(() => setComments([]));

    fetchModel(`http://localhost:8081/api/photo/photosOfUser/list`)
      .then((data) => setPhotos(data))
      .catch(() => setPhotos([]));
  }, [userId]);

  const findPhoto = (photoId) => photos.find((p) => p._id === photoId);

  const handleClick = (photoId) => {
    navigate(`/photos/detail/${photoId}`);
  };

  return (
    <div className="user-comments-container">
      <Typography variant="h6" gutterBottom>
        Comments by User
      </Typography>
      <List>
        {comments.map((comment) => {
          const photo = findPhoto(comment.photo_id);
          return (
            <ListItem
              key={comment._id}
              button
              onClick={() => handleClick(comment.photo_id)}
              alignItems="flex-start"
              className="comment-item"
            >
              <Avatar
                variant="square"
                src={photo?.thumbnailUrl || photo?.url || ""}
                alt="photo thumbnail"
                className="comment-thumbnail"
              />
              <ListItemText
                primary={comment.text}
                secondary={`On photo: ${photo ? photo.title : "Unknown"}`}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default UserComments;
