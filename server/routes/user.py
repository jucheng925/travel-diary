from flask_restful import Resource
from flask import request, session
from sqlalchemy.exc import IntegrityError

from config import db, api
from models.models import *

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
    
    except IntegrityError as err:
       return {"error": f'{err.orig}'}, 422
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


api.add_resource(Signup, '/api/signup')
api.add_resource(CheckSession, '/api/check_session')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')