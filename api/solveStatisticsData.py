from datetime import *
import json
from utility.hashFunction import hashDate, ConvertHashToDate
from utility.heapSort import heapSort
class StatisticsData:
    global uid      
    global data
    data = {}
    global revenueEachDay
    revenueEachDay= {}

    #1
    def CalculateData(inputdata,userid):
        lineData = []
        global uid
        global arraycount
        uid = userid
        data = inputdata
        for element in data:
            index = hashDate(element['date'])
            listoflabel = list(revenueEachDay)
            if( index not in listoflabel):
                revenueEachDay.update({index:element['total_price']})
            else:
                revenueEachDay[index] += element['total_price']
        listindex = list(revenueEachDay)
        heapSort(listindex)
        for element in listindex:
            lineData.append({"day":ConvertHashToDate(element),"value":revenueEachDay[element]})
        with open('api/data/Calculate/LineData.json','w+') as f:
            json.dump(lineData,f)
        return lineData

    def reset():
        global data
        data = {}
        global revenueEachDay
        revenueEachDay = {}
        return True