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
                trip = Trip.query.filter_by(id = trip_id).first()
                user_id = user.id

                if recipient_email == user.email:
                    return {"error": "Unable to use your own email"}, 422
                elif not User.query.filter(User.email == recipient_email).first():
                    return {"error": "The user with the requested email does not have an account. Please first ask the user to create an account."}, 422
                elif recipient_email in [user.email for user in trip.users]:
                    return {"error": "The user with the requested email already has accessed to this trip."}, 422

                new_offer = Offer(recipient_email=recipient_email, status=status, trip_id=trip_id, user_id=user_id)

                db.session.add(new_offer)
                db.session.commit()

                return new_offer.to_dict(), 201
            except ValueError as err:
                return {"error" : str(err)}, 422
            
api.add_resource(Offers, '/api/offers')


class CheckMyOffers(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            offers = Offer.query.filter(Offer.recipient_email == user.email, Offer.status =="pending").all()
            offers_dict = [offer.to_dict() for offer in offers]
            return offers_dict, 200
        else:
            return {"error": "Not Authorized"}, 401
        
api.add_resource(CheckMyOffers, '/api/checkMyOffers')


class OfferById(Resource):
    def patch(self, id):
        offer = Offer.query.filter_by(id=id).first()
        if offer:
            try:
                data = request.get_json()
                for attr in data:
                    setattr(offer, attr, data.get(attr))

                    db.session.add(offer)
                    db.session.commit()
                    return offer.to_dict(), 200
            except ValueError as err:
                return {"error" : str(err)}, 422

api.add_resource(OfferById, '/api/offers/<int:id>')


