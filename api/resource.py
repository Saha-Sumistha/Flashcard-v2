from flask_login import login_required
from flask_restful import Api, Resource,abort, fields, marshal
from flask_security import auth_required, current_user
from models import db, User as user_model,Deck as deck_model, Card as card_model

from flask_security.utils import *

from flask_restful import Api, Resource, abort, marshal_with
from parser import *
from fields import *
api = Api()



class User(Resource):

    @marshal_with(user_resource_fields)
    def post(self, id=None):
        if id:
            abort(400, messagge='user id not required')
        else:
            args = req_user_args.parse_args()
            user_check = user_model.query.filter_by(
                email=args['email']).first()
            if user_check:
                abort(401, message="User already exist...")
            user = user_model(
                email=args['email'], f_name=args['f_name'], l_name=args['l_name'], password=hash_password(args['password']))
            db.session.add(user)
            db.session.commit()
            return user, 203
    
    def get(self, id=None):
        results = user_model.query.filter_by(id=id).first()
        if results :
            return {"f_name":results.f_name,"l_name":results.l_name,"email":results.email,"password":results.password}
        else:
            abort(400, message="User id does not exist...")

    def delete(self, id=None):
        if id:
            results = user_model.query.filter_by(id=id).first()
            if results:
                db.session.delete(results)
                db.session.commit()
            else:
                abort(404, message="user id does not exist...")
            return "User deleted", 200
        else:
            abort(405, message="User id required")
        


class Deck(Resource):

    @marshal_with(deck_resource_fields)
    def post(self,user_id=None,tt=None):
        # if not id:
            args = req_deck_args.parse_args()
            deck_check = deck_model.query.filter_by(
                title=args["title"],user_id=user_id).first()
            if deck_check:
                abort(409, message="Deck already exist.")
            dkk = deck_model(title=args['title'],
                            user_id=user_id)
            db.session.add(dkk)
            db.session.commit()
            return dkk, 201

    @marshal_with(deck_resource_fields)
    def get(self,user_id=None,tt=None  ):
        
        result = deck_model.query.filter_by(user_id=user_id).all()
        if result:
            print(result)
         
            return result
           
        else:
           
            abort(404, message="Deck id does not exist...")
     

    def put(self, user_id,title=None):
        
        if title:
            args = req_deck_args.parse_args()
            results = deck_model.query.filter_by(title=title,user_id=user_id)
            
            if not results.first():
                abort(404, message="Deck id does not exist...")
            current_course_code = results.all().title
            if args['title'] != current_course_code:
                course_check = deck_model.query.filter_by(
                title=args['title'],user_id=user_id).first()
                if course_check:
                    abort(409, message="Deck name already exist...")

            results.update(args)
            db.session.commit()
            return '', 200
        else:
            abort(400, message="Deck_id required...")
    
    def delete(self,user_id=None):

        if id:
            args = req_deck_args.parse_args()
            results = deck_model.query.filter_by(title=args["title"],user_id=user_id).first()
            if results:
                db.session.delete(results)
                db.session.commit()
            else:
                abort(404, message="Id does not exist.")
            return '', 200
        else:
            abort(400, message="Id required.")




class Card(Resource):
    @marshal_with(card_resource_fields)
    def get(self, deck_id):
   
        if deck_id:
            results = card_model.query.filter_by(deck_id=deck_id).all()
            if results:
                return results, 200
            else:
                abort(404, message="Enrollment does not exist...")
        else:
            abort(400, message="User Id required")

    @marshal_with(card_resource_fields)
    def post(self, deck_id):
        if deck_id:
            enroll_data = req_card_args.parse_args()
           

            student = deck_model.query.get(deck_id)
            if student:
                enrollment = card_model(deck_id=deck_id,front=enroll_data['front'],back=enroll_data['back'])
                db.session.add(enrollment)
                db.session.commit()
                return enrollment, 201
        else:
            abort(400, message="User_id  and deck_id required")

    def delete(self, deck_id, card_id):
        if deck_id and card_id:
            enroll = card_model.query.filter((card_model.deck_id == deck_id) & (
                card_model.card_id == card_id)).first()
            if enroll:
                db.session.delete(enroll)
                db.session.commit()
                return "Enrollment deleted", 200
            else:
                abort(404, message="Enrollment does not exist...")
        else:
            abort(400, message="User_id and deck id required")

api.add_resource(User, "/api/user/<int:id>", "/api/user")
api.add_resource(Deck, "/api/courses/<int:user_id>/<string:tt>", "/api/courses/<int:user_id>")
api.add_resource(Card, "/api/student/<int:user_id>/course", "/api/student/<int:user_id>/course/<int:deck_id>")


