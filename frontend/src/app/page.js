'use client';

import SearchAppBar from "./components/SearchAppBar";
import { Provider } from 'react-redux';
import store from '../store';
import Content from "./components/Content";

const Home = () => {
  return (
    <Provider store={store}>
      <main>
        <SearchAppBar />
        <div style={{padding: 30, background: '#B22222', height: '100vh'}}>
          <h1>Search Results</h1>
          <Content />
        </div>
      </main>
    </Provider>
  );
};

export default Home;
