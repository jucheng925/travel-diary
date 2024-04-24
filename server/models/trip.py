from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
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

    attendances = db.relationship('Attendance', back_populates='trip', cascade='all, delete-orphan')
    posts = db.relationship('Post', back_populates='trip', cascade='all, delete-orphan')
    users = association_proxy('attendances', 'users')

    serialize_rules=('-attendances.trip', '-posts.trip')

    def __repr__(self):
        return f'<Trip {self.id} {self.country}>'
