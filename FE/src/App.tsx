import "./App.css";
import { publicAxios } from "./api/axios";
import { useUserStore } from "./store/userStore";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { useState } from "react";
interface User {
  id: string
  username: string
}
function App() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);
  const privateAxios = useAxiosPrivate();
  const [users, setUsers] = useState<User[]>([])
  const login = async () => {
    try {
      const res = await publicAxios.post("http://localhost:3000/login", {
        username: "1",
      });
      const { user, accessToken } = res?.data;
      setUser(user);
      setToken(accessToken);
    } catch (error) {}
  };
  const logout = async () => {
    try {
      await publicAxios.post("http://localhost:3000/logout");
      setUser(null);
      setToken("");
      setUsers([])
      localStorage.removeItem("auth");
    } catch (error) {}
  };
  const handleGetUsers = async () => {
    try {
      const res = await privateAxios.get("http://localhost:3000/users");
      setUsers(res.data.docs);
      await new Promise((r) => setTimeout(r, 1000));
      await privateAxios.get("http://localhost:3000/users");
    } catch (error) {}
  };
  return (
    <>
      {user.name && <div>Hello {user.name}</div>}
      {user.accessToken ? (
        <button onClick={logout}>Log out</button>
      ) : (
        <button onClick={login}>Log in</button>
      )}
      <div>
        <button onClick={handleGetUsers}>Get users</button>
      </div>
      {users?.map(user => <div key={user.id}>Name: {user.username}</div>)}
    </>
  );
}

export default App;
