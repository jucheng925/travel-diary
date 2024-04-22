from config import app, db, api
from models.models import *

if __name__ == "__main__":
  app.run(port=5555, debug=True)
