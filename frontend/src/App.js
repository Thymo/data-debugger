import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ClusterDebugger from "./pages/ClusterDebugger";
import ConfusedDebugger from "./pages/ConfusedDebugger";
import CssBaseline from "@material-ui/core/CssBaseline";
import DenseAppBar from "./components/DenseAppBar";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  palette: {
    primary: {
      main: '#0085cd',
    },
    secondary: {
      main: '#1d2938',
    },
  },
});

function App() {
  return (
      <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            <CssBaseline />
            <DenseAppBar/>
            <Switch>
              <Route path="/cluster-debugger">
                <ClusterDebugger />
              </Route>
              <Route path="/confused-debugger">
                <ConfusedDebugger />
              </Route>
              <Route path="/">
                 <Redirect to="/cluster-debugger" />
              </Route>
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
      </QueryClientProvider>
  );
}

export default App;
