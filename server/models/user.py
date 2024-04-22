from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15), unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String)
    profile_pic = db.Column(db.String)
    age = db.Column(db.Integer)

    # stores = db.relationship('Store', back_populates='owner', cascade='all, delete-orphan')

    # purchases = db.relationship('Purchase', back_populates='user')
    # items = association_proxy('purchases', 'item')

    # serialize_rules = ('-stores.owner',  )

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
            raise ValueError("Failed simple email validation")
        return email

    def __repr__(self):
        return f'<User id={self.id} username={self.username}>'
