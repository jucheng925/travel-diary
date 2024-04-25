import datetime
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

    print("Creating attendances ...")

    bob_trip1 = Attendance(user=bob, trip=trip1, start_date=datetime.date(2024, 2, 11), end_date=datetime.date(2024, 3, 11))

    susan_trip1 = Attendance(user=susan, trip=trip1, start_date=datetime.date(2024, 2, 11), end_date=datetime.date(2024, 3, 11))

    bob_trip2 = Attendance(user=bob, trip=trip2, start_date=datetime.date(2023, 12, 2), end_date=datetime.date(2023, 12, 11))

    kim_trip2 = Attendance(user=kim, trip=trip2, start_date=datetime.date(2023, 12, 2), end_date=datetime.date(2023, 12, 11))

    kim_trip3 = Attendance(user=kim, trip=trip3, start_date=datetime.date(2021, 7, 29), end_date=datetime.date(2021, 8, 11))

    attendances=[bob_trip1, susan_trip1, bob_trip2, kim_trip2, kim_trip3]

    db.session.add_all(attendances)

    db.session.commit()




