import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useWriteMode } from "../../context/WriteModeContext";
import styles from "./AddMemo.module.css";

export default function AddMemo({ onAdd }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const handleTextChange = (e) => setText(e.target.value); // 입력한 값 표현(갱신)
  const handleTitleChange = (e) => setTitle(e.target.value);
  const { toggleWriteMode } = useWriteMode();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length === 0 || title.trim().length === 0) {
      return;
    }
    //uuid 모듈사용
    onAdd({ id: uuidv4(), title, text });
    setText(""); //비워주기
    setTitle("");
    toggleWriteMode();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="제목"
          value={title}
          onChange={handleTitleChange}
        />
        <div className={styles.div}>
          <textarea
            className={styles.textarea}
            rows="10"
            cols="50"
            placeholder="내용"
            value={text}
            onChange={handleTextChange}
          ></textarea>
        </div>

        <button className={styles.button} type="submit">
          등록
        </button>
      </form>
    </>
  );
}
