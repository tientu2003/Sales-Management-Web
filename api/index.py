from flask import Flask,jsonify,request
import json
app = Flask(__name__)

@app.route("/api/login", methods=['POST'])
def get_login():
    received = request.get_json()
    f = open('api/data/UsersData.json')
    data = json.load(f)
    f.close()
    for element in data['user_auth']:
        if received[0]['username'] == element['username'] and received[0]['password'] == element['password']:
            return jsonify({"status": "success","name": element['fullname']})
    return jsonify({"status": "fail","name": "invalid"})

if __name__ == "__main__":
    app.run(debug= True)
