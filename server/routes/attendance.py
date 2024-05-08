
from flask_restful import Resource
from flask import request, session
import datetime

from config import db, api
from models.models import Attendance, User

class Attendances(Resource):
    def get(self):
        attendances = Attendance.query.all()
        attendances_dict = [attendance.to_dict() for attendance in attendances]
        return attendances_dict, 200
    

    def post(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            try:
                data = request.get_json()
                start_date = datetime.datetime.strptime(data.get("start_date"), '%Y-%m-%d')
                end_date = datetime.datetime.strptime(data.get("end_date"), '%Y-%m-%d')
                trip_id = data.get("trip_id")
                # user_id = user.id

                new_attendance = Attendance(start_date=start_date, end_date=end_date, trip_id=trip_id, user=user)
                db.session.add(new_attendance)
                db.session.commit()

                return new_attendance.to_dict(), 201
            except ValueError as err:
                return {"error" : str(err)}, 422
            

    
api.add_resource(Attendances, '/api/attendances')