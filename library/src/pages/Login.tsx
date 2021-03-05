import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";


export function Login() {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  if (isAuthenticated) {
    return (
        <div>
        <h2>Login</h2>

        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>

        <button onClick={() => logout({ returnTo: window.location.origin+'/login' })}>
          Log Out
        </button>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Login</h2>

        <button onClick={() => loginWithRedirect()}>Log In</button>

      </div>
    )
  }
}
