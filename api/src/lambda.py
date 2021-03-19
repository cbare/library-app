from mangum import Mangum
from api import api

# to make it work with Amazon Lambda, we create a handler object
handler = Mangum(app=api)
