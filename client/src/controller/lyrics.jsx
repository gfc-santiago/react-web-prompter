/* eslint-disable react/prop-types */
import React from "react";
import useSocket, { withSocket } from "../components/sockets/use-socket";
import {
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import songs from "./songs";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const SOCKET_URL = "http://localhost:5000";

function LyricsList() {
  const socket = useSocket();
  const [selected, setSelected] = React.useState(null);
  const { id: songId } = useParams();
  const { title, author, sections } = songs[songId];

  const onReceive = ({ content }) => {
    setSelected(content);
  };

  React.useEffect(() => {
    socket?.on("receive", onReceive);
    return () => {
      socket?.removeListener("receive", onReceive);
    };
  }, [socket]);

  const handleClick = (page) => () => {
    axios.post(`${SOCKET_URL}/send`, { type: "text", content: page });
  };

  const handleTitleClick = () => {
    axios.post(`${SOCKET_URL}/send`, {
      type: "title",
      content: { title, author },
    });
  };

  return (
    <Container fluid>
      <Box py={1}>
        <Button component={Link} to="/remote">
          Back
        </Button>
        <Typography variant="h4" textAlign="center">
          {title}
        </Typography>
        <Typography component="div" variant="caption" textAlign="center">
          {author}
        </Typography>
      </Box>
      <Box color="primary.main">Title</Box>
      <ListItem
        sx={{
          display: "flex",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Box>
            <Typography>{title}</Typography>
            <Typography variant="caption">{author}</Typography>
          </Box>
        </Box>
        <Button
          variant={"outlined"}
          color="info"
          size="small"
          onClick={handleTitleClick}
        >
          View
        </Button>
      </ListItem>
      {sections.map(({ name, pages }) => (
        <React.Fragment key={name}>
          <Box color="primary.main">{name}</Box>
          <List
            sx={{
              width: "100%",
              color: "primary",
            }}
          >
            {pages.map((page, key) => {
              const sel = JSON.stringify(selected) === JSON.stringify(page);
              return (
                <React.Fragment key={key}>
                  <ListItem
                    sx={{
                      display: "flex",
                      bgcolor: sel ? "success.light" : "",
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      {page.map((line) => (
                        <Box key={line}>
                          <Typography>{line}</Typography>
                        </Box>
                      ))}
                    </Box>
                    <Button
                      variant={sel ? "contained" : "outlined"}
                      color="info"
                      size="small"
                      onClick={handleClick(page)}
                    >
                      View
                    </Button>
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              );
            })}
          </List>
        </React.Fragment>
      ))}
    </Container>
  );
}

const Lyrics = withSocket(SOCKET_URL, LyricsList);
export default Lyrics;
