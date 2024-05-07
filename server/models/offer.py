from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.sql import func

from config import db

class Offer(db.Model, SerializerMixin):
    __tablename__ = "offers"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    trip_id = db.Column(db.Integer, db.ForeignKey('trips.id'))
    recipient_email = db.Column(db.String, nullable=False)
    status = db.Column(db.String)

    user = db.relationship('User', back_populates='offers')
    trip = db.relationship('Trip', back_populates='offers')

    serialize_rules=('-user.offers', '-trip.offers')

    def __repr__(self):
        return f'<Offer {self.id} {self.recipient_email}>'
    
    @validates("recipient_email")
    def check_recipient_email(self, key, recipient_email):
        if '@' not in recipient_email:
            raise ValueError("Not a valid email")
        return recipient_email
    
    @validates("status")
    def check_status(self, key, status):
        status_list = ["pending", "accepted", "declined"]
        if status not in status_list:
            raise ValueError("Status must be pending, accepted or declined")
        return status