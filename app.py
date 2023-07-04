import resource
from flask import Flask, render_template
from api.resource import User, api
from models import db,User as users_model
from security import user_datastore, sec
from flask_security.utils import hash_password
import datetime
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_security import Security, SQLAlchemyUserDatastore, login_required, UserMixin, RoleMixin
from flask_login import LoginManager,login_user, login_required,logout_user,current_user
from flask_security.utils import hash_password,verify_password
from sqlalchemy.sql import func
import sqlite3
from sqlalchemy.sql.functions import current_timestamp, now



app = Flask(__name__)



app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SECRET_KEY'] = "thisissecret"
app.config['SECURITY_PASSWORD_SALT'] = 'thisisasecretsalt'
app.config['WTF_CSRF_ENABLED'] = False
app.config['SECURITY_TOKEN_AUTHENTICATION_HEADER'] = "Authentication-Token"
app.config['SECURITY_PASSWORD_HASH'] = 'bcrypt'

api.init_app(app)
db.init_app(app)
sec.init_app(app, user_datastore)




# @app.before_first_request
# def create_db():
#     db.create_all()
#     user=users_model(f_name="Sumistha",l_name="saha",email="sumistha@gmail.com",password="password",fs_uniquifier="test")
#     db.session.add(user)
#     db.session.commit()

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


@app.route('/')
def home():
    return render_template("index.html")

if __name__=="__main__":
  app.run(debug=True,port=8080)