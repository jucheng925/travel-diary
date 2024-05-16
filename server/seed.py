import datetime
from config import app, db

from models.models import *

if __name__ == "__main__":
  with app.app_context():
    
    print("Deleting all records ...")
    Offer.query.delete()
    Post.query.delete()
    Attendance.query.delete()
    Trip.query.delete()
    User.query.delete()

    print("Creating users ...")

    bob = User(username='bob', email="bob123@gmail.com", profile_pic="profile/cool-profile-pic_kqpbat")
    bob.password_hash = "test"

    susan = User(username='susan', email="susan123@gmail.com", profile_pic="profile/aiony-haust-3TLl_97HNJo-unsplash_pbm2cs")
    susan.password_hash = "test"

    kim = User(username='kim', email="kim234@gmail.com", profile_pic="profile/tyler_c8mxac") 
    kim.password_hash = "test"

    users = [bob, susan, kim]

    db.session.add_all(users)

    db.session.commit()

    print("Creating trips ...")

    trip1 = Trip(country="Japan", city_state="Tokyo", vacation_type="Sightseeing", public=True)

    trip2 = Trip(country="USA", city_state="Los Angeles", vacation_type="Family", cover_image="trip_cover/LA_Cover_page_z8zl3c")

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

    print("Creating posts ...")

    post1 = Post(title="Test post", body="This is my first post", user=bob, trip=trip1, feeling_score=2)
    post2 = Post(title="First Visit", body="First Vacation and then we saw the hollywood sign", user=bob, trip=trip2, feeling_score=5)
    post3 = Post(title="What a view", body="This is my first post", user=kim, trip=trip3, feeling_score=2)
    post4 = Post(title="Favorite Place", body="Today, I found my favorite place on this trip", user=bob, trip=trip1, feeling_score=4)
    post5 = Post(title="Ice cream", body="YUM YUM, icecream", user=kim, trip=trip3, feeling_score=1)


    db.session.add_all([post1, post2, post3, post4, post5])

    db.session.commit()

    print("Creating offers ...")

    offer1 = Offer(user=bob, trip=trip1, recipient_email="kim234@gmail.com", status="pending")

    db.session.add(offer1)
    db.session.commit()







