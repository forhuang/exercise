from flask import Flask, render_template, send_from_directory
from flask_migrate import Migrate
from admin.views import admin
from book.views import book
from models import db
from authenticate import login_manager
from config import SECRET, PG_URL, PG_PORT, PG_USER, PG_PASSWORD, PG_DATABASE

app = Flask(__name__)
app.secret_key = SECRET
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{PG_USER}:{PG_PASSWORD}@{PG_URL}:{PG_PORT}/{PG_DATABASE}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db.init_app(app)
migrate = Migrate(app, db)

login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    from models import User
    user = db.session.query(User).get(user_id)
    return user

app.register_blueprint(admin)
app.register_blueprint(book)

@app.route('/static/<path:path>', methods=['GET'])
def send_js(path):
    return send_from_directory('static', path)

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()