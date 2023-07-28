import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const UserCard = ({ username, image, onEdit, onDelete }) => {
    return (
      <Card>
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 1,
              cursor: "pointer",
            }}
            onClick={onEdit}
          >
            <AiOutlineEdit size={24} />
          </span>
          <span
            style={{
              position: "absolute",
              top: 0,
              right: 30,
              zIndex: 1,
              cursor: "pointer",
            }}
            onClick={onDelete}
          >
            <AiOutlineDelete size={24} />
          </span>
        </div>
        <CardMedia component="img" height="140" image={image} alt={username} />
        <CardContent>
          <Typography variant="h6" component="div">
            {username}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  export default UserCard;