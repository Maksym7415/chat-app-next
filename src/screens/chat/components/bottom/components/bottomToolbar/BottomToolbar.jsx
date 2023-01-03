"use client";

import CloseIcon from "@mui/icons-material/Close";
import {
  Typography,
  Toolbar,
  Button,
  Paper,
  IconButton,
  Tooltip,
  Fade,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import * as config from "./config";
import store from "@/store/store";
import {
  actionsMessagesChat,
  actionsClearSelectedMessages,
} from "@/actions/index";

const BottomToolbar = ({ conversationId }) => {
  // HOOKS
  const classes = useStyles();

  // SELECTORS
  const selectedMessages = useSelector(
    ({ appSlice }) => appSlice.selectedMessages
  );

  // VARIABLES
  const selectedMessagesAmount = Object.keys(selectedMessages.messages).length;

  // FUNCTIONS
  const handleClickAction = async (typeAction) => {
    await actionsMessagesChat({
      conversationId,
      typeAction,
    });

    store.dispatch(actionsClearSelectedMessages(true));
  };

  return (
    <Box className={classes.root}>
      <Paper className={classes.wrapper} elevation={12}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              store.dispatch(actionsClearSelectedMessages(true));
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {selectedMessagesAmount} message selected
          </Typography>
          {!!selectedMessagesAmount &&
            config.actionsMessagesToolbar("lang").map((item) => {
              return (
                <IconButton
                  size="large"
                  color="inherit"
                  key={item.id}
                  onClick={() => handleClickAction(item.value)}
                >
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    title={item.title}
                  >
                    {item.iconComponent}
                  </Tooltip>
                </IconButton>
              );
            })}
        </Toolbar>
      </Paper>
    </Box>
  );
};

export default BottomToolbar;