from flask import Flask,jsonify,request
import json
from api.utility import util
app = Flask(__name__)

@app.route("/api/login", methods=['POST'])
def get_login():
    received = request.get_json()
    f = open('api/data/UsersData.json')
    data = json.load(f)
    f.close()
    for element in data['user_auth']:
        if received[0]['username'] == element['username'] and received[0]['password'] == element['password']:
            return jsonify({"status": "success","name": element['fullname'],"uid":element['uid']})
    return jsonify({"status": "fail","name": "invalid"})

@app.route("/api/getProductData",methods= ['POST'])
def getProductTable():
    received = request.get_json()
    with open('api/data/ProductData.json') as read:
        data = json.load(read)
        uid = received['uid']
        return jsonify(data[uid])
    
@app.route("/api/getSalesData",methods= ['POST'])
def getSaleTable():
    received = request.get_json()
    with open('api/data/SalesData.json') as read:
        data = json.load(read) 
        uid = received['uid']
        return jsonify(data[uid])
@app.route("/api/getHomeData",methods = ['POST'])
def getHomeData():
    received = request.get_json()
    uid = received['uid']
    data = util.handleGetHomeData(uid=uid)
    return jsonify(data)

@app.route("/api/addProduct",methods = ['POST'])
def addProduct():
    received = request.get_json()
    uid = received['uid']
    

if __name__ == "__main__":
    app.run(debug= True)
