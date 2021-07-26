import React, { useState } from "react";
import "./user.css";

const User = ({ user, onSave }) => {
  const [username, setUsername] = useState(user?.name || "");
  const [isEdit, setIsEdit] = useState(false);

  const onEditClick = () => {
    setIsEdit(true);
  };

  const onSaveClick = () => {
    onSave(username);
    setIsEdit(false);
  };

  const onCancelClick = () => {
    setUsername(user?.name);
    setIsEdit(false);
  };

  if (!user) return null;

  return (
    <div data-testid="user">
      <img alt={`${user?.name} avatar`} src={user?.avatar} />

      <label htmlFor="name">
        <span>Name:</span>
        <input
          id="name"
          disabled={!isEdit}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          title="User name"
          type="text"
          value={username}
        />
      </label>

      {isEdit ? (
        <div>
          <button type="button" onClick={onSaveClick}>
            Save
          </button>
          <button type="button" onClick={onCancelClick}>
            Cancel
          </button>
        </div>
      ) : (
        <button type="button" onClick={onEditClick}>
          Edit
        </button>
      )}
    </div>
  );
};

export default User;
