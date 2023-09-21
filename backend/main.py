from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS
import datetime
app = Flask(__name__)
CORS(app)



mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="UNnati@18",
    database="expense_db"
)

mycursor = mydb.cursor()
# mycursor.execute("CREATE DATABASE expense_db")
# mycursor.execute("CREATE TABLE expense(date DATE, Amount int, Head VARCHAR(255), Tag VARCHAR(255), Note VARCHAR(255))")
# mycursor.execute("CREATE TABLE kharcha(Date DATE, Amount int, Head VARCHAR(255), Tag VARCHAR(255), Note VARCHAR(255))")
print(mydb)
# Configuration
DATABASE_NAME = "expense_db"

@app.route('/view-expenses', methods=['GET'])
def list_expenses():
    # Retrieve all expenses from the database
    # with sqlite3.connect(DATABASE_NAME) as conn:
    #     cursor = conn.cursor()
    #     cursor.execute("SELECT * FROM expense")
    #     expenses = cursor.fetchall()

    mycursor.execute("SELECT * FROM kharcha")

    myresult = mycursor.fetchall()

    formatted_expenses = []
    for row in myresult:
        date_str = row[0].strftime("%d/%m/%Y")
        amount = row[1]
        head = row[2].lower()
        tag = row[3].lower()
        note = row[4]

        expense_dict = {"date": date_str, "amount": amount, "head": head, "tag": tag, "note": note}
        formatted_expenses.append(expense_dict)

    for x in formatted_expenses:
        print(x)

    response = jsonify(formatted_expenses)
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

@app.route('/add-expense', methods=['POST'])
def add_expense():
    data = request.json
    date = data.get('date')
    head = data.get('head')
    amount = data.get('amount')
    tag = data.get('tag')
    note = data.get('note')

    if not head or not amount or not tag:
        return jsonify({"error": "Missing data"}), 400

    # with sqlite3.connect(DATABASE_NAME) as conn:
    #     cursor = conn.cursor()
    #     cursor.execute(
    #         "INSERT INTO kharcha(Date, Head, Amount, Tag, Note) VALUES (?, ?, ?, ?, ?)",
    #         (date, head, amount, tag, note)
    #     )
    #     conn.commit()
    sql = "INSERT INTO kharcha(Date, Head, Amount, Tag, Note) VALUES (%s, %s, %s, %s, %s)"
    val = (date, head, amount, tag, note)
    mycursor.execute(sql, val)
    val = ""
    mydb.commit()

    return jsonify({"message": "Expense added successfully"})

@app.route('/summary', methods=['GET'])
def get_summary():
    # Calculate the total expenses and the number of expenses
    # with sqlite3.connect(DATABASE_NAME) as conn:
    #     cursor = conn.cursor()
    #     cursor.execute("SELECT SUM(amount) FROM expenses")
    #     total_expenses = cursor.fetchone()[0]
    #     cursor.execute("SELECT COUNT(id) FROM expenses")
    #     num_expenses = cursor.fetchone()[0]
    sql1 = "SELECT Head, SUM(Amount) FROM kharcha GROUP BY Head"
    mycursor.execute(sql1)
    myresult_head = mycursor.fetchall()
    sql2 = "SELECT Tag, SUM(Amount) FROM kharcha GROUP BY Tag"
    mycursor.execute(sql2)
    myresult_tag = mycursor.fetchall()

    for x in myresult_head:
        print(x)

    for x in myresult_tag:
        print(x)

    summary_data = {
        'Head': myresult_head,
        'Tag': myresult_tag
    }

    response = jsonify(summary_data)
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'

    return response


if __name__ == '__main__':
    app.run(debug=True)
