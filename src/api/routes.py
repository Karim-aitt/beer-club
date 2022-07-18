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


#__________________________________LIST USER__________________________________#

@api.route('/users' , methods=['GET']) 
def list_user():
    users = User.query.all()
    all_users = list(map(lambda users: users.serialize(),users))
    return jsonify(all_users)


##--------------------------------------------------------------------------##
##-------------------------------FRONT SIGNUP-------------------------------##
##--------------------------------------------------------------------------##


#__________________________________CREATE USER__________________________________#

@api.route('/signup', methods=['POST'])
def add_Signup():
   
    body = request.get_json()
    user_check_email = User.query.filter_by(email=body['email']).first()

    if user_check_email != None:
        return jsonify("Ya existe este email"), 402
    
    user_check_nickname = User.query.filter_by(nickname=body['nickname']).first()

    if user_check_nickname != None:
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
        'surname': user.surnames,
        'id': user.id
    }

    token = create_access_token(identity=data)
    db.session.commit()

    db.session.add(user)
    db.session.commit()
    return jsonify(token),201


##--------------------------------------------------------------------------##
##-------------------------------FRONT LOGIN -------------------------------##
##--------------------------------------------------------------------------##

#__________________________________POST USER__________________________________#

@api.route('/login' , methods=['POST']) 
def login_user():

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

    data = {
        "id": user.id,
        'email': user.email,
        'nickname': user.nickname,
        'name': user.name,
        'surname': user.surnames
    }

    token = create_access_token(identity=data)
    return jsonify(token), 200


##------------------------------------------------------------------------------##
##----------------------------FORGOT YOUR PASSWORD ?----------------------------##
##------------------------------------------------------------------------------##


#__________________________________POST EMAIL FOR PASSWORD__________________________________#

@api.route('/password' , methods=['POST']) 
def forgot_password():
    body = request.get_json()
    user_check_email = body['email'] 
    user = User.query.filter_by(email=user_check_email).first()
    
    if user is None and user != user_check_email:
        raise APIException('Email no encontrado')
 
    return jsonify("enviado"), 200


##--------------------------------------------------------------------------##
##----------------------------FRONT PAGE PROFILE----------------------------##
##--------------------------------------------------------------------------##


#__________________________________UPDATE USER__________________________________#

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

#__________________________________DELETE USER__________________________________#

@api.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)

    if id is None:
        raise APIException("USER DELETE", 201)
    
    db.session.delete(user)
    db.session.commit()
    return jsonify(user.serialize())



    # body = request.get_json()
    # user_check_email = User.query.filter_by(email=body['email']).first()

    # if user_check_email != None:
    #     return jsonify("Ya existe este email"), 402

##----------------------------------------------------------------------------##
##---------------------------------TABLE BEER---------------------------------##
##----------------------------------------------------------------------------##


#__________________________________LIST BEER__________________________________#

@api.route('/beers' , methods=['GET']) 
def list_beer():

    beers = Beer.query.all()
    all_beers = list(map(lambda beers: beers.serialize(),beers))
    return jsonify(all_beers)

#__________________________________LIST BEERS IN CATEGORY__________________________________#

@api.route('/beers/<int:id>' , methods=['GET'])
def list_beers_category(id):

        beers = Beer.query.filter_by(category_id=id)
        all_beers_category = list(map(lambda beers: beers.serialize(), beers))
        return jsonify(all_beers_category)

#__________________________________CREATE BEER__________________________________#

@api.route('/beers', methods=['POST'])
@jwt_required()
def add_Beer():

    dataUser = get_jwt_identity()
    body = request.get_json()
    print(body)
    beer_check_name = Beer.query.filter_by(name=body['name']).first()
    if beer_check_name != None:
        raise APIException('Ya existe este nombre de cerveza')
    # print("esto es body------------------------------", body['category'])
    # print(f'user={(dataUser["id"])}, category={int(body["category"])},image={body["image"]},name={body["name"]},smell={body["smell"]},source={body["source"]},alcohol={body["alcohol"]},company={body["company"]},description={body["description"]}')
    
    beer = Beer(user_id=dataUser["id"], category_id=int(body["category"]),image=body["image"],name=body["name"],smell=body["smell"],source=body["source"],alcohol=body["alcohol"],company=body["company"],description=body["description"])

    db.session.add(beer)
    db.session.commit()
    return jsonify("ok"), 201

#__________________________________UPDATE BEER__________________________________#

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

#__________________________________DELETE BEER__________________________________#

@api.route('/beers/<int:id>', methods=['DELETE'])
def delete_beer(id):

    beer = Beer.query.get(id)
    print(beer)
    return ""
    if id is None:
        raise APIException("BEER DELETE")
    db.session.delete(beer)
    db.session.commit()
    return jsonify(beer.serialize())


##--------------------------------------------------------------------------------##
##---------------------------------TABLE CATEGORY---------------------------------##
##--------------------------------------------------------------------------------##


#__________________________________CREATE CATEGORY__________________________________#

@api.route('/category' , methods=['POST'])
def create_category():

        body = request.get_json()

        category_check_name = Category.query.filter_by(name=body['name']).first()
        if category_check_name != None:
            return jsonify("Ya existe esta categoria"), 402

        category = Category(name=body["name"],image=body["image"],description=body["description"])

        db.session.add(category)
        db.session.commit()

        return jsonify("add"),201

#__________________________________LIST CATEGORY__________________________________#

@api.route('/category' , methods=['GET'])
def list_category():

        category = Category.query.all()
        all_category = list(map(lambda category: category.serialize(),category))
        return jsonify(all_category)

#__________________________________UPDATE CATEGORY__________________________________#

@api.route('/category/<int:id>' , methods=['PUT'])
def update_category(id):

    category = Category.query.get(id)
    body = request.get_json()

    if "name" in body:
        category.name = body["name"]
    elif "image" in body:
        category.image = body["image"]
    elif "description" in body:
        category.description = body["description"]

    db.session.commit()

    return jsonify(category.serialize())

#__________________________________DELETE CATEGORY__________________________________#

@api.route('/category/<int:id>' , methods=['DELETE'])
def delete_category(id):

    category = Category.query.get(id)

    if id is None:
        raise APIException("CATEGORY DELETE", 201)
    db.session.delete(category)
    db.session.commit()

    return jsonify(category.serialize())


##-----------------------------------------------------------------------------------##
##-----------------------------------TABLE COMMENT-----------------------------------##
##-----------------------------------------------------------------------------------##


#__________________________________LIST COMMENT BEER__________________________________#

@api.route('/comment' , methods=['GET'])
def list_comment():

    comment = Comment.query.all()
    all_comment = list(map(lambda comment: comment.serialize(),comment))

    return jsonify(all_comment)

#__________________________________CREATE COMMENT BEER__________________________________#

@api.route('/comment' , methods=['POST'])
def create_comment():

    body = request.get_json()
    comment = Comment(comment=body["comment"])

    db.session.add(comment)
    db.session.commit()

    return jsonify(comment.serialize()),201

#__________________________________UPDATE COMMENT BEER__________________________________#

@api.route('/comment/<int:id>' , methods=['PUT'])
def update_comment(id):

    comment = Comment.query.get(id)
    body = request.get_json()

    if "comment" in body:
        comment.comment = body["comment"]
    db.session.commit()

    return jsonify(comment.serialize())

#__________________________________DELETE COMMENT BEER__________________________________#

@api.route('/comment/<int:id>' , methods=['DELETE'])
def delete_comment(id):

    comment = Comment.query.get(id)

    if id is None:
        raise APIException("COMMENT DELETE", 201)

    db.session.delete(comment)
    db.session.commit()

    return jsonify(comment.serialize())


##------------------------------------------------------------------------------------##
##-----------------------------------TABLE FAVORITE-----------------------------------##
##------------------------------------------------------------------------------------##


#___________________________________LIST FAVORITE BEER___________________________________#

@api.route('/favorite' , methods=['GET'])
def list_favorite():

    favorite = ILikeIt.query.all()
    all_favorite = list(map(lambda favorite: favorite.serialize(),favorite))

    return jsonify(all_favorite)

#__________________________________CREATE FAVORITE BEER__________________________________#

@api.route('/favorite' , methods=['POST'])
def create_favorite():

    body = request.get_json()
    favorite = ILikeIt(user_id=body["user_id"],beer_id=body["beer_id"])

    db.session.add(favorite)
    db.session.commit()

    return jsonify(favorite.serialize()),201

#__________________________________UPDATE FAVORITE BEER__________________________________#

@api.route('/favorite/<int:id>' , methods=['PUT'])
def update_favorite(id):

    favorite = ILikeIt.query.get(id)
    body = request.get_json()

    if "favorite" in body:
        favorite.comment = body["favorite"]
    db.session.commit()

    return jsonify(favorite.serialize())

#__________________________________DELETE FAVORITE BEER__________________________________#

@api.route('/favorite/<int:id>' , methods=['DELETE'])
def delete_favorite(id):

    favorite = ILikeIt.query.get(id)

    if id is None:
        raise APIException("FAVORITE DELETE", 201)

    db.session.delete(favorite)
    db.session.commit()

    return jsonify(favorite.serialize())


##------------------------------------------------------------------------------------##
##-------------------------------------TABLE VOTE-------------------------------------##
##------------------------------------------------------------------------------------##


#___________________________________LIST USER VOTE BEER___________________________________#

@api.route('/vote' , methods=['GET'])
@jwt_required()

def list_vote():
    dataUser = get_jwt_identity()
    vote = Vote.query.filter_by(user_id=dataUser['id'])
    all_user_vote = list(map(lambda vote: vote.serialize(),vote))

    print("esto es all user", all_user_vote)
    return jsonify(all_user_vote)

@api.route('/votes' , methods=['GET'])
def list_votes():

    vote = Vote.query.all()
    all_vote = list(map(lambda vote: vote.serialize(),vote))

    return jsonify(all_vote)

#__________________________________CREATE VOTE BEER__________________________________#

@api.route('/vote' , methods=['POST'])
@jwt_required()
def create_vote():
    body = request.get_json()
    dataUser = get_jwt_identity()
    beer_check = Vote.query.filter_by(user_id=dataUser["id"], beer_id=int(body["beer_id"])).first()
    
    if beer_check is not None:
        print("esto es beer_check dentro del IF", beer_check)
        return jsonify(True), 202

    if beer_check is None:
        vote = Vote(punctuation=int(body["punctuation"]),beer_id=int(body['beer_id']), user_id=dataUser["id"])
        print(vote)
        db.session.add(vote)

    db.session.commit()
    return jsonify(vote.serialize()),201

#__________________________________UPDATE VOTE BEER__________________________________#

@api.route('/vote/<int:id>' , methods=['PUT'])
def update_vote(id):

    vote = Vote.query.get(id)
    body = request.get_json()

    if "vote" in body:
        vote.comment = body["vote"]
    db.session.commit()

    return jsonify(vote.serialize())

#__________________________________DELETE VOTE BEER__________________________________#

@api.route('/vote/<int:id>' , methods=['DELETE'])
def delete_vote(id):

    vote = Vote.query.get(id)

    if id is None:
        raise APIException("VOTE DELETE", 201)

    db.session.delete(vote)
    db.session.commit()

    return jsonify(vote.serialize())

#__________________________________TOKEN VALIDATION__________________________________#

@api.route('/validation', methods=['GET'])
@jwt_required()
def token_validation():
    return jsonify(True)