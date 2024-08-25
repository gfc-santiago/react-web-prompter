/* eslint-disable react/prop-types */
import React, { useMemo } from "react";
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import songs from "./songs";
import { Link } from "react-router-dom";

function Directory() {
  const items = useMemo(() => {
    return Object.entries(songs).map(([key, val]) => ({ id: key, ...val }));
  }, []);

  return (
    <Container>
      <Box py={3}>
        <Typography>Select Song</Typography>
      </Box>
      <List
        sx={{
          width: "100%",
          color: "primary",
        }}
      >
        {items.map(({ id, title, author }) => (
          <React.Fragment key={id}>
            <ListItem component={Link} to={`${id}`}>
              <ListItemText primary={title} secondary={author} />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
}

export default Directory;
