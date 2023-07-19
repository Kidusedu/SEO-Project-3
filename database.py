import sqlite3


def insert_into_username(username):
    connection = sqlite3.connect("Cover_Letter.db")
    cursor = connection.cursor()

    row_list = ([username])

    cursor.execute("insert into username values (?)", row_list)
    connection.commit()
 
    connection.close

def insert_into_user_info(username, resume):
    connection = sqlite3.connect("Cover_Letter.db")
    cursor = connection.cursor()

    row_list = ([username, resume])

    cursor.execute("insert into user_info values (?, ?)", row_list)
    connection.commit()
    for row in cursor.execute("select * from user_info"):
        print(row)
    connection.close


def get_resume(username):
    connection = sqlite3.connect("Cover_Letter.db")
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM user_info WHERE username=?", (username,))

    resume_data = cursor.fetchone()

    connection.close()

    return resume_data      


connection = sqlite3.connect("Cover_Letter.db")
cursor = connection.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS user_info (username TEXT, resume TEXT)")

cursor = connection.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS username (username TEXT)")

connection.commit()
connection.close