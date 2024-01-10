import json
from flask import jsonify
from solveHomeData import HomeData
def countNumberElement(jsondata):
    num = sum(1 for line in jsondata)
    return num

def handleGetHomeData(uid):
    with open('api/data/SalesData.json') as read:
        fdata = json.load(read)
        HomeData.reset()
        HomeData.CalculateData(fdata[uid],uid)
        most = HomeData.calculateMostSold()
        HomeData.CalculateDateInteVal()
        day = HomeData.calculateDaily()
        month = HomeData.calculateMonthly()
        year = HomeData.calculateAnnually()
        HomeData.calculateWeekly()
        HomeData.reset()
    return {"day":day,"month":month,"year":year,"most":most}

def addProduct(uid,data):
    with open('api/data/ProductData.json','r') as read:
        fdata = json.load(read) 
        if(uid in fdata):
            fdata[uid].append({"pid": countNumberElement(fdata[uid])+1,"name":data["name"],"brand":data["brand"]
                               ,"price":float(data["price"]),"quantity":int(data["quantity"])})
            with open('api/data/ProductData.json','w') as write:
                write.write(json.dumps(fdata))    
            return 'success'
        else:    
            return 'fail'
        
def addOrder(uid,data):
    with open('api/data/SalesData.json','r') as read:
        fdata = json.load(read) 
        if(uid in fdata):
            fdata[uid].append({"order_id": countNumberElement(fdata[uid])+1,"pid":int(data["pid"]),"name":data["name"],"date":data["date"]
                               ,"time":data["time"],"quantity":int(data["quantity"]),"total_price":float(data["total_price"])})
            with open('api/data/SalesData.json','w') as write:
                write.write(json.dumps(fdata))    
            return 'success'
        else:    
            return 'fail'
    