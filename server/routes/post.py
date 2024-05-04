from flask_restful import Resource
from flask import request, session
from sqlalchemy import desc
from sqlalchemy.exc import IntegrityError

from config import db, api
from models.models import Post, User

class Posts(Resource):
    def get(self):
        posts = Post.query.order_by(desc(Post.post_date)).all()
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
        
class PostById(Resource):
    def get(self, id):
        post = Post.query.filter_by(id=id).first()
        if post:
            return post.to_dict(), 200
        else:
            return {}, 404
        
    def delete(self, id):
        user = User.query.filter(User.id == session.get('user_id')).first()
        post = Post.query.filter_by(id=id).first()
        if post:
            if post.user == user:
                db.session.delete(post)
                db.session.commit()
                return {}, 204
            else:
                return {"error" : "Not Authorized"}, 401
        else:
            return {}, 404
        
    def patch(self, id):
        user = User.query.filter(User.id == session.get('user_id')).first()
        post = Post.query.filter_by(id=id).first()
        if post:
            if post.user == user:
                try:
                    data = request.get_json()
                    for attr in data:
                        setattr(post, attr, data.get(attr))
                    
                    db.session.add(post)
                    db.session.commit()
                    return post.to_dict(), 200
                except ValueError:
                    return {"error": "Feeling Score must be between 0 and 10"}, 422
                except IntegrityError:
                    return {"error": "Title is required"}, 422

        
api.add_resource(Posts, '/api/posts')
api.add_resource(PostById, '/api/posts/<int:id>')
