from config import app, db

from models.models import *

if __name__ == "__main__":
  with app.app_context():
    
    print("Deleting all records ...")
    Post.query.delete()
    Attendance.query.delete()
    Trip.query.delete()
    User.query.delete()

    print("Creating users ...")

    bob = User(username='bob', email="bob123@gmail.com")
    bob.password_hash = "test"

    susan = User(username='susan', email="susan123@gmail.com")
    susan.password_hash = "test"

    kim = User(username='kim', email="kim234@gmail.com") 
    kim.password_hash = "test"

    users = [bob, susan, kim]

    db.session.add_all(users)

    db.session.commit()

