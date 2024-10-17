"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

import os

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

sender_email = os.getenv("SMTP_USERNAME")
sender_password = os.getenv("SMTP_PASSWORD")
smtp_host = os.getenv("SMTP_HOST")
smtp_port = os.getenv("SMTP_PORT")
reciever_email = os.getenv("RECIEVERS_EMAIL")

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# ENVIAR EMAIL (PRUEBA)
@api.route('/send-email', methods=['POST'])
def send_email():

    message = MIMEMultipart("alternative")
    message["Subject"] = "Te inivito a Trippy - ¡Haremos un viaje juntos!"
    message["From"] = sender_email
    message["To"] = reciever_email

    print(sender_email, sender_password, smtp_host, smtp_port)
    
    # message["To"] = ", ".join(recipients)

    text = "Prueba1"

    html_content = """
        <html>
            <body>
                <h1 style="color:blue;">Estoy probando estooo!</h1>
                <p>This email is sent using <b>Trippy Backend</b> and Gmail's SMTP server.</p>
            </body>
        </html>
    """

    part1 = MIMEText(text, "plain")

    part2 = MIMEText(html_content, "html")

    message.attach(part1)

    message.attach(part2)

    smtp_connection = smtplib.SMTP(smtp_host, smtp_port)

    smtp_connection.starttls() # Secure the connection

    smtp_connection.login(sender_email, sender_password)

    smtp_connection.sendmail(sender_email, reciever_email, message.as_string())

    smtp_connection.quit()

    return jsonify({"msg": "Email sent"}), 200


#Endpoint for LOGIN
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email == None or password == None:
        return jsonify({"msg": "Missing keys email or password"}), 401

    user = User.query.filter_by(email=email).first()
    if user == None:
        return jsonify({"msg": "User not found!"}), 401
    if user.password != password:
        return jsonify({"msg": "Wrong password"}), 401

    access_token = create_access_token(identity=email)
    
    return jsonify({"token": access_token,
                    "user": user.serialize()}), 200

@api.route("/register", methods =["POST"])
def register():
    name = request.json.get("name", None)
    username = request.json.get("username", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    number = request.json.get("number", None)
    more_info = request.json.get("more_info", None)

    if name ==None:
        return jsonify({"msg": "Missing name"}), 401
    if username ==None:
        return jsonify({"msg": "Missing username"}), 401
    if email ==None:
        return jsonify({"msg": "Missing email"}), 401
    if password ==None:
        return jsonify({"msg": "Missing password"}), 401
    
    user = User.query.filter_by(email=email).first()

    if user != None:
        return jsonify({"msg": "User already exists!"}), 401
    new_user = User(name, username, email, password, number, more_info)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"user": new_user.serialize(),
                    "token": create_access_token(identity=email)
                    }),200

@api.route("/user", methods=["GET"])
@jwt_required()
def get_user_logged():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    return jsonify(user.serialize()),200


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
