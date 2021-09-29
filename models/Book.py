from sqlalchemy import Integer, Column, String, Date
from models.database import db

class Book(db.Model):
    __tablename__ = 'books'

    book_id = Column(Integer, primary_key=True, unique=True)
    title = Column(String)
    author = Column(String)
    date = Column(Date)
    notes = Column(String)

    def get_columns():
        return [{
            'Header': 'ID',
            'accessor': 'book_id',
        }, {
            'Header': 'Title',
            'accessor': 'title',
        }, {
            'Header': 'Author',
            'accessor': 'author',
        }, {
            'Header': 'Date of Purchase',
            'accessor': 'date',
        }, {
            'Header': 'Notes',
            'accessor': 'notes',
        }]