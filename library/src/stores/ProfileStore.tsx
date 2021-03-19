import { createContext, FC, useContext, useState, useEffect } from 'react';
import { Profile } from '../models/ProfileModel';


interface ProfileStore {
  profile: Profile | undefined;
  status: string;
}

const ProfileStoreContext = createContext<ProfileStore | undefined>(undefined);

export const useProfileStore= () => {
  const context = useContext(ProfileStoreContext);

  if (!context) {
    throw new Error('useProfileStore must be used within ProfileStoreProvider');
  }

  return context;
};

export const ProfileStoreProvider: FC<{username: string}> = (props) => {
  const [profile, setProfile] = useState<Profile|undefined>();
  const [status, setStatus] = useState("LOADING");
  const username = props.username;

  useEffect(() => {
    fetch(
      `http://127.0.0.1:8000/profile/${username}`,
      {
        method: "GET",
        headers: new Headers({Accept: "application/json"})
      }
    )
    .then(response => {
      if (!response.ok) {

        (async () => {
          let body = await response.json();
          if (body) {
            if ("detail" in body) {
              console.log(body["detail"])
            }
          }
        })();

        throw Error(response.statusText);
      }
      return response;
    })
    .then(res => res.json())
    .then(response => {
      setProfile(response);
      setStatus("LOADED");
    })
    .catch(error => {
      console.log(error)
      setProfile(undefined);
      setStatus("ERROR");
    });
  }, [username]);

  return (
    <ProfileStoreContext.Provider value={
      {
        profile,
        status,
      }}>
      {props.children}
    </ProfileStoreContext.Provider>
  )
}
