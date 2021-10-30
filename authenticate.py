from flask_login import LoginManager
from models import db, User

login_manager = LoginManager()

login_manager.login_view = 'admin.login'
login_manager.login_message_category = 'info'
login_manager.login_message = 'Access denied.'

@login_manager.user_loader
def load_user(user_id):
    user = db.session.query(User).get(user_id)
    return user