import datetime as dt
import json
from typing import Any, Dict, AnyStr, List, Union
from fastapi import FastAPI, HTTPException, Response, status
from fastapi.middleware.cors import CORSMiddleware

api = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

api.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


profiles = {
    "foo": {
        "email": "foo@gmail.com",
        "email_verified": True,
        "family_name": "Quux",
        "given_name": "Foo",
        "locale": "en",
        "name": "Foo B. Quux",
        "nickname": "foo",
        "picture": "https://lh3.googleusercontent.com/a-/AOh14Ghc6NkbgvMUQN2S6W6H6GTWUMlETXurE7xXctM3jw=s96-c",
        "sub": "google-oauth2|111111111111111111111",
        "updated_at": "2021-03-05T20:48:23.626Z",
    },
    "bar": {
        "email": "bar@gmail.com",
        "email_verified": True,
        "family_name": "Quux",
        "given_name": "Bar",
        "locale": "en",
        "name": "Bar Bat Quux",
        "nickname": "bar",
        "picture": "https://lh3.googleusercontent.com/a-/AOh14Ghc6NkbgvMUQN2S6W6H6GTWUMlETXurE7xXctM3jw=s96-c",
        "sub": "google-oauth2|111111111111111111112",
        "updated_at": "2021-03-04T20:48:23.626Z",
    },
}

@api.get("/")
def root():
    return {
        "message": "hello world"
    }


@api.get("/profile/{username}")
def profile(username):
    if username in profiles:
        return profiles[username]
    else:
        raise HTTPException(status_code=404, detail=f"User \"{username}\" not found")


JSONObject = Dict[str, Any]


@api.put("/login")
def login(user: JSONObject, response: Response):
    """
    Receive payload from Auth0. Create a new user or update existing user.
    """
    username = user.get('username') or user.get('nickname')

    new_user = username not in profiles
    if new_user:
        user["created_at"] = dt.datetime.now()
        response.status_code = status.HTTP_201_CREATED

    user["new_user"] = new_user
    user["previously_last_seen_at"] = user.get("last_seen_at")
    user["last_seen_at"] = dt.datetime.now()
    profiles[username] = user
    return user
