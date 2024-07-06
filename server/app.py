from config import app
from flask import render_template
from models.models import *
from routes.routes import *

@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")

if __name__ == "__main__":
  app.run(port=5555, debug=True)
