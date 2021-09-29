from flask_login import UserMixin
from sqlalchemy import Integer, Column, String
from models.database import db

class User(UserMixin, db.Model):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True, unique=True)
    email = Column(String, unique=True)
    password = Column(String)

    def get_id(self):
        return str(self.user_id)