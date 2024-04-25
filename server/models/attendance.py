from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from config import db

class Attendance(db.Model, SerializerMixin):
    __tablename__ = 'attendances'
    id = db.Column(db.Integer, primary_key = True)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    trip_id = db.Column(db.Integer, db.ForeignKey('trips.id'))

    user = db.relationship('User', back_populates='attendances')
    trip = db.relationship('Trip', back_populates='attendances')

    serialize_rules=('-user.attendances', '-trip.attendances')

    def __repr__(self):
        return f'<Attendance {self.id} on {self.start_date}/>'
    
    @validates("start_date")
    def check_start_date(self, key, start_date):
        if not start_date:
            raise ValueError("Start Date must be included")
        return start_date