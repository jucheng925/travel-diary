from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from config import db

class Trip(db.Model, SerializerMixin):
    __tablename__ = 'trips'
    id = db.Column(db.Integer, primary_key = True)
    country = db.Column(db.String)
    city_state = db.Column(db.String)
    vacation_type = db.Column(db.String)
    cover_image = db.Column(db.String)
    public = db.Column(db.Boolean)

    def __repr__(self):
        return f'<Trip {self.id} {self.country}>'
