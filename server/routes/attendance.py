
from flask_restful import Resource
from flask import request, session

from config import db, api
from models.models import Attendance

class Attendances(Resource):
    def get(self):
        attendances = Attendance.query.all()
        attendances_dict = [attendance.to_dict(rules=('-trip.posts', '-user.posts')) for attendance in attendances]
        return attendances_dict, 200
    
api.add_resource(Attendances, '/api/attendances')