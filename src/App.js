import React from 'react';
import logo from './logo.svg';
import './App.css';
import { store } from './actions/store';
import { Provider} from "react-redux";
import DCandidates from './components/DCandidates';
import { Container } from "@mui/material";

function App() {
  return (
    <Provider store={store}>
      <Container maxwidth = "lg">
      <DCandidates/>
      </Container>
    </Provider>
  );
}

export default App;
