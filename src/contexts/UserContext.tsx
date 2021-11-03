import React, { useEffect, useState } from "react";
import { getUserByName } from "../services/users/users";

export const UserContext = React.createContext<User>({});

export const UserContextComponent: React.FC<{}> = (props) => {
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    getUserByName("admin")
      .then((res: any) => {
        setUser(res.data);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, [setUser]);

  return (
    <UserContext.Provider value={{ ...user }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextComponent;
