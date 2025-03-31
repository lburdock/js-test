import React, { useState } from "react";
import "./user.css";

export const User = ({ user, onSave }) => {
  const [input, setInput] = useState(user || "");
  const [isEdit, setIsEdit] = useState(false);

  const onEditClick = event => {
    event.preventDefault();
    setIsEdit(true);
  };

  const onSaveClick = event => {
    event.preventDefault();
    onSave(input);
    setIsEdit(false);
  };

  const onCancelClick = event => {
    event.preventDefault();
    setInput(user);
    setIsEdit(false);
  };

  return (
    <form onSubmit={onSaveClick} className="flex-column gap-md">
      <div data-testid="user" className="flex align-items-center gap-sm">
        <div role="img" className="avatar">
          {input?.[0]?.toUpperCase() ?? "?"}
        </div>

        <input
          aria-label="Name"
          disabled={!isEdit}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter your name"
          type="text"
          required
          value={input}
        />
      </div>

      <div className="flex gap-sm">
        {isEdit ? (
          <>
            <button className="blue" type="submit">
              Save
            </button>
            <button className="red" type="button" onClick={onCancelClick}>
              Cancel
            </button>
          </>
        ) : (
          <button className="blue" type="button" onClick={onEditClick}>
            Edit
          </button>
        )}
      </div>
    </form>
  );
};
