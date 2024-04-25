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

    print("Creating trips ...")

    trip1 = Trip(country="Japan", city_state="Tokyo", vacation_type="Sightseeing", public=True)

    trip2 = Trip(country="USA", city_state="Los Angeles", vacation_type="Family")

    trip3 = Trip(country="Iceland", vacation_type="Adventure")

    trips = [trip1, trip2, trip3]

    db.session.add_all(trips)

    db.session.commit()



