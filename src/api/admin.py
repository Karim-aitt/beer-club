  
import os
from flask_admin import Admin
from .models import db, User, Beer, Category, ILikeIt, Vote, Comment, Messages, UserDetail, Userevent, Yeseventpeople, Noeventpeople
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Beer, db.session))
    admin.add_view(ModelView(Category, db.session))
    admin.add_view(ModelView(ILikeIt, db.session))
    admin.add_view(ModelView(Vote, db.session))
    admin.add_view(ModelView(Comment, db.session))
    admin.add_view(ModelView(Messages, db.session))
    admin.add_view(ModelView(UserDetail, db.session))
    admin.add_view(ModelView(Userevent, db.session))
    admin.add_view(ModelView(Yeseventpeople, db.session))
    admin.add_view(ModelView(Noeventpeople, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))