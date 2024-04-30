from flask_restful import Resource
from flask import request, session

from config import db, api
from models.models import Trip, User

class Trips(Resource):
    def get(self):
        trips = Trip.query.all()
        trips_dict = [trip.to_dict() for trip in trips]
        return trips_dict, 200

api.add_resource(Trips, '/api/trips')

class TripById(Resource):
    def get(self, id):
        trip = Trip.query.filter_by(id=id).first()
        if trip:
            return trip.to_dict(), 200
        else:
            return {}, 404
    
    def patch(self, id):
        trip = Trip.query.filter_by(id=id).first()
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            if trip in user.trips:
                data = request.get_json()
                for attr in data:
                    setattr(trip, attr, data.get(attr))
                db.session.add(trip)
                db.session.commit()
                return trip.to_dict(), 200
        else:
            return {"error" : "Not Authorized"}, 401
    
api.add_resource(TripById, "/api/trips/<int:id>")