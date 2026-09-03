from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True)

    username = db.Column(
        db.String(30),
        unique=True,
        nullable=False
    )

    name = db.Column(
        db.String(100),
        nullable=False
    )

    email = db.Column(
        db.String(255),
        unique=True,
        nullable=False
    )

    password = db.Column(
        db.String(255),
        nullable=False
    )

    phone_no = db.Column(
        db.String(10),
        unique=True,
        nullable=True
    )

    dob = db.Column(
        db.Date,
        nullable=True
    )

    profile_picture = db.Column(
        db.String(255),
        nullable=True
    )

    bio = db.Column(
        db.Text,
        nullable=True
    )

class Chat(db.Model):
    __tablename__ = "chats"

    chat_id = db.Column(db.Integer, primary_key= True)

    created_at= db.Column(
        db.DateTime,
        nullable = False,
        server_default = db.func.now()
    )

class Chat_participant(db.Model):
    __tablename__ = "chat_participants"

    chat_id = db.Column(
        db.Integer,
        db.ForeignKey("chats.chat_id",ondelete="CASCADE"),
        primary_key= True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.user_id",ondelete="CASCADE"),
        primary_key=True
    )

    joined_at = db.Column(
        db.DateTime,
        nullable = False,
        server_default =db.func.now()

    )

class Messages(db.Model):
    __tablename__ = "messages"

    message_id = db.Column(
        db.Integer,
        primary_key= True
    )

    chat_id = db.Column(
        db.Integer,
        db.ForeignKey("chats.chat_id",ondelete="CASCADE"),
        nullable = False
    )

    sender_id= db.Column(
        db.Integer,
        db.ForeignKey("users.user_id",ondelete="CASCADE"),
        nullable = False
    )

    content = db.Column(
        db.Text,
        nullable = False
    )

    message_type= db.Column(
        db.String(20),
        nullable = False
    )

    sent_at = db.Column(
        db.DateTime,
        server_default =db.func.now()
    )

    status = db.Column(
        db.String(20),
        nullable = False
    )

    reply_to_message_id = db.Column(
        db.Integer,
        db.ForeignKey("messages.message_id",ondelete="SET NULL"),
        nullable = True
    )