import CloseIcon from "@mui/icons-material/Close";
import {
  Typography,
  Toolbar,
  Paper,
  IconButton,
  Tooltip,
  Fade,
  Box,
} from "@mui/material";
import * as config from "./config";
import {
  actionsMessagesChat,
  actionsClearSelectedMessages,
} from "@/actions/index";

// STYLES
const classes = {
  root: "flex px-[0px] py-[10px] justify-center",
  wrapper: "w-[80%] max-w-[500px]",
};

const BottomToolbar = ({ conversationId, selectedMessages }) => {
  // VARIABLES
  const selectedMessagesAmount = Object.keys(selectedMessages.messages).length;

  // FUNCTIONS
  const handleClickAction = async (typeAction) => {
    await actionsMessagesChat({
      conversationId,
      typeAction,
    });

    actionsClearSelectedMessages(true);
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
              actionsClearSelectedMessages(true);
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
