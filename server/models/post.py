from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.sql import func

from config import db

class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    post_date = db.Column(db.DateTime, server_default=func.now())
    body = db.Column(db.String)
    photo = db.Column(db.String)
    feeling_score = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    trip_id = db.Column(db.Integer, db.ForeignKey('trips.id'))

    user = db.relationship('User', back_populates='posts')
    trip = db.relationship('Trip', back_populates='posts')

    serialize_rules=('-user.posts', '-trip.posts')

    def __repr__(self):
        return f'<Post {self.id} {self.title}>'
    
    @validates("feeling_score")
    def check_feeling_score(self, key, feeling_score):
        if feeling_score < 0 or feeling_score > 10:
            raise ValueError("Feeling Score must be between 0 and 10")
        return feeling_score
    
    ## need to validates that the user has an attendance to the trip
    # @validates("trip")
    # def check_trip(self, key, trip):
    #     print(self.user)
    #     print(trip)
    #     return trip
