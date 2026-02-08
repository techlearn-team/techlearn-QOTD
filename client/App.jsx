import { useEffect, useState } from "react";
import QOTD from "./pages/QOTD";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("techlearn_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("techlearn_user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("techlearn_user");
  };

  return user ? <QOTD user={user} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />;
}

export default App;
