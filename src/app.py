"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User, Beer, Category, ILikeIt, Vote, Comment, Messages, UserDetail
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager
from flask_mail import Mail, Message
from api.generador_password import gen_pass
import random
import  bcrypt

#from models import Person

ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)

app.config['MAIL_SERVER']='smtp.mailtrap.io'
app.config['MAIL_PORT'] = 2525
app.config['MAIL_USERNAME'] = 'd5fc53f4f11596'
app.config['MAIL_PASSWORD'] = 'c1071a094cbec8'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response

##------------------------------------------------------------------------------##
##----------------------------FORGOT YOUR PASSWORD ?----------------------------##
##------------------------------------------------------------------------------##


#__________________________________POST EMAIL FOR PASSWORD__________________________________#

@app.route('/forgot' , methods=['POST'])
def forgot_password():
 
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
    msg = Message('Nueva contraseña', sender='beerclubenvio@gmail.com', recipients=[user_check_email])
    msg.body = "Tu nueva contraseña es" + ' ' + password_cambiada
    mail.send(msg)


  return jsonify("enviado"), 200

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
