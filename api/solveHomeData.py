from datetime import *
import json
from utility.hashFunction import hashDate, hashToday,takeDDMM

def growth_of(num_a, num_b):
        return ((num_a / num_b) * 100 - 100)

class HomeData:
    global uid      
    global data
    data = {}
    global arraycount 
    arraycount = [0]*1000
    global revenueEachDay
    revenueEachDay= {}
    global revenueToDate
    revenueToDate = {}

    
    #1
    def CalculateData(inputdata,userid):
        global uid
        uid = userid
        data = inputdata
        for element in data:
            arraycount[element['pid']] += element['quantity']
            index = hashDate(element['date'])
            listoflabel = list(revenueEachDay)
            if( index not in listoflabel):
                revenueEachDay.update({index:element['total_price']})
            else:
                revenueEachDay[index] += element['total_price']
            sorted(revenueEachDay)
        return revenueEachDay
    #2
    def CalculateDateInteVal():
        listindex = list(revenueEachDay)
        listindex.sort()
        min = listindex[0]
        max = hashToday(str(date.today()))

        revenueToDate.update({min:revenueEachDay[min]})
        for index in range(min+1,max+1,1):
            if(index not in listindex):
                revenueToDate.update({index:0+revenueToDate[index-1]})
            else:
                revenueToDate.update({index:revenueEachDay[index]+revenueToDate[index-1]})
        return revenueToDate


    def calculateDaily():
        today = date.today()
        yesterday = today - timedelta(days=1)
        todayindex = hashToday(str(today))
        yestindex = hashToday(str(yesterday))
        listindex = list(revenueEachDay)
        if(todayindex in listindex):
            if(yestindex in listindex): 
                return {"daily":revenueEachDay[todayindex],
                        "dailygrowth":round(growth_of(revenueEachDay[todayindex],revenueEachDay[yestindex]),2)}
            else:
                return {"daily":revenueEachDay[todayindex],"dailygrowth":100}
        else:
            return {"daily":0,"dailygrowth":-100}
        
    def calculateMonthly():
        today = date.today()
        firstDay = today.replace(day=1)
        lastDayLastMonth = firstDay - timedelta(days=1)
        firstDayLastMonth = lastDayLastMonth.replace(day=1)
        todayIndex = hashToday(str(today))
        firstthismonthIndex = hashToday(str(firstDay))
        lastDayIndex = hashToday(str(lastDayLastMonth))
        firstDayIndex = hashToday(str(firstDayLastMonth))
    
        thismonth = revenueToDate[todayIndex] -revenueToDate[firstthismonthIndex]
        lastmonth = revenueToDate[lastDayIndex] -revenueToDate[firstDayIndex]
        if(thismonth == 0):
            return {"monthly":thismonth,"monthlygrowth":0}
        elif (lastmonth == 0):
            return {"monthly":thismonth,"monthlygrowth":100}
        else:
            return {"monthly":thismonth,"monthlygrowth":round(growth_of(thismonth,lastmonth),2)}

    def calculateAnnually():
        today = date.today()
        today_Index = hashToday(str(today))
        first_day_of_year = today.replace(month=1,day=1)
        first_day_index = hashToday(str(first_day_of_year))
        last_day_last_year = first_day_of_year - timedelta(days=1)
        l_day_last_index = hashToday(str(last_day_last_year))
        first_day_last_year = last_day_last_year.replace(month=1,day=1)
        f_day_last_index = hashToday(str(first_day_last_year))
        
        thisyear = revenueToDate[today_Index] - revenueToDate[first_day_index]
        lastyear = revenueToDate[l_day_last_index] - revenueToDate[f_day_last_index]
        if(thisyear == 0):
            return {"year":thisyear,"yeargrowth":0}
        elif (lastyear == 0):
            return {"year":thisyear,"yeargrowth":100}
        else:
            return {"year":thisyear,"yeargrowth":round(growth_of(thisyear,lastyear),2)}
        

    def calculateWeekly():
        weekdate = {}
        today = date.today()
        index = hashToday(str(today))
        listindex = list(revenueEachDay)
        if(index in listindex):
            weekdate.update({0:{"value":revenueEachDay[index],"day":takeDDMM(str(today))}})
        else:
            weekdate.update({0:{"value":0,"day":takeDDMM(str(today))}})
        for i in range(1,7,1):
            day = today - timedelta(days=i)
            index = hashToday(str(day))
            if(index in listindex):
                weekdate.update({i:{"value":revenueEachDay[index],"day":takeDDMM(str(day))}})
            else:
                weekdate.update({i:{"value":0,"day":takeDDMM(str(day))}})
        return weekdate

    def calculateMostSold():
        i = 1
        maxelement = 0
        index = 0
        for i in range(1,len(arraycount),1):
            if arraycount[i] > maxelement:
                maxelement = arraycount[i]
                index = i
        name = ''
        with open('api/data/ProductData.json','r') as read:
            global uid
            data = json.load(read)
            if(uid in data):
                data = data[uid]
            else:
                return {"most":maxelement,"product":''}
            for element in data:
                if element['pid'] == index:
                    name = element['name']
            return {"most":maxelement,"product":name}

    def reset():
        global arraycount
        data.clear()
        arraycount.clear()
        arraycount = [0]*1000
        revenueEachDay.clear()
        revenueToDate.clear()
        return True