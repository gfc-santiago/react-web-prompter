import React, { useMemo } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import songs from "./songs";
import { Link } from "react-router-dom";
import useService from "../components/service/use-service";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useSocket from "../components/sockets/use-socket";

function Directory() {
  const { loading, service } = useService();

  if (loading) return <CircularProgress />;

  return (
    <Container
      sx={{ height: "100vh", position: "relative", overflow: "hidden" }}
    >
      <Box sx={{ overflowY: "auto", maxHeight: "95vh" }}>
        {service?.sections?.map?.((section, index) => (
          <Box key={index} sx={{ mt: 2 }} className="section">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography
                  variant="h5"
                  color="error.main"
                  sx={{ textAlign: "center" }}
                >
                  {section?.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ maxHeight: "70vh", overflowY: "auto" }}>
                  {section?.lines?.map((page, sIndex) => (
                    <Box key={`${index}-${sIndex}`} className="sub-section">
                      {/* {page.lines ? <Section {...page} /> : <Page lines={page} />} */}
                      {Array.isArray(page) ? (
                        <Pages lines={page} />
                      ) : (
                        <SubSection {...page} />
                      )}
                    </Box>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </Box>
      {/* <Box
        sx={{
          p: 2,
          boxSizing: "border-box",
          width: "100vw",
          position: "absolute",
          bottom: 0,
          left: 0,
          backgroundColor: "rgba(255,255,255,0.8)",
        }}
      >
        Hello
      </Box> */}
    </Container>
  );
}

function SubSection({ lines, name }) {
  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h6" color="info.main">
        {name}
      </Typography>
      {lines.map((line, index) => (
        <Box key={index} className="sub">
          <Pages lines={line} />
        </Box>
      ))}
    </Box>
  );
}

function Pages({ lines }) {
  const socket = useSocket();

  const handleClick = () => {
    socket.send({ type: "text", content: lines });
  };
  return (
    <Paper className="page" sx={{ mt: 1, display: "flex", p: 1 }}>
      <Box sx={{ flexGrow: 1, maxWidth: "calc(100% - 65px)" }}>
        {lines.map((line, index) => (
          <Line key={index}>{line}</Line>
        ))}
      </Box>
      <Box sx={{ alignItems: "center", display: "flex" }}>
        <Button
          variant="contained"
          size="small"
          color="success"
          onClick={handleClick}
        >
          View
        </Button>
      </Box>
    </Paper>
  );
}

function Line({ children }) {
  if (children.startsWith("{S}"))
    return (
      <Typography sx={{ fontSize: 12 }}>{children.substring(3)}</Typography>
    );
  if (children.startsWith("{T}"))
    return <Typography>{children.substring(3)}</Typography>;
  return <Typography>{children}</Typography>;
}

export default Directory;
