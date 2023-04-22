import SearchAppBar from "./components/SearchAppBar";
import MainContent from "./components/MainContent";

const App = () => {
  return (
      <div>
        <SearchAppBar />
        <div style={{padding: 30, height: '100vh'}}>
          <div>
            <MainContent />
          </div>
        </div>
      </div>
  );
};

export default App;