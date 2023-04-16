import React from "react";
import { LoginDto } from "../../dto/login-dto";
import { UserDto } from "../../dto/user-dto";
import axios from "axios";

function useLogin(): LoginDto | undefined {
	
	const [token, setToken] = React.useState(localStorage.getItem("token") || "");
	const [user, setUser] = React.useState<UserDto | undefined>();

	function get_headers(): any {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  function getUserData(): void {
    if (token && token.length != 0) {
      axios
        .get("/api/me", get_headers())
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data as UserDto);
          }
        })
        .catch((error) => {});
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

	return {
    token,
    setToken,
    user,
    get_headers,
    getUserData,
  };
}

export default useLogin;
