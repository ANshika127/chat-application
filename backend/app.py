from flask import Flask, request
from dotenv import load_dotenv
import re
import os 
from sqlalchemy import URL
from models import db, User, Chat, Chat_participant
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] =os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app)

database_url = URL.create(
    drivername="postgresql+psycopg",
    username=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=DB_PORT,
    database=DB_NAME
)

app.config["SQLALCHEMY_DATABASE_URI"] = database_url

db.init_app(app)

@app.route("/")
def home():
    return {
        "message": "Chat Application Backend Running!"
    }

@app.route("/users/register", methods= ["POST"])
def register_user():

    data = request.get_json()
    if not data:
        return {"error":"Request body is required"},400

    username = data.get("username","").strip() 
    name= data.get("name","").strip()
    email = data.get("email","").strip().lower()
    password = data.get("password","")
    phone_no = data.get("phone_no")
    dob = data.get("dob")
    profile_picture = data.get("profile_picture")
    bio= data.get("bio")

    if not username or not name or not email or not password:
        return {"error": "Username, Name, Email and Password are required"}, 400
    
    if len(username)<3 or len(username)>30:
        return {"error": "Username must be between 3 and 30 characters"},400

    if len(name) >100:
        return {"error": "Name cannot exceed 100 characters"},400   

    if not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email):
        return {"error": "Invalid email address"}, 400

    if len(password) < 8:
        return {"error": "Password must be atleast 8 characters"},400

    if phone_no and not re.fullmatch(r"\d{10}", phone_no):
        return {"error": "Phone number must contain exactly 10 digits"}, 400


    if User.query.filter_by(username=username).first():
        return {"error": "Username already exists"},409
    
    if User.query.filter_by(email=email).first():
        return {"error": "Email already exists"},409

    if phone_no and User.query.filter_by(phone_no= phone_no).first():
        return {"error":"Phone_no already exists"},409

    hashed_password = generate_password_hash(password)

    user = User(
        username=username,
        name=name,
        email=email,
        password=hashed_password,
        phone_no=phone_no,
        dob=dob,
        profile_picture=profile_picture,
        bio=bio
    )
    db.session.add(user)
    db.session.commit()

    return{
        "message":"USer registeration completed ",
        "user_id": user.user_id
    },201

@app.route("/users/login", methods=["POST"])
def login_user():
    data = request.get_json()
    if not data:
        return {"error":"Request body is required"},400
    
    email = data.get("email","").strip().lower()
    password = data.get("password","")

    if not email or not password:
        return {"error": "Email and password required"},400
    
    user = User.query.filter_by(email=email).first()

    if not user:
        return {"error":"Invalid Email or Password "},401

    if not check_password_hash(user.password, password):
        return {"error": "Invalid email or password"},401

    access_token = create_access_token(identity= str(user.user_id))

    return {
        "message": "Login Successful",
        "access_token": access_token,
        "user_id": user.user_id,
        "username": user.username,
        "name": user.name
    },200


@app.route("/users/me", methods=["GET"])
@jwt_required()
def get_current_user():

    user_id = int(get_jwt_identity())
    user = User.query.get(user_id) 

    if not user:
        return {"error":"User Not Found"},404
    
    return {
        "user_id": user.user_id,
        "username": user.username,
        "name": user.name,
        "email": user.email,
        "phone_no": user.phone_no,
        "dob": str(user.dob) if user.dob else None,
        "profile_picture": user.profile_picture,
        "bio": user.bio
    },200
    
@app.route("/users/me", methods=["PUT"])
@jwt_required()
def update_current_user():

    user_id = int(get_jwt_identity())

    user = User.query.get(user_id)

    if not user:
        return {"error": "User not found"}, 404

    data = request.get_json()

    if not data:
        return {"error": "Request body is required"}, 400

    name = data.get("name")
    username = data.get("username")
    phone_no = data.get("phone_no")
    dob = data.get("dob")
    profile_picture = data.get("profile_picture")
    bio = data.get("bio")

    # Username validation
    if username is not None:
        username = username.strip()

        if len(username) < 3 or len(username) > 30:
            return {
                "error": "Username must be between 3 and 30 characters"
            }, 400

        existing_user = User.query.filter(
            User.username == username,
            User.user_id != user_id
        ).first()

        if existing_user:
            return {"error": "Username already exists"}, 409

        user.username = username

    # Name validation
    if name is not None:
        name = name.strip()

        if not name:
            return {"error": "Name cannot be empty"}, 400

        if len(name) > 100:
            return {"error": "Name cannot exceed 100 characters"}, 400

        user.name = name

    # Phone validation
    if phone_no is not None:

        if phone_no != "" and not re.fullmatch(r"\d{10}", phone_no):
            return {
                "error": "Phone number must contain exactly 10 digits"
            }, 400

        if phone_no != "":
            existing_phone = User.query.filter(
                User.phone_no == phone_no,
                User.user_id != user_id
            ).first()

            if existing_phone:
                return {"error": "Phone number already exists"}, 409

        user.phone_no = phone_no if phone_no != "" else None

    # Optional fields
    if dob is not None:
        user.dob = dob

    if profile_picture is not None:
        user.profile_picture = profile_picture

    if bio is not None:
        user.bio = bio

    db.session.commit()

    return {
        "message": "Profile updated successfully"
    }, 200

@app.route("/chats", methods=["POST"])
@jwt_required()
def create_chat():

    current_user_id = int(get_jwt_identity())

    data = request.get_json()

    if not data:
        return {"error":" Request body is required "},400

    target_user_id = data.get("user_id")

    if target_user_id is None:
        return {
            "error":"Target User ID is required "
        },400
    
    try:
        target_user_id = int(target_user_id)
    except(TypeError,ValueError):
        return{
            "error":"User ID must be an Integer"
        },400

    if target_user_id == current_user_id:
        return{
            "error":"You cant create a chat with yourself"
        },400

    target_user = User.query.get(target_user_id)

    if not target_user:
        return {
            "error":"Target User Not Found"
        },404

    existing_chat=(
        Chat.query
        .join(Chat_participant)
        .filter(Chat_participant.user_id == current_user_id)
        .filter(
            Chat.chat_id.in_(
                db.session.query(Chat_participant.chat_id)
                .filter(Chat_participant.user_id == target_user_id)
            )
        ).first()
    )
    
    if existing_chat:
        return{
            "message":"Chat already exists",
            "chat_id": existing_chat.chat_id
        },200

    new_chat =Chat()

    db.session.add(new_chat)
    db.session.flush()

    participant_1= Chat_participant(
        chat_id = new_chat.chat_id,
        user_id = current_user_id
    )
    participant_2= Chat_participant(
        chat_id = new_chat.chat_id,
        user_id = target_user_id
    )

    db.session.add(participant_1)
    db.session.add(participant_2)

    db.session.commit()

    return{
        "message":"Chat created Successfully ",
        "chat_id":new_chat.chat_id
    },201


    
if __name__ == "__main__":
    app.run(debug=True)