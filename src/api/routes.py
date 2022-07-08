"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Beer, Category, ILikeIt, Vote, Comment
from api.utils import generate_sitemap, APIException
import  bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

# generador = Bcrypt() // de la libreria Flask_bcrypt NO ES IGUAL que bcrypt

##------------------------------------------------------------------------##
##-------------------------------TABLE USER-------------------------------##
##------------------------------------------------------------------------##


##--------------------------------------------------------------------------##
##-------------------------------FRONT SIGNUP-------------------------------##
##--------------------------------------------------------------------------##

    #___________________________CREATE USER___________________________#

@api.route('/signup', methods=['POST'])
def add_Signup():
   
    body = request.get_json()

    user_check_email = User.query.filter_by(email=body['email']).first()
    if user_check_email != None:
        # raise APIException('Ya existe este email')
        return jsonify("Ya existe este email"), 402
    
    user_check_nickname = User.query.filter_by(nickname=body['nickname']).first()
    if user_check_nickname != None:
        # raise APIException('Ya existe este nickname')
        return jsonify("Ya existe este nickname"), 403
    
    # la funcion checkpw usa BYTES no STRINGS por eso hay que hacer enconde !!!!!!!
    user_password = request.json.get('password')
    hashed = bcrypt.hashpw(user_password.encode('utf-8'), bcrypt.gensalt())
    
    
    # hashed = generador.generate_password_hash(request.json.get('password')) // de flask_bcrypt -> no usar

    user = User(nickname=body["nickname"],name=body["name"],surnames=body["surnames"],email=body["email"],password=hashed.decode('utf-8'),is_active=True)
    
    data = {
        'email': user.email,
        'nickname': user.nickname,
        'name': user.name,
        'surname': user.surnames
    }
    token = create_access_token(identity=data)
    db.session.commit()


    db.session.add(user)
    db.session.commit()

    return jsonify(token),201



##--------------------------------------------------------------------------##
##-------------------------------FRONT LOGIN-------------------------------##
##--------------------------------------------------------------------------##

    #___________________________POST USER___________________________#

@api.route('/login' , methods=['POST']) 
def login_user():
    # users = User.query.all()
    # all_users = list(map(lambda users: users.serialize(),users))

    body = request.get_json()
    user_check_email = body['email'] 
    user_check_password = body['password']
    
    user = User.query.filter_by(email=user_check_email).first()

    if user is None:
        raise APIException('Usuario no encontrado /routes login l 72')

    # la funcion checkpw usa BYTES no STRINGS por eso hay que hacer enconde !!!!!!!
    passwordCheck = bcrypt.checkpw(user_check_password.encode('utf-8'), user.password.encode('utf-8'))
    print('esto es passwordCheck', passwordCheck)
    if passwordCheck is False:
        raise APIException('Clave incorrecta /routes login l 74')
    # user_check_email = User.query.filter_by(email=body['email']).first()
    # if user_check_password == password and user_check_email == email:
    # db.session.commit()

    data = {
        'email': user.email,
        'nickname': user.nickname,
        'name': user.name,
        'surname': user.surnames
    }

    token = create_access_token(identity=data)
    db.session.commit()
    return jsonify(token)

    return jsonify(data), 200

##--------------------------------------------------------------------------##
##--------------------------FORGOT YOUR PASSWORD ?--------------------------##
##--------------------------------------------------------------------------##

    #___________________________POST EMAIL FOR PASSWORD___________________________#

@api.route('/password' , methods=['POST']) 
def forgot_password():
    # users = User.query.all()
    # all_users = list(map(lambda users: users.serialize(),users))

    body = request.get_json()

    user_check_email = body['email'] 

    user = User.query.filter_by(email=user_check_email).first()

    if user.email != user_check_email:
        raise APIException('Usuario no encontrado1')
        

        return jsonify("enviado"), 200

        #___________________________UPDATE USER___________________________#

@api.route('/users/<int:id>' , methods=['PUT'])
def update_user(id):
            
            user = User.query.get(id)
        
            body = request.get_json()

            if "nickname" in body:
                user.nickname = body["nickname"]
            elif "name" in body:
                user.name = body["name"]
            elif "surnames" in body:
                user.surnames = body["surnames"]
            elif "email" in body:
                user.email = body["email"]

            db.session.commit()

            return jsonify(user.serialize())

        #___________________________DELETE USER___________________________#

@api.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):

    user = User.query.get(id)
    if id is None:
        raise APIException("USER DELETE", 201)
    db.session.delete(user)
    db.session.commit()

    return jsonify(user.serialize())

    ##------------------------------------------------------------------------##
    ##-------------------------------TABLE BEER-------------------------------##
    ##------------------------------------------------------------------------##

    #___________________________CREATE BEER___________________________#

@api.route('/createbeer', methods=['POST'])
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

@api.route('/beers/<int:id>' , methods=['PUT'])
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

        #___________________________DELETE BEER___________________________#

@api.route('/beers/<int:id>', methods=['DELETE'])
def delete_beer(id):

    beer = Beer.query.get(id)
    if id is None:
        raise APIException("BEER DELETE", 201)
    db.session.delete(beer)
    db.session.commit()

    return jsonify(beer.serialize())

    #____________LIST BEER____________#

@api.route('/beers' , methods=['GET']) 
def list_beer():
    beers = Beer.query.all()
    all_beers = list(map(lambda beers: beers.serialize(),beers))
    return jsonify(all_beers)

@api.route('/users' , methods=['GET']) 
def list_user():
    users = User.query.all()
    all_users = list(map(lambda users: users.serialize(),users))
    return jsonify(all_users)

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
