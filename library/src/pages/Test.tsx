import { createContext, FC, useContext, useState, useEffect } from 'react';
import {
  Link,
  useParams,
} from "react-router-dom";
import { Profile } from '../models/ProfileModel';
import { useProfileStore } from '../stores/TestProfileStore';

interface UsernameParam {
  username: string
}


export function TestDisplay(props: {username: string}) {
  const {fetchProfile, profiles} = useProfileStore()
  const value = profiles?.get(props.username)
  const user = typeof(value)==="object" ? value : undefined
  const msg  = typeof(value)==="string" ? value : undefined

  useEffect(() => {
    fetchProfile(props.username)
  }, [props.username])

  return (
    <div>
      <h2>Test</h2>
      <p>{props.username}</p>
      <p>profiles: {profiles===undefined ? "undefined" : profiles.toString()}</p>
      { msg ? <p>{msg}</p> : (
        <>
        <p>{`${user?.given_name} ${user?.family_name}`}</p>
        <p>{user?.email}</p>
        </>
      )}
    </div>
  )
}

export function Test() {
  let {username} = useParams<UsernameParam>();
  return (
    <TestDisplay username={username}/>
  );
}
