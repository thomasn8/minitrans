import React from "react";
import { LoginDto } from "../../_dto/login-dto";
import { UserDto } from "../../_dto/user-dto";
import axios from "axios";

function useLogin(): LoginDto | undefined {
	
	const [token, setToken] = React.useState(localStorage.getItem("token") || "");
	const [user, setUser] = React.useState<UserDto | undefined>();

	function getHeaders(): any {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  function getUserData(): void {
    if (token && token.length !== 0) {
      axios
        .get("/api/me", getHeaders())
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data as UserDto);
          }
        })
        .catch((error) => {});  // si ca a pas passer, faire une requet sur auth/refresh pour avoir une nouvelle paire de token, si oui et retenter une requete sur api/me
    }
		else {
	    setUser(undefined);
		}
  }

  React.useEffect(() => {
    if (user === undefined) {
      getUserData();
    }
  }, [token]);

  if (user) {
    return {
      token,
      setToken,
      user,
      getHeaders,
      getUserData,
    };
  }
  return undefined;
}

export default useLogin;
