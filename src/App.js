import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import { indigo, blueGrey } from "@material-ui/core/colors";

import Notes from "./pages/Notes";
import Create from "./pages/Create";
import Layout from "./components/Layout";

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: blueGrey,
  },
  typography: {
    fontFamily: "Poppins",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Notes />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
