from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String, nullable=False)
    profile_pic = db.Column(db.String)

    # if have time, include a children theme
    # age = db.Column(db.Integer)

    attendances = db.relationship('Attendance', back_populates='user', cascade='all, delete-orphan')
    posts = db.relationship('Post', back_populates='user', cascade='all, delete-orphan')
    trips = association_proxy('attendances', 'user')
    
    serialize_rules = ('-attendances.user', '-posts.user' )

    @hybrid_property
    def password_hash(self):
        raise Exception("Can not show password")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    @validates("username")
    def check_username(self, key, username):
        length = len(username)
        if not username:
            raise ValueError("Username must exist")
        elif (length < 3 or length > 15):
            raise ValueError("Username must be between 3 and 15 characters long")
        return username
    
    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError("Email must be a valid email")
        return email

    def __repr__(self):
        return f'<User id={self.id} username={self.username}>'
