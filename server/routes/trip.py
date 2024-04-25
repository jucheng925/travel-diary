from flask_restful import Resource
from flask import request, session

from config import db, api
from models.models import Trip

class Trips(Resource):
    def get(self):
        trips = Trip.query.all()
        trips_dict = [trip.to_dict() for trip in trips]
        return trips_dict, 200
    
api.add_resource(Trips, '/api/trips')

class TripById(Resource):
    def get(self, id):
        trip = Trip.query.filter_by(id=id).first()
        return trip.to_dict(), 200
    
api.add_resource(TripById, "/api/trips/<int:id>")