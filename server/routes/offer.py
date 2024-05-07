from flask_restful import Resource
from flask import request, session

from config import db, api
from models.models import *

class Offers(Resource):
    def post(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            try:
                data = request.get_json()
                recipient_email = data.get("recipient_email")
                status = data.get("status")
                trip_id = data.get("trip_id")
                user_id = user.id

                new_offer = Offer(recipient_email=recipient_email, status=status, trip_id=trip_id, user_id=user_id)

                db.session.add(new_offer)
                db.session.commit()

                return new_offer.to_dict(), 201
            except ValueError as err:
                return {"error" : str(err)}, 422
            
api.add_resource(Offers, '/api/offers')

