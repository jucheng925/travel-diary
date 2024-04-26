from flask_restful import Resource
from flask import request, session

from config import db, api
from models.models import Post

class Posts(Resource):
    def get(self):
        posts = Post.query.all()
        posts_dict = [post.to_dict(rules=('-user.attendances','-trip.attendances')) for post in posts]
        return posts_dict, 200
    
api.add_resource(Posts, '/api/posts')
