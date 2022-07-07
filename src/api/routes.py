"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Beer, Category, ILikeIt, Vote, Comment
from api.utils import generate_sitemap, APIException
import  bcrypt
api = Blueprint('api', __name__)

##------------------------------------------------------------------------##
##-------------------------------TABLE USER-------------------------------##
##------------------------------------------------------------------------##

    #___________________________CREATE USER___________________________#

@api.route('/signup', methods=['POST'])
def add_Signup():
   
    body = request.get_json()
    user_check_email = User.query.filter_by(email=body['email']).first()
    if user_check_email != None:
        raise APIException('Ya existe este email')
    
    user_check_nickname = User.query.filter_by(nickname=body['nickname']).first()
    if user_check_nickname != None:
        raise APIException('Ya existe este nickname')

    hashed = bcrypt.hashpw(request.json.get('password').encode('utf-8'), bcrypt.gensalt())

    user = User(nickname=body["nickname"],name=body["name"],surnames=body["surnames"],email=body["email"],password=hashed,is_active=True)
    

    db.session.add(user)
    db.session.commit()

    return jsonify("ok"), 201

    # data = {
    # 'email': user.email,
    # 'user_id': user.id
    # }
    # token = create_access_token(identity=data)
    # db.session.commit()
    # return jsonify(token)

        #___________________________UPDATE BEER___________________________#

# @api.route('/beer/<int:id>' , methods=['PUT' , 'DELETE'])
# def update_beer(id):

#         user = User.query.get(id)
       
#         body = request.get_json()

#         if "image" in body:
#             beer.image = body["image"]
#         elif "name" in body:
#             beer.name = body["name"]
#         elif "smell" in body:
#             beer.smell = body["smell"]
#         elif "source" in body:
#             beer.source = body["source"]
#         elif "alcohol" in body:
#             beer.alcohol = body["alcohol"]
#         elif "company" in body:
#             beer.company = body["company"]
#         elif "description" in body:
#             beer.description = body["description"]

#         db.session.commit()

#         return jsonify(beer.serialize())


    ##------------------------------------------------------------------------##
    ##-------------------------------TABLE BEER-------------------------------##
    ##------------------------------------------------------------------------##

    #___________________________CREATE BEER___________________________#

@api.route('/beer', methods=['POST'])
def add_Beer():
   
    if request.method == 'POST':

        body = request.get_json()

        beer_check_name = Beer.query.filter_by(name=body['name']).first()

        if beer_check_name != None:
            raise APIException('Ya existe este nombre de cerveza')

        beer = Beer(image=body["image"],name=body["name"],smell=body["smell"],source=body["source"],alcohol=body["alcohol"],company=body["company"],description=body["description"])

        db.session.add(beer)
        db.session.commit()

        return jsonify("ok"), 201

    #___________________________UPDATE BEER___________________________#

@api.route('/beer/<int:id>' , methods=['PUT' , 'DELETE'])
def update_beer(id):

        beer = Beer.query.get(id)
       
        body = request.get_json()

        if "image" in body:
            beer.image = body["image"]
        elif "name" in body:
            beer.name = body["name"]
        elif "smell" in body:
            beer.smell = body["smell"]
        elif "source" in body:
            beer.source = body["source"]
        elif "alcohol" in body:
            beer.alcohol = body["alcohol"]
        elif "company" in body:
            beer.company = body["company"]
        elif "description" in body:
            beer.description = body["description"]

        db.session.commit()

        return jsonify(beer.serialize())

    #____________LIST BEER____________#

@api.route('/beers' , methods=['GET']) 
def list_beer():
    beers = Beer.query.all()
    all_beers = list(map(lambda beers: beers.serialize(),beers))
    return jsonify(all_beers)

    # elif request.method == 'GET':
    # task = Task.query.get(task_id)
    # if task is None:
    #         raise APIException("Tarea no encontrada", 404)

    # return jsonify(task.serialize())

#____________C____________#

# @api.route('/login', methods=['GET'])
# def Login():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200
