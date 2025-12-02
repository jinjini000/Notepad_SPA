import { useState } from "react";
import { FaTrashAlt, FaEdit, FaCheck } from "react-icons/fa";
import styles from "./Memo.module.css";

export default function Memo({ memo, onDelete, onUpdate }) {
  const { title, text } = memo;

  const [showText, setShowText] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(text);

  const toggleShowText = () => {
    if (!editMode) setShowText(!showText);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(memo);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setEditMode(true);
  };
  const handleSave = () => {
    onUpdate({ ...memo, text: editText });
    setEditMode(false);
  };

  return (
    <li className={styles.memo} onClick={toggleShowText}>
      <label className={styles.label}>{title}</label>

      {showText && (
        <div className={styles.div}>
          {!editMode ? (
            <p>{text}</p>
          ) : (
            <textarea
              className={styles.editTextarea}
              rows="6"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}

      <span className={styles.buttons}>
        {!editMode && showText && (
          <button className={styles.buttonEdit} onClick={handleEdit}>
            <FaEdit />
          </button>
        )}

        {editMode && (
          <button className={styles.buttonSave} onClick={handleSave}>
            <FaCheck />
          </button>
        )}

        <button className={styles.buttonDelete} onClick={handleDelete}>
          <FaTrashAlt />
        </button>
      </span>
    </li>
  );
}
