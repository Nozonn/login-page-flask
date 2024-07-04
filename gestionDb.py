import sqlite3


class DataBase:
    def __init__(self, db:str) -> None:
        self.conn = sqlite3.connect(db)
        self.cursor = self.conn.cursor()
        self.cursor.execute("""
                CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
                username TEXT UNIQUE, 
                email TEXT,
                age INTEGER,
                password TEXT
                )""")
        
    def add(self, data:list) -> None:
        try:
            for d in data:
                self.cursor.execute("""
                    INSERT INTO users 
                    (username, email, age, password) VALUES (?,?,?,?)
                    """, d)
        except sqlite3.IntegrityError:
            pass
        finally:
            self.conn.commit()

    def select(self, selection:str, filter:str="") -> list:
        self.cursor.execute(f"SELECT {selection} FROM users {filter}")
        return [user for user in self.cursor]

    def deleteUser(self, username:str) -> None:
        self.cursor.execute("DELETE FROM users WHERE username = ?", (username,))
        self.conn.commit()

    def resetTable(self) -> None:
        self.cursor.execute("DROP TABLE users")

    def __del__(self) -> None:
        self.cursor.close()
        self.conn.close()


pathDb = "users.db"

