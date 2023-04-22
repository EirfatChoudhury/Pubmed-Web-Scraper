import SearchAppBar from "./components/SearchAppBar";

const App = () => {
  return (
      <div>
        <SearchAppBar />
        <div style={{padding: 30, background: '#B22222', height: '100vh'}}>
          <p style={{margin: 0}}>Search Results</p>
        </div>
      </div>
  );
};

export default App;