import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { HowToVote, PersonSearchOutlined } from "@mui/icons-material";
import { redirect } from "react-router-dom";

type Anchor = "left";
const anchor = "left";
interface ISwipeableTemporaryDrawer {
  openDrawer: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function SwipeableTemporaryDrawer({
  openDrawer,
  setOpen,
}: ISwipeableTemporaryDrawer) {
  const [state, setState] = React.useState({
    left: false,
  });

  React.useEffect(() => {
    toggleDrawer(anchor, openDrawer);
  }, [openDrawer]);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: openDrawer });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: "250px" }}
      role="presentation"
      onClick={() => setOpen(false)}
      onKeyDown={() => setOpen(false)}
    >
      <List>
        {["Votación"].map((text, index) => (
          <>
            <ListItem
              onClick={() =>
                (window.location.href =
                  index % 2 === 0 ? "/votaciones" : "/candidatos")
              }
              key={text}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <PersonSearchOutlined /> : <HowToVote />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={anchor}>
        <SwipeableDrawer
          anchor={anchor}
          open={openDrawer}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(false)}
        >
          {list(anchor)}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
