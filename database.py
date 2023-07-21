import sqlite3

connection = sqlite3.connect("Cover_Letter.db")
cursor = connection.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS user_info (username TEXT, title TEXT, resume TEXT)")

cursor = connection.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS username (username TEXT)")

connection.commit()
connection.close