import {
  Link,
  useParams,
} from "react-router-dom";
import {
  ProfileStoreProvider,
  useProfileStore,
} from '../stores/ProfileStore'


interface UsernameParam {
  username: string
}


function ProfileDisplay(props: {username: string}) {
  const {profile, status} = useProfileStore()

  if (status==="LOADING") {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  else if (profile) {
    return (
      <div>
        <img className="ProfileImage" src={profile.picture} alt={profile.given_name + " " + profile.family_name} />
        <h2>{ profile.given_name + " " + profile.family_name }</h2>
        <p>{ profile.name }</p>
        <p>{ profile.email }</p>

        <div className="row">
          <pre className="col-12 text-light bg-dark p-4">
            {JSON.stringify(profile, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
  else {
    return (
      <div>
        <h2>Not found</h2>
        <p>We don't have a profile for user &ldquo;{ props.username }&rdquo;.</p>
      </div>
    )
  }
}

export function Profile() {
  let {username} = useParams<UsernameParam>();
  return (
    <ProfileStoreProvider username={username}>
      <ProfileDisplay username={username}/>
    </ProfileStoreProvider>
  );
}
