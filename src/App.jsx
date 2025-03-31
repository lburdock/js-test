import { useState } from "react";

import { User } from "./components/user";
import "./App.css";

function App() {
  const [user, setUser] = useState("Marty McFly");
  const editUser = name => {
    setUser(name);
  };

  return (
    <div>
      <User user={user} onSave={editUser} />
    </div>
  );
}

export default App;
