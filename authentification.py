import sqlite3
from gestionDb import DataBase, pathDb

def connexion(usr:str, pwd:str) -> bool:
    db = DataBase(pathDb)
    lstUsr = db.select("username, password")
    for userData in lstUsr:
        if (usr == userData[0] and pwd == userData[1]):
            return True
    return False


def isUsernameUsed(usr:str) -> bool:
    db = DataBase(pathDb)
    usernames = db.select("username")
    usernames = [ name[0] for name in usernames]

    if usr in usernames:
        return True
    return False


def addUser(data:list) -> None:
    db = DataBase(pathDb)
    db.add(data)


def delUser(usr:str) -> None:
    db = DataBase(pathDb)
    db.deleteUser(usr)