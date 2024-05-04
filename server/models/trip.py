from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db
from models.attendance import Attendance

class Trip(db.Model, SerializerMixin):
    __tablename__ = 'trips'
    id = db.Column(db.Integer, primary_key = True)
    country = db.Column(db.String, nullable=False)
    city_state = db.Column(db.String)
    vacation_type = db.Column(db.String)
    cover_image = db.Column(db.String)
    public = db.Column(db.Boolean, default=False)

    attendances = db.relationship('Attendance', back_populates='trip', cascade='all, delete-orphan')
    posts = db.relationship('Post', back_populates='trip', cascade='all, delete-orphan')
    users = association_proxy('attendances', 'user', creator=lambda user_obj: Attendance(user=user_obj))

    serialize_rules=('-attendances.trip', '-attendances.user.posts.trip', '-posts.user.attendances.trip', '-posts.trip')

    def __repr__(self):
        return f'<Trip {self.id} {self.country}>'
    
    
    @validates("vacation_type")
    def check_vacation_type(self, key, vacation_type):
        vacation_type_cat = ["Sightseeing", "Cruises", "Adventure", "Culinary", 
                         "Nature", "RoadTrip", "Family", "Friends"]
        if vacation_type not in vacation_type_cat:
            raise ValueError("Vacation type category must be one of the following listed")
        return vacation_type
    
    @validates("country")
    def check_country(self, key, country):
        if not country:
            raise ValueError("Country must be  included.")
        return country


