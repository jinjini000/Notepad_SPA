import React, { useState, useEffect } from "react";
import Memo from "../Memo/Memo";
import AddMemo from "../AddMemo/AddMemo";
import { useWriteMode } from "../../context/WriteModeContext";
import styles from "./MemoList.module.css";
import { useSearch } from "../../context/SearchContext";

export default function MemoList() {
  const [memos, setMemos] = useState(() => readMemoFromLoaclStorage());
  const { searchText } = useSearch();

  const handleAdd = (memo) => setMemos([memo, ...memos]);

  const handleUpdate = (updatedMemo) =>
    setMemos(
      memos.map((memo) => (memo.id === updatedMemo.id ? updatedMemo : memo))
    );

  const handleDelete = (deleted) =>
    setMemos(memos.filter((memo) => memo.id !== deleted.id));

  useEffect(() => {
    localStorage.setItem("memos", JSON.stringify(memos));
  }, [memos]);

  const { writeMode } = useWriteMode();

  const filteredMemos = searchText
    ? memos.filter((memo) => {
        const lower = searchText.toLowerCase();
        return (
          memo.title.toLowerCase().includes(lower) ||
          memo.text.toLowerCase().includes(lower)
        );
      })
    : memos;

  return (
    <>
      <section className={styles[!writeMode ? "Memo" : "NoDisplay"]}>
        <ul>
          {filteredMemos.map((memo) => (
            <Memo
              key={memo.id}
              memo={memo}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </ul>
      </section>

      <section className={styles[writeMode ? "AddMemo" : "NoDisplay"]}>
        <AddMemo onAdd={handleAdd} />
      </section>
    </>
  );
}

function readMemoFromLoaclStorage() {
  const memos = localStorage.getItem("memos");
  return memos ? JSON.parse(memos) : [];
}
