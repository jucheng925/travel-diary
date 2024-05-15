from flask_restful import Resource
from flask import request, session
from sqlalchemy.exc import IntegrityError

from config import db, api
from models.models import User, Trip

class Signup(Resource):
  def post(self):
    try:
        data = request.get_json()
        
        username = data.get('username')
        email = data.get('email')

        user = User(username=username, email=email)
        user.password_hash = data.get('password')

        db.session.add(user)
        db.session.commit()
        session["user_id"] = user.id

        return user.to_dict(), 201
    
    except IntegrityError:
       return {"error": "Username already exists"}, 422
    except ValueError as err:
       return {"error" : str(err)}, 422
       
    
class CheckSession(Resource):
   def get(self):
      user = User.query.filter(User.id == session.get('user_id')).first()
      if user:
         return user.to_dict(), 200
      else:
         return {"error" : "Not Authorized"}, 401

class Login(Resource):
   def post(self):
      data = request.get_json()
      username = data.get("username")
      password = data.get("password")
      user = User.query.filter(User.username == username).first()
      if user and user.authenticate(password):
         session["user_id"] = user.id
         return user.to_dict(), 200
      else:
         return {"error": "Incorrect username or password"}, 422
      
class Logout(Resource):
   def delete(self):
      session["user_id"] = None
      return {"error": "Log out"}, 204
   
class UpdateCurrentUser(Resource):
   def patch(self):
      user = User.query.filter(User.id == session.get('user_id')).first()
      if user:
         try:
            data = request.get_json()
            for attr in data:
               setattr(user, attr, data.get(attr))
            db.session.add(user)
            db.session.commit()
            return user.to_dict(), 200 
         except IntegrityError:
            return {"error": "Username already exists"}, 422

      else:
         return {"error" : "Not Authorized. Please log in"}, 401



api.add_resource(UpdateCurrentUser, '/api/updatecurrentuser')
api.add_resource(Signup, '/api/signup')
api.add_resource(CheckSession, '/api/check_session')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')

class usersAttendTrip(Resource):
   def get(self, tripid):
      trip = Trip.query.filter_by(id = tripid).first()
      if trip.public: 
         users = trip.users
         users_dict = [user.to_dict() for user in users]
         return users_dict, 200
      else:
         return {"error": "This is a private trip"}, 401

api.add_resource(usersAttendTrip, '/api/usersattendtrip/<int:tripid>')