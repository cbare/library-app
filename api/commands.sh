## setup virtual env
python3 -m venv ./venv
. venv/bin/activate
pip3 install -r requirements.txt

## start api
uvicorn api:api --reload

## test api manually
http localhost:8000/
http localhost:8000/profile/foo

