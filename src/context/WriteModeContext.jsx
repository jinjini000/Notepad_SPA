import { createContext, useContext, useState } from "react";

const WriteModeContext = createContext();

export default function WriteModeProvider({ children }) {
  const [writeMode, setWriteMode] = useState(false);
  const toggleWriteMode = () => {
    setWriteMode(!writeMode);
    updateWriteMode(!writeMode);
  };

  return (
    <>
      <WriteModeContext.Provider value={{ writeMode, toggleWriteMode }}>
        {children}
      </WriteModeContext.Provider>
    </>
  );
}

function updateWriteMode(writeMode) {
  if (writeMode) {
    document.documentElement.classList.add("write");
    localStorage.theme = "write";
  } else {
    document.documentElement.classList.remove("write");
    localStorage.theme = "view";
  }
}

export const useWriteMode = () => useContext(WriteModeContext);
