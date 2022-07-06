"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Beer, Category, ILikeIt, Vote, Comment
from api.utils import generate_sitemap, APIException
import  bcrypt
api = Blueprint('api', __name__)
##----------------TABLE USER----------------##

#____________CREATE USER____________#

@api.route('/signup', methods=['POST'])
def add_Signup():
   
    body = request.get_json()

    user_check_email = User.query.filter_by(email=body['email']).first()
    if user_check_email != None:
        raise APIException('Ya existe este email')
    
    user_check_nickname = User.query.filter_by(nickname=body['nickname']).first()
    if user_check_nickname != None:
        raise APIException('Ya existe este nickname')

    user = User(nickname=body["nickname"],name=body["name"],surnames=body["surnames"],email=body["email"],password=body["password"],is_active=True)
    

    db.session.add(user)
    db.session.commit()

    # data = {
    # 'email': user.email,
    # 'user_id': user.id
    # }
    # token = create_access_token(identity=data)
    # db.session.commit()
    # return jsonify(token)

    return jsonify("ok"), 201

##----------------TABLE BEER----------------##

#____________CREATE BEER____________#

@api.route('/beer', methods=['POST'])
def add_Beer():
   
    body = request.get_json()

    beer_check_name = Beer.query.filter_by(name=body['name']).first()
    if beer_check_name != None:
        raise APIException('Ya existe este nombre de cerveza')

    beer = Beer(image=body["image"],name=body["name"],smell=body["smell"],source=body["source"],alcohol=body["alcohol"],company=body["company"],description=body["description"])

    db.session.add(beer)
    db.session.commit()

    return jsonify("ok"), 201





#____________C____________#

@api.route('/login', methods=['GET'])
def Login():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
