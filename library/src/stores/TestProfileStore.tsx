import { createContext, FC, useContext, useState, useEffect } from 'react';
import { Profile } from '../models/ProfileModel';


interface ProfileStore {
  fetchProfile: (username: string) => void,
  profiles: Map<string, Profile | string> | undefined
}

const ProfileStoreContext = createContext<ProfileStore>({
  fetchProfile: (username: string) => {},
  profiles: new Map<string, Profile | string>()
});

export const useProfileStore= () => {
  const context = useContext(ProfileStoreContext);

  if (!context) {
    throw new Error('useProfileStore must be used within ProfileStoreProvider');
  }

  return context;
};

export const TestProfileStoreProvider: FC = (props) => {
  let [profiles, setProfiles] = useState<Map<string, Profile | string>>();

  const fetchProfile = async (username: string) => {

    if (profiles===undefined) {
      console.log('initializing profiles...')
      profiles=new Map<string, Profile | string>()
    }

    console.log(profiles)

    if (profiles.has(username)) {
      if (typeof(profiles?.get(username))==="object") {
        console.log(`got profile for ${username} already`)
        return
      }
      else if (profiles?.get(username)==="LOADING") {
        console.log(`getting profile for ${username} already`)
        return
      }
      else if (profiles?.get(username)==="ERROR") {
        console.log(`errored gettting profile for ${username}`)
        return
      }
      else {
        console.log(`something else?? ${username}`)
        return
      }
    }

    (async () => {
      profiles?.set(username, "LOADING");
      setProfiles(profiles);
    })();

    console.log(`Getting profile for ${username}!`)
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
      console.log(`received profile for ${username}`)
      if (profiles) {
        let x = new Map(profiles)
        x.set(username, response)
        setProfiles(x);
      }
    })
    .catch(error => {
      console.log(`received error for ${username}`)
      console.log(error)
      if (profiles) {
        let x = new Map(profiles)
        x.set(username, "ERROR")
        setProfiles(x);
      }
    });

  }

  return (
    <ProfileStoreContext.Provider value={
      {
        fetchProfile,
        profiles,
      }}>
      {props.children}
    </ProfileStoreContext.Provider>
  )
}

