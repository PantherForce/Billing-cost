from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_bcrypt import Bcrypt 

app = Flask(__name__)
CORS(app, supports_credentials=True)  

users = []

bcrypt = Bcrypt()

def get_user(email):
    for user in users:
        if user['email'] == email:
            return user
    return None

# Signup endpoint
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if get_user(email):
        return jsonify({'message': 'Email already exists'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    users.append({
        'username': username,
        'email': email,
        'password': hashed_password
    })

    return jsonify({'message': 'Signup successful'}), 200

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Check if user exists
    user = get_user(email)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Check password
    if not bcrypt.check_password_hash(user['password'], password):
        return jsonify({'message': 'Incorrect password'}), 401

    # Here you might generate a session token or set a cookie to maintain login state
    # For simplicity, setting authenticated state as a response for this example
    return jsonify({'message': 'Login successful'}), 200

# Submit meal data endpoint
submitted_data = []

breakfast_options = {
    "Pancakes": 5,
    "Omelette": 6,
    "Fruit Salad": 4,
    "Cereal": 3,
    "Toast": 2
}

lunch_options = {
    "Burger": 10,
    "Salad": 8,
    "Sandwich": 7,
    "Pizza": 12,
    "Pasta": 11
}

dinner_options = {
    "Steak": 20,
    "Chicken": 15,
    "Fish": 18,
    "Vegetables": 10,
    "Rice": 9
}

@app.route('/submit', methods=['POST'])
def submit_data():
    data = request.json 
    print('Received data:', data)
    
    total_cost = (
        breakfast_options.get(data['breakfast'], 0) +
        lunch_options.get(data['lunch'], 0) +
        dinner_options.get(data['dinner'], 0)
    )
    
    data['totalCost'] = total_cost

    submitted_data.append(data)

    return jsonify({'message': 'Data received successfully', 'totalCost': total_cost}), 200

@app.route('/submitted-data')
def get_submitted_data():
    return jsonify(submitted_data)

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
