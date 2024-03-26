from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'Alex'
app.config['MYSQL_PASSWORD'] = '12345678'
app.config['MYSQL_DB'] = 'login_schema'

mysql = MySQL(app)

@app.route('/todos', methods=['POST'])
def create_todo():
    try:
        data = request.json
        user_id = data['user_id']
        content = data['content']

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO todos (user_id, content) VALUES (%s, %s)", (user_id, content))
        mysql.connection.commit()
        cur.close()

        return jsonify({"message": "Todo created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/todos/<int:user_id>', methods=['GET'])
def get_todos(user_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM todos WHERE user_id = %s", (user_id,))
        todos = cur.fetchall()
        cur.close()

        return jsonify(todos), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
