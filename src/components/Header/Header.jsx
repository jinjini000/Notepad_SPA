import React, { useState } from "react";
import { CiMemoPad } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import styles from "./Header.module.css";
import { useWriteMode } from "../../context/WriteModeContext";
import { useSearch } from "../../context/SearchContext";

export default function Header() {
  const { writeMode, toggleWriteMode } = useWriteMode();
  const { setSearchText } = useSearch();

  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const doSearch = (e) => {
    e.preventDefault();
    setSearchText(text);
  };

  return (
    <header className={styles.header}>
      <p>
        <CiMemoPad /> 메모장
      </p>
      <form className={styles.form} action={doSearch}>
        <input
          type="text"
          placeholder="검색어"
          value={text}
          onChange={onChange}
        />
        <button className={styles.button_a} onClick={doSearch}>
          <FaSearch />
        </button>
      </form>

      <button onClick={toggleWriteMode}>
        {!writeMode && `글 쓰기`}
        {writeMode && `메모 보기`}
      </button>
    </header>
  );
}
