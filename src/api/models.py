from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__="user"
    id = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String, unique=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    surnames = db.Column(db.String, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    # password_encriptada = db.Column(db.Numeric, nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "nickname": self.nickname,
            "name": self.name,
            "surnames": self.surnames,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class UserDetail(db.Model):
    __tablename__="userdetail"
    id_detail = db.Column(db.Integer, primary_key=True)
    user_image = db.Column(db.String(120))
    website = db.Column(db.String(250))
    description = db.Column (db.String(250))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User')

    def __repr__(self):
        return f'<UserDetail {self.user}>'

    def serialize(self):
        return {
            "user_image": self.user_image,
            "website": self.website,
            "description": self.description,
            "user_id": self.user_id,
        }

class Category(db.Model):
    __tablename__="category"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    image = db.Column(db.String, nullable=False)
    description = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<Category {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "image": self.image,
            "description": self.description,
        }
class Beer(db.Model):
    __tablename__="beer"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    image = db.Column(db.String(120))
    name = db.Column(db.String(80), unique=True)
    smell = db.Column(db.String(80))
    source = db.Column(db.String(80))
    alcohol = db.Column(db.String(80))
    company = db.Column(db.String(80))
    description = db.Column(db.String(255))
    # --------------------
    creation_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    user = db.relationship('User')
    category = db.relationship('Category')

    def __repr__(self):
        return f'<Beer {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "category_id": self.category_id,
            "image": self.image,
            "name": self.name,
            "smell": self.smell,
            "source": self.source,
            "alcohol": self.alcohol,
            "company": self.company,
            "description": self.description,
            "creation_date": self.creation_date,
        }
class ILikeIt(db.Model):
    __tablename__="ilikeit"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    beer_id = db.Column(db.Integer, db.ForeignKey('beer.id'))
    user = db.relationship('User')
    beer = db.relationship('Beer')

    def __repr__(self):
        return f'<ILikeIt {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "beer_id": self.beer_id,
        }

class Vote(db.Model):
    __tablename__="vote"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    beer_id = db.Column(db.Integer, db.ForeignKey('beer.id'))
    punctuation = db.Column(db.Integer)
    user = db.relationship('User')
    beer = db.relationship('Beer')

    def __repr__(self):
        return f'<Vote {self.punctuation}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "beer_id": self.beer_id,
            "punctuation": self.punctuation
        }

class Comment(db.Model):
    __tablename__="comment"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    beer_id = db.Column(db.Integer, db.ForeignKey('beer.id'))
    comment = db.Column(db.String, nullable=False)
    creation_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    user = db.relationship('User')
    beer = db.relationship('Beer')

    def __repr__(self):
        return f'<Vote {self.comment}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "beer_id": self.beer_id,
            "comment": self.comment,
            "creation_date": self.creation_date,
            "user": self.user.nickname if self.user is not None else 'UsuarioDefault'
        }


class Messages(db.Model):
    __tablename__="messages"
    id = db.Column(db.Integer, primary_key=True)
    # body
    sender_id = db.Column(db.Integer)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    title_message = db.Column(db.String(80))
    message = db.Column(db.String(255))
    # info
    date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    user = db.relationship('User')

    def __repr__(self):
        return f'<Messages {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "sender_id": self.sender_id,
            "receiver_id": self.receiver_id,
            "sender_nickname": self.user.nickname,
            "title_message": self.title_message,
            "message": self.message,
            "date": self.date,
        }