import json
def countNumberElement(jsondata):
    num = sum(1 for line in jsondata)
    return num
def handleGetHomeData(uid):
    
    return 0

def addProduct(uid,data):
    with open('api/data/ProductData.json','r') as read:
        fdata = json.load(read) 
        if(uid in fdata):
            fdata[uid].append({"pid": countNumberElement(fdata[uid])+1,"name":data["name"],"brand":data["brand"]
                               ,"price":data["price"],"quantity":data["quantity"]})
            with open('api/data/ProductData.json','w') as write:
                write.write(json.dumps(fdata))    
            return 'success'
        else:    
            return 'fail'
        
def addOrder(uid,data):
    with open('api/data/SalesData.json','r') as read:
        fdata = json.load(read) 
        if(uid in fdata):
            fdata[uid].append({"order_id": countNumberElement(fdata[uid])+1,"pid":data["pid"],"name":data["name"],"date":data["date"]
                               ,"time":data["time"],"quantity":data["quantity"],"total_price":data["total_price"]})
            with open('api/data/SalesData.json','w') as write:
                write.write(json.dumps(fdata))    
            return 'success'
        else:    
            return 'fail'
    