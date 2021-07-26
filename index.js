import React, { useState } from "react";
import ReactDOM from "react-dom";
import User from "./demo/05-component/user";

const testUser1 = {
  avatar:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/%22Giraffa%22%2C_close_2.jpg/128px-%22Giraffa%22%2C_close_2.jpg",
  name: "Geoffrey Giraffe",
};

const App = () => {
  const [user, setUser] = useState(testUser1);
  const editUser = (name) => {
    setUser((prevUser) => ({ ...prevUser, name }));
  };

  return (
    <div>
      <User user={user} onSave={editUser} />
    </div>
  );
};

const node = document.getElementById("app");
ReactDOM.render(<App />, node);
