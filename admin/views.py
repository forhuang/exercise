import json
from datetime import datetime
import hashlib
from email.mime.text import MIMEText
from urllib.parse import urljoin
import jwt
from flask import Blueprint, render_template, request, jsonify, abort, redirect, url_for
from flask_login import login_user, login_required, logout_user
from models import db, User
from core import send_mail
from config import JWT_SECRET, SALT, EMAIL_VERIFY_EXPIRE

admin = Blueprint('admin', __name__)

@admin.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('index.html')

    email, password = parse_sign_data(request)
    user = db.session.query(User).filter(User.email==email).first()
    if user is None or user.password != crypt(password):
        return jsonify({
            'success': False,
            'info': 'Your email and password did not match. Please try again.'
        })

    login_user(user)

    return jsonify({'success': True})

@admin.route('/logout', methods=['POST'])
@login_required
def logout():
    email = json.loads(request.data)['email']

    user = db.session.query(User).filter(User.email==email).first()
    if user is None:
        return jsonify({
            'success': False,
            'info': 'The email is not existed',
        })

    logout_user()

    return jsonify({'success': True})

@admin.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'GET':
        return render_template('index.html')

    email, password = parse_sign_data(request)
    if db.session.query(User).filter(User.email==email).first():
        return jsonify({
            'success': False,
            'info': 'This email is existed. Please use another email.'
        })

    msg = create_msg(email, crypt(password))
    info = send_mail(email, msg)

    return jsonify(info)

@admin.route('/verify/<path:path>', methods=['GET'])
def verify(path):
    try:
        info = jwt.decode(path, JWT_SECRET, algorithms=('HS256'))
    except:
        abort(404)

    if (datetime.now() - datetime.fromtimestamp(info['time'])).total_seconds() > EMAIL_VERIFY_EXPIRE:
        abort(404)

    if db.session.query(User).filter(User.email==info['email']).first():
        abort(404)

    db.session.add(User(email=info['email'], password=info['password']))
    db.session.commit()

    return redirect(url_for('admin.login', loginModalInfo='You have registered your email. Please log in now.'))

def create_msg(email, password):
    token = jwt.encode({
        'email': email,
        'password': password,
        'time': datetime.now().timestamp(), 
    }, JWT_SECRET, algorithm='HS256')

    content = f'''Please verify your email by clicking the link:\n\n
        {urljoin(request.url_root, f'/verify/{token}')}'''

    msg = MIMEText(content)
    msg['Subject'] = 'Verify your email'
    msg['From'] = 'Book Exercise'
    msg['To'] = email

    return msg

def parse_sign_data(request):
    register_info = json.loads(request.data)
    return register_info['email'], register_info['password']

def crypt(password):
    m = hashlib.sha256()
    m.update(password.encode('utf-8'))
    m.update(SALT.encode('utf-8'))
    return m.hexdigest()