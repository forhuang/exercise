import json
import csv
from io import StringIO
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email import encoders
from flask import Blueprint, render_template, request, jsonify
from flask_login import login_required
from models import db, Book
from core import send_mail

book = Blueprint('book', __name__)

@book.route('/book', methods=['GET'])
@login_required
def home():
    return render_template('index.html')

@book.route('/getBookData', methods=['GET'])
@login_required
def get_book_data():
    columns, data = query_all_book()

    return jsonify({
        'columns': columns,
        'data': data,
    })

@book.route('/insertBook', methods=['POST'])
@login_required
def insert_book():
    db.session.add(Book(**json.loads(request.data)))
    db.session.commit()

    columns, data = query_all_book()

    return jsonify({
        'columns': columns,
        'data': data,
    })

@book.route('/deleteBook', methods=['POST'])
@login_required
def delete_book():
    for book_id in json.loads(request.data):
        db.session.query(Book).filter(Book.book_id==book_id).delete()

    db.session.commit()

    columns, data = query_all_book()

    return jsonify({
        'columns': columns,
        'data': data,
    })

@book.route('/editBook', methods=['POST'])
@login_required
def edit_book():
    book = json.loads(request.data)
    book_id = book.pop('book_id')

    db.session.query(Book).filter(Book.book_id==book_id).update(book, synchronize_session=False)
    db.session.commit()

    columns, data = query_all_book()

    return jsonify({
        'columns': columns,
        'data': data,
    })

@book.route('/share', methods=['POST'])
@login_required
def share():
    res = json.loads(request.data)

    io = StringIO()
    writer = csv.DictWriter(io, fieldnames=list(res['rows'][0].keys()))

    writer.writeheader()
    writer.writerows(res['rows'])

    msg = build_msg(res['email'], io)
    io.close()

    info = send_mail(res['email'], msg)

    return jsonify(info)

def build_msg(email, io):
    msg = MIMEMultipart()
    msg['Subject'] = 'Share Books'
    msg['From'] = 'Book Exercise'
    msg['To'] = email

    attach = MIMEBase('application', 'octet-stream')
    attach.set_payload(io.getvalue().encode())
    attach.add_header('Content-Disposition', 'attachment', filename='books.csv')
    encoders.encode_base64(attach)
    msg.attach(attach)

    msg.attach(MIMEText('Enclosed is your book list.'))

    return msg

def query_all_book():
    columns = Book.get_columns()
    data = []
    for book in db.session.query(Book).all():
        values = {}
        for column in columns:
            accessor = column['accessor']

            value = getattr(book, accessor)
            if accessor == 'date':
                value = value.strftime('%Y-%m-%d')

            values[accessor] = value

        data.append(values)

    return columns, data