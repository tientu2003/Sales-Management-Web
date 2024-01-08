from flask import Flask,jsonify,request
import json
from api.utility import util
app = Flask(__name__)
#authentication
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
#GETDATA API
#HomeData
@app.route("/api/getHomeData",methods = ['POST'])
def getHomeData():
    received = request.get_json()
    uid = received['uid']
    data = util.handleGetHomeData(uid=uid)
    return jsonify(data)

#Product Table
@app.route("/api/getProductData",methods= ['POST'])
def getProductTable():
    received = request.get_json()
    with open('api/data/ProductData.json') as read:
        data = json.load(read)
        uid = received['uid']
        return jsonify(data[uid])
    
#Sale Table
@app.route("/api/getSalesData",methods= ['POST'])
def getSaleTable():
    received = request.get_json()
    with open('api/data/SalesData.json') as read:
        data = json.load(read) 
        uid = received['uid']
        return jsonify(data[uid])
    

#ADD NEW RECORD API
@app.route("/api/addProduct",methods = ['POST'])
def addProduct():
    received = request.get_json()
    uid = received['uid']
    status = util.addProduct(uid=uid,data=received['data'])
    return jsonify({'status':status})

@app.route("/api/addOrder",methods = ['POST'])
def addOrder():
    received = request.get_json()
    uid = received['uid']
    status = util.addOrder(uid=uid,data=received['data'])
    return jsonify({'status':status})

if __name__ == "__main__":
    app.run(debug= True)
