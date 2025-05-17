import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function PhotoDetail() {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Lấy chi tiết ảnh
    fetchModel(`http://localhost:8081/api/photo/photosOfUser/${photoId}`)
      .then((data) => setPhoto(data))
      .catch(() => setPhoto(null));

    // Lấy comment theo photo_id
    fetchModel(`http://localhost:8081/api/comment/list?photo_id=${photoId}`)
      .then((data) => setComments(data))
      .catch(() => setComments([]));
  }, [photoId]);

  if (!photo) {
    return <Typography>Loading photo...</Typography>;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {photo.title || "Photo Detail"}
      </Typography>
      <Card sx={{ maxWidth: 600, marginBottom: 3 }}>
        <CardMedia
          component="img"
          height="400"
          image={photo.url}
          alt={photo.title || "Photo"}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {photo.description || ""}
          </Typography>
        </CardContent>
      </Card>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      <List>
        {comments.map((comment) => (
          <React.Fragment key={comment._id}>
            <ListItem>
              <ListItemText
                primary={comment.text}
                secondary={`By user ${comment.user_id}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default PhotoDetail;
