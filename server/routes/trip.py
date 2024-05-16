from flask_restful import Resource
from flask import request, session
import datetime

from config import db, api
from models.models import *

class Trips(Resource):
    def get(self):
        trips = Trip.query.all()
        trips_dict = [trip.to_dict() for trip in trips]
        return trips_dict, 200
    
    def post(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            try:
                data = request.get_json()
                country = data.get("country")
                city_state = data.get("city_state")
                vacation_type = data.get("vacation_type")
                # cover_image = data.get("cover_image")
                public = int(data.get("public") == 'true') 
                start_date = datetime.datetime.strptime(data.get("start_date"), '%Y-%m-%d')
                end_date = datetime.datetime.strptime(data.get("end_date"), '%Y-%m-%d')

                new_trip = Trip(country=country, city_state=city_state, vacation_type=vacation_type, public=public)
                db.session.add(new_trip)
                db.session.commit()

                new_attendance = Attendance(trip=new_trip, user=user, start_date=start_date, end_date=end_date)
                db.session.add(new_attendance)
                db.session.commit()

                return new_attendance.to_dict(), 201

            except ValueError as err:
                return {"error" : str(err)}, 422
            
        else:
            return {"error" : "Not Authorized"}, 401

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