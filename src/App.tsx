import React from "react";
import "./App.css";
import ButtonAppBar from "./components/app-bar";
import SwipeableTemporaryDrawer from "./components/drawer";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Votaciones from "./pages/votaciones";
import Resultados from "./pages/resultados";

const theme = createTheme({
  palette: {
    primary: {
      main: "#111",
    },
  },
});
function App() {
  const [open, setOpen] = React.useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Home</div>,
    },
    {
      path: "/kevin-resultados",
      element: <Resultados />,
    },
    {
      path: "/votaciones",
      element: <Votaciones />,
    },
  ]);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ButtonAppBar setOpen={setOpen} />
        <SwipeableTemporaryDrawer openDrawer={open} setOpen={setOpen} />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
