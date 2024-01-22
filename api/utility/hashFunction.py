from datetime import *
# 20/12/2002
def hashDate(dateString):
    datehash = 0
    temp = dateString.split("-")
    datehash += int(temp[0])*372
    datehash += int(temp[1])*31
    datehash += int(temp[2])
    return datehash 

def hashTime(timeString):
    timehash = 0
    temp = timeString.split(":")
    timehash += int(temp[0])*24
    timehash += int(temp[1])*60
    timehash += int(temp[2])*60
    return timehash

def hashToday(todayString):
    datehash = 0
    temp = todayString.split("-")
    datehash += int(temp[0])*372
    datehash += int(temp[1])*31
    datehash += int(temp[2])
    return datehash 
def takeDDMM(dateString):
    result = ""
    temp = dateString.split("-")
    result = temp[2] + "/"
    result += temp[1]
    return result 
def convertStrToDate(dateString):
    temp = dateString.split("/")
    rdate = date(int(temp[2]),int(temp[1]),int(temp[0]))
    return rdate 

def ConvertHashToDate(value):
    date = ''
    year = int(value/372)
    month = int((value-year*372)/31)
    day = int((value - year*372 - month*31))
    date = str(year) +'-'+str(month) + '-' +str(day)
    return date