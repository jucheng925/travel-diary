from flask_restful import Resource
from flask import request, session

from config import db, api
from models.models import Post, User

class Posts(Resource):
    def get(self):
        posts = Post.query.order_by('post_date').all()
        posts_dict = [post.to_dict() for post in posts]
        return posts_dict, 200
    
    def post(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            try:
                data = request.get_json()
                title = data.get("title")
                body = data.get("body")
                photo = data.get("photo")
                feeling_score = data.get("feeling_score")
                trip_id = data.get("trip_id")
                user_id = user.id

                new_post = Post(title=title, body=body, photo=photo, 
                                feeling_score=feeling_score, trip_id=trip_id, user_id=user_id)

                db.session.add(new_post)
                db.session.commit()

                return new_post.to_dict(), 201
            
            except ValueError:
                return {"error": "Feeling Score must be between 0 and 10"}
    
        else:
            return {"error" : "Not Authorized"}, 401
        
api.add_resource(Posts, '/api/posts')
