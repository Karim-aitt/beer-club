"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, Beer, Category, ILikeIt, Vote, Comment, Messages, UserDetail, Userevent, Yeseventpeople, Noeventpeople
from api.utils import generate_sitemap, APIException
import  bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from datetime import timedelta
delta = timedelta(
    days=50,
    seconds=27,
    microseconds=10,
    milliseconds=29000,
    minutes=5,
    hours=8,
    weeks=2
)
import cloudinary
import cloudinary.uploader
import cloudinary.api

api = Blueprint('api', __name__)

cloudinary.config( 
  cloud_name = "dztgp8g6w", 
  api_key = "158344581497744", 
  api_secret = "a5xb9RBMOpovJEOOranrRYLWAYw" 
)

# generador = Bcrypt() // de la libreria Flask_bcrypt NO ES IGUAL que bcrypt


@api.route('/hello' , methods=['GET']) 
def hello():
    return jsonify("hello, heroku")

##------------------------------------------------------------------------##
##-------------------------------TABLE USER-------------------------------##
##------------------------------------------------------------------------##


#__________________________________LIST USER__________________________________#
# Devuelve todos los usuarios
@api.route('/users' , methods=['GET']) 
def list_user():
    users = User.query.all()
    all_users = list(map(lambda users: users.serialize(),users))
    return jsonify(all_users)

#Devuelve el usuario con la id provista
@api.route('/users/<int:id>' , methods=['GET']) 
def get_user(id):
    user = User.query.get(id)
    return jsonify(user.serialize())


##--------------------------------------------------------------------------##
##-------------------------------FRONT SIGNUP-------------------------------##
##--------------------------------------------------------------------------##


#__________________________________CREATE USER__________________________________#
# Registra al usuario en la db y devuelve un token, actualmente no se usa este token.
@api.route('/signup', methods=['POST'])
def add_Signup():
    print(">>>>>>>>>> 1")
    body = request.get_json()
    user_check_email = User.query.filter_by(email=body['email']).first()
    print(">>>>>>>>>> 2")
    if user_check_email != None:
        return jsonify("Ya existe este email"), 402
    print(">>>>>>>>>> 3")
    user_check_nickname = User.query.filter_by(nickname=body['nickname']).first()
    print(">>>>>>>>>> 4")
    if user_check_nickname != None:
        return jsonify("Ya existe este nickname"), 403
    print(">>>>>>>>>> 5")
    # la funcion checkpw usa BYTES no STRINGS por eso hay que hacer enconde !!!!!!!
    user_password = request.json.get('password')
    hashed = bcrypt.hashpw(user_password.encode('utf-8'), bcrypt.gensalt())
    print(">>>>>>>>>> 6")
    # hashed = generador.generate_password_hash(request.json.get('password')) // de flask_bcrypt -> no usar
    user = User(nickname=body["nickname"],name=body["name"],surnames=body["surnames"],email=body["email"],password=hashed.decode('utf-8'),is_active=True)
    print(">>>>>>>>>> 7")
    data = {
        'email': user.email,
        'nickname': user.nickname,
        'name': user.name,
        'surname': user.surnames,
        'id': user.id
    }
    print(">>>>>>>>>> 8")
    token = create_access_token(identity=data, expires_delta=timedelta(minutes=120))
    
    db.session.add(user)
    db.session.commit()
    print(">>>>>>>>>> 9")
    return jsonify(token), 200


##--------------------------------------------------------------------------##
##-------------------------------FRONT LOGIN -------------------------------##
##--------------------------------------------------------------------------##

#__________________________________POST USER__________________________________#

# Busca el email en la db, si existe, comprueba la pass, devuelve un token.
@api.route('/login' , methods=['POST']) 
def login_user():

    body = request.get_json()
    user_check_email = body['email'] 
    user_check_password = body['password']
    
    user = User.query.filter_by(email=user_check_email).first()
    if user is None:
        raise APIException('Usuario no encontrado /routes login l 107')

    # la funcion checkpw usa BYTES no STRINGS por eso hay que hacer encode !!!!!!!
    passwordCheck = bcrypt.checkpw(user_check_password.encode('utf-8'), user.password.encode('utf-8'))
    print('esto es passwordCheck', passwordCheck)
    if passwordCheck is False:
        raise APIException('Clave incorrecta /routes login l 113')

    data = {
        "id": user.id,
        'email': user.email,
        'nickname': user.nickname,
        'name': user.name,
        'surname': user.surnames
    }

    token = create_access_token(identity=data, expires_delta=timedelta(minutes=120))
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

#__________________________________GET NICKNAME BY USER ID__________________________________#
# Consigue el nickname del usuario con la id provista
@api.route('/nickname/<int:id>', methods=['GET'])
def get_nickname(id):
    user = User.query.filter_by(id=id).first()
    print(user.nickname)
    nickname = user.nickname
    return jsonify(nickname),200

#__________________________________UPDATE USER__________________________________#
# Actualiza los datos del usuario de la id provista
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
# Borra al usuario con la id provista
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
# Devuelve todas las beers de la db
@api.route('/beers' , methods=['GET']) 
def list_beer():

    beers = Beer.query.all()
    all_beers = list(map(lambda beers: beers.serialize(),beers))
    return jsonify(all_beers)

# Busca la cerveza provista en search
@api.route('/beers/<search>', methods=['GET'])
def search_beer(search):
    palabra = search.lower()
    word = '%{}%'.format(palabra)

    beer = Beer.query.filter(Beer.name.like(word)).all()

    the_beer = list(map(lambda beer: beer.serialize(),beer))

    return jsonify(the_beer)

#__________________________________LIST BEERS IN CATEGORY__________________________________#

@api.route('/beers/<int:id>' , methods=['GET'])
def list_beers_category(id):

    beers = Beer.query.filter_by(category_id=id)
    all_beers_category = list(map(lambda beers: beers.serialize(), beers))
    return jsonify(all_beers_category)

# CERVEZAS DE LA USERPAGE
@api.route('/beers/user/<int:id>', methods=['GET'])
def user_beers(id):
    beers = Beer.query.filter_by(user_id=id)
    all_user_beers = list(map(lambda beers: beers.serialize(), beers))
    return jsonify(all_user_beers)
    
# CERVEZAS QUE LE GUSTAN AL USUARIO EN USERPAGE
@api.route('/beers/user/<int:id>/like', methods=['GET'])
def user_likes(id):
    beer = Vote.query.filter(Vote.user_id == id , Vote.punctuation >= 5)
    # Esto selecciona los votos del usuario X cuyo valor sean 5 o +
    all_beers = list(map(lambda beer: beer.serialize(),beer))
    return jsonify(all_beers),200

#__________________________________CREATE BEER__________________________________#


@api.route('/beers', methods=['POST'])
# @jwt_required()
def add_Beer():

    image_to_load = request.files["file"]
    if not image_to_load:
        return jsonify("imagen no existe")


    result = cloudinary.uploader.upload(image_to_load)
    print(result)
    url=result['url']
    print("esta es la url..................",url)

    # dataUser = get_jwt_identity()
    user_id=int(request.form["user_id"])
    category=int(request.form["category"])
    name=request.form["name"]
    smell=request.form["smell"]
    source=request.form["source"]
    alcohol=request.form["alcohol"]
    company=request.form["company"]
    description=request.form["description"]

    beer_check_name = Beer.query.filter_by(name=name).first()
    if beer_check_name != None:
        raise APIException('Ya existe este nombre de cerveza')
    beer = Beer(
        user_id=user_id, 
        category_id=category,
        name=name.lower(),
        image=url,
        smell=smell.lower(),
        source=source.lower(),
        alcohol=alcohol,
        company=company.lower(),
        description=description.lower(),
    )

    db.session.add(beer)
    db.session.commit()
    return jsonify("ok"), 201

#__________________________________UPDATE BEER__________________________________#

@api.route('/beers/update/<int:id>' , methods=['POST'])
def update_beer(id):

    beer = Beer.query.get(id)
    user_id = beer.user_id

    print(">>>>>>>>>>> 1")

    image_to_load = request.files["file"]
    if not image_to_load:
        return jsonify("imagen no existe")

    print(">>>>>>>>>>> 2")

    result = cloudinary.uploader.upload(image_to_load)
    url=result['url']

    print(">>>>>>>>>>> 3")
    category=int(request.form["category"])
    name=request.form["name"]
    smell=request.form["smell"]
    source=request.form["source"]
    alcohol=request.form["alcohol"]
    company=request.form["company"]
    description=request.form["description"]

    print(">>>>>>>>>>> 4")

    print(">>>>>>>>>>> 5")
    
    beer.user_id = user_id
    beer.category_id = category

    if name != beer.name: 
        beer.name = name.lower()
    else:
        beer.name = beer.name

    beer.image = url
    beer.smell = smell.lower()
    beer.source = source.lower()
    beer.alcohol = alcohol
    beer.company = company.lower()
    beer.description = description.lower()
    
    print(">>>>>>>>>>> 6")
    db.session.commit()
    
    print(">>>>>>>>>>> 7")
    return jsonify("ok"), 201
    
    # body = request.get_json()
    # if "image" in body:
    #     beer.image = body["image"]
    # elif "name" in body:
    #     beer.name = body["name"]
    # elif "smell" in body:
    #     beer.smell = body["smell"]
    # elif "source" in body:
    #     beer.source = body["source"]
    # elif "alcohol" in body:
    #     beer.alcohol = body["alcohol"]
    # elif "company" in body:
    #     beer.company = body["company"]
    # elif "description" in body:
    #     beer.description = body["description"]

    db.session.commit()

    return jsonify(beer.serialize())

#__________________________________DELETE BEER__________________________________#

@api.route('/beers/<int:id>', methods=['DELETE'])
def delete_beer(id):

    beer = Beer.query.get(id)
    votes = Vote.query.filter_by(beer_id=id).delete()
    comments = Comment.query.filter_by(beer_id=id).delete()
    

    if id is None:
        raise APIException("No existe esa beer")

    db.session.delete(beer)
    # db.session.delete(votes)
    # db.session.delete(comments)
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
    # task = Comment.query.filter_by(id=1).first()
    # return jsonify(task.serialize()), 200

    comment = Comment.query.all()
    all_comment = list(map(lambda comment: comment.serialize(), comment))

    return jsonify(all_comment), 200

@api.route('/comment/beer/<int:id>', methods=['GET'])
def get_comment_beer(id):
    comment = Comment.query.filter_by(beer_id=id)

    if comment is None:
        return APIException("No hay comentarios")

    if comment is not None:
        all_comments = list(map(lambda comment: comment.serialize(), comment))
        return jsonify(all_comments)

#__________________________________CREATE COMMENT BEER__________________________________#

@api.route('/comment' , methods=['POST'])
@jwt_required()
def create_comment():
    dataUser = get_jwt_identity()
    body = request.get_json()
    print("esto es body", body)
    comment = Comment(user_id=dataUser['id'], beer_id=int(body['beer_id']), comment=body['comment'])

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

#__________________________________GET VOTE BEER__________________________________#

@api.route('/vote/average/<int:beer_id>', methods=['GET'])
def get_average(beer_id):

    votes = Vote.query.filter_by(beer_id=beer_id).all()

    suma = 1
    for vote in votes:
        suma += vote.punctuation

    division = len(votes)
    if(division == 0):
        return jsonify(0)
    
    average = round(suma / division)
    response = average
    if average >= 6:
        response = 5

    return jsonify(response)        

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
    usuarioData = get_jwt_identity()
    user_id = usuarioData['id']
    return jsonify(user_id)


#__________________________________PRIVATE MESSAGES__________________________________#

@api.route('/mp', methods=['GET'])
@jwt_required()
def get_messages():

    usuarioData = get_jwt_identity()
    user_id = usuarioData['id']

    mp = Messages.query.filter_by(receiver_id=user_id).all()
    all_user_mp = list(map(lambda mp: mp.serialize(), mp))
    # print(">>>>>>>>>>>>>",all_user_mp)
    return jsonify(all_user_mp)


@api.route('/mp', methods=['POST'])
@jwt_required()
def post_message():
    print(">>>>>> 0")

    usuarioData = get_jwt_identity()
    s_id = usuarioData['id']

    print(">>>>>> 1")

    body = request.get_json()

    print(">>>>>> 2")
    print(">>>>>>>>>> body", body)
    
    # id1 = body["otra_id"]
    # id2 = body["id"]

    # if(id1 is not None):
    #     receiver_id=int(id1)
    # else:
    receiver_id=int(body["id"])
    sender_id=int(s_id)
    title_message=body["title"]
    message_text=body["message"]

    print(">>>>>> 3")

    m_post = Messages(
        sender_id= sender_id,
        receiver_id= receiver_id,
        title_message= title_message.lower(),
        message= message_text
    )

    print(">>>>>> 4")

    db.session.add(m_post)
    db.session.commit()

    print(">>>>>> 5")
    return jsonify("mensaje enviado")

@api.route('/mp', methods=['DELETE'])
@jwt_required()
def delete_message():

    body = request.get_json()
    mp = Messages.query.filter_by(id=body["id"]).first()
    # user_mp = list(map(lambda mp: mp.serialize(), mp))

    db.session.delete(mp)
    db.session.commit()
    return jsonify("ok")

@api.route('profile/update', methods=['POST'])
def update_profile():
    print(">>>>>>>>>> 1")

    user_id = request.form["user_id"]
    user_website = request.form["website"]
    user_description = request.form["user_description"]

    old_userdetail = UserDetail.query.filter_by(user_id=user_id).first()
    
    print(">>>>>>>>>> 2")

    image = request.files["file"]
    if image is not None:
        print(">>>>>>>>>> 2 inside if")
        result = cloudinary.uploader.upload(image)
        url=result['url']
    else:
        print(">>>>>>>>>> 2 inside ELSE")
        url = old_userdetail.user_image


    print(">>>>>>>>>> 3")
    
    user_detail = UserDetail(
        user_image=url, 
        website=user_website, 
        description=user_description,
        user_id=user_id
        )

    print(">>>>>>>>>> 4")
    if old_userdetail is not None:
        db.session.delete(old_userdetail)

    db.session.add(user_detail)
    db.session.commit()
    print(">>>>>>>>>> 5")
    return jsonify("ok")

@api.route('profile/<int:id>', methods=['GET'])
@jwt_required()
def get_profile(id):
    
    profile = UserDetail.query.filter_by(user_id=id).first()
    print(">>>>>>>>>>>>>>>>>>>", profile)
    return jsonify(profile.serialize())

##------------------------------------------------------------------------------##
##----------------------------FORGOT YOUR PASSWORD ?----------------------------##
##------------------------------------------------------------------------------##



@api.route('/forgot' , methods=['POST'])
def forgot_pass():
 
  print('hola.------------------------------1')
  body = request.get_json()
  user_check_email = body['email']
  print('hola.------------------------------2')
  user = User.query.filter_by(email=user_check_email).first()
  print(user)
  if user is None and user.email != user_check_email:
    print('hola.------------------------------3')
    # raise APIException('Email no encontrado')
    return ('email no encontrado en la base de datos')
  else:
    print('hola.------------------------------4')
    password_cambiada = gen_pass()
    hashed = bcrypt.hashpw(password_cambiada.encode('utf-8'), bcrypt.gensalt())
    print('hola.------------------------------5')
    new_user = User(
      id = user.id,
      nickname = user.nickname,
      name = user.name,
      surnames = user.surnames,
      email = user.email,
      password = hashed.decode('utf-8'),
      is_active = True,
    )
    print('hola.------------------------------6')
    db.session.delete(user)
    db.session.add(new_user)
    db.session.commit()
    print('hola.------------------------------7')

# Inicializacion de mail desde current_app 
    mail = Mail(current_app)  

    msg = Message('Nueva contraseña', 
    sender='beerclubenvio@gmail.com', 
    recipients=[user_check_email])

    msg.body = "Tu nueva contraseña es" + ' ' + password_cambiada
    mail.send(msg)


  return jsonify("enviado"), 200

@api.route('event', methods=['POST'])
@jwt_required()
def post_event():
    print(">>>>>>>>>>>>> 1")

    # get data form
    body = request.form
    print(body)
    print(">>>>>>>>>>>>> 2")

    # get user ID from token
    dataUser = get_jwt_identity()
    user_id=dataUser['id']
    print(">>>>>>>>>>>>> 3")

    # TESTSSSSSSSSSSSSSSSSSSSSSSS
    test = body["event_name"]
    print(">>>>>>>>>>>>>>>> TEST ", test)

    # getting image and uploading to cloudinary
    image = request.files["file"]
    if image is not None:
        print(">>>>>>>>>> image inside if")
        result = cloudinary.uploader.upload(image)
        url=result['url']
    else:
        url="Image not found"
    print(">>>>>>>>>>>>> 4")
    event = Userevent(
        id_user=user_id,
        event_name=body["event_name"],
        event_place=body["event_place"],
        event_date=body["event_date"],
        event_time=body["event_time"],
        event_image=url,
        event_description=body["event_description"]
    )
    print(">>>>>>>>>>>>> 5")
    db.session.add(event)
    db.session.commit()
    print(">>>>>>>>>>>>> 6")
    return jsonify("Event posted")

@api.route('event', methods=['GET'])
def get_events():

    events = Userevent.query.all()
    all_events = list(map(lambda events: events.serialize(),events))
    return jsonify(all_events)

@api.route('usereventyes', methods=['POST'])
@jwt_required()
def post_useryes():

    # get user ID from token
    dataUser = get_jwt_identity()
    user_id = dataUser['id']

    # get form data
    body = request.form
    event_id = body["event_id"]

    # Check if user has voted "no" in the event before
    user_exist = Noeventpeople.query.filter(Noeventpeople.id_user==user_id, Noeventpeople.id_event==event_id)
    if user_exist is not None:
        db.session.delete(user_exist)

    res = Yeseventpeople(id_user=user_id,id_event=event_id)
    db.session.add(res)
    db.session.commit()

    return jsonify("User assist")

@api.route('usereventno', methods=['POST'])
@jwt_required()
def post_userno():

    # get user ID from token
    dataUser = get_jwt_identity()
    user_id = dataUser['id']

    # get form data
    body = request.form
    event_id = body["event_id"]

    # Check if user has voted "yes" in the event before
    user_exist = Yeseventpeople.query.filter(Yeseventpeople.id_user==user_id, Yeseventpeople.id_event==event_id)
    if user_exist is not None:
        db.session.delete(user_exist)

    res = Noeventpeople(id_user=user_id,id_event=event_id)
    db.session.add(res)
    db.session.commit()

    return jsonify("User no assist")