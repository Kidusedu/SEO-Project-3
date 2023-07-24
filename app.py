from flask import Flask, request, jsonify, session
import sqlite3
import secrets
from flask_behind_proxy import FlaskBehindProxy


app = Flask(__name__)
proxied = FlaskBehindProxy(app)

app.secret_key = secrets.token_hex(16)

def insert_into_username(username):
    connection = sqlite3.connect("Cover_Letter.db")
    cursor = connection.cursor()

    row_list = ([username])

    cursor.execute("insert into username values (?)", row_list)
    connection.commit()
 
    for row in cursor.execute("select * from username"):
        print(row)
    connection.close

def insert_into_user_info(username, title, resume):
    connection = sqlite3.connect("Cover_Letter.db")
    cursor = connection.cursor()

    row_list = ([username, title, resume])

    cursor.execute("insert into user_info values (?, ?, ?)", row_list)
    connection.commit()
    for row in cursor.execute("select * from user_info"):
        print(row)
    connection.close

def get_resume(username):
    connection = sqlite3.connect("Cover_Letter.db")
    cursor = connection.cursor()
    cursor.execute("SELECT title FROM user_info WHERE username=?", (username,))

    resume_data = cursor.fetchall()

    connection.close()

    return resume_data      

# Endpoint to handle data submission from the extension
@app.route('/submit-username', methods=['POST'])
def submit_data():
    data = request.json
    print(data)
    username = data.get('username')
    print(username)
    session['username'] = username

    # Store the username and resume in the database
    insert_into_username(username)

    return jsonify({"message": "Data submitted successfully."})

    # Process the work experience and job description (you can implement your cover letter generation logic here)
    # ...


# Endpoint to retrieve resume data based on the username
@app.route('/get-resume', methods=['POST'])
def get_resume_handler():
    username = session.get('username')
    print(username)
    resume_data = get_resume(username)
    return jsonify({"resume": resume_data})

# Endpoint to retrieve resume data based on the username
@app.route('/add-experience', methods=['POST'])
def add_experience():
    username = session.get("username")
    data = request.json
    experience = data.get('experience')
    title = data.get("title")
    insert_into_user_info(username, title, experience)
    return jsonify({"message": "Data submitted successfully."})


if __name__ == '__main__':
    app.run(debug=True)
