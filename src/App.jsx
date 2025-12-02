import styles from "./App.module.css";
import Header from "./components/Header/Header.jsx";
import MemoList from "./components/MemoList/MemoList.jsx";
import WriteModeProvider from "./context/WriteModeContext.jsx";
import SearchProvider from "./context/SearchContext.jsx";

function App() {
  return (
    <>
      <div className={styles.app}>
        <WriteModeProvider>
          <SearchProvider>
            <Header />
            <MemoList />
          </SearchProvider>
        </WriteModeProvider>
      </div>
    </>
  );
}

export default App;
