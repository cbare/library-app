import React from 'react';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


export function Login() {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  console.log(`isLoading = ${isLoading}`)
  console.log(`isAuthenticated = ${isAuthenticated}`)

  useEffect(() => {
    if (isAuthenticated) {
      const username = user.username || user.nickname;
      fetch(
        `http://127.0.0.1:8000/login`,
        {
          method: "PUT",
          headers: new Headers({
            Accept: "application/json",
            "Content-type": "application/json",
          }),
          body: JSON.stringify(user),
        }
      )
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      // .then(res => res.json())
      // .then(response => {
      //   setProfile(response);
      //   setStatus("LOADED");
      // })
      .catch(error => {
        console.log(error)
      });
    }
  }, [user]);

  if (isLoading) {
    return (
      <div>
        <h2>Login</h2>
        <p>Authenticating...</p>
      </div>
    )
  }
  else if (isAuthenticated) {
    const username = user.username || user.nickname;
    return (
      <Redirect to={`/profile/${username}`} />
    )
  }
  else {
    return (
      <div>
        <h2>Login</h2>
        <button onClick={() => loginWithRedirect()}>Log In</button>
      </div>
    )
  }
}
