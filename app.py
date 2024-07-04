from flask import Flask, render_template, request, redirect, flash
from authentification import *

app = Flask(__name__)
app.config["SECRET_KEY"] = "a34545dq242gdsgd"

usr, pwd = "", ""
error = False
usernameUsed = False

@app.route("/", methods=["POST", "GET"])
def index() :
    global usr, pwd, error, usernameUsed
    usr, pwd = "", ""

    return render_template("index.html", error=error, usernameUsed=usernameUsed)


@app.route("/login", methods=["GET", "POST"])
def login():
    global usr, pwd, error

    usr, pwd = "", ""
    error = False

    if request.method == "POST":
        data = request.form
        if (connexion(data["username"], data["password"])):
            usr, pwd = data["username"], data["password"]
            return redirect(f"/home")
        else:
            error = True

    return redirect("/")


@app.route("/signin", methods=["GET", "POST"])
def signin():
    global usr, pwd, usernameUsed
    usr, pwd, usernameUsed = "", "", ""

    if request.method == "POST":
        if isUsernameUsed(request.form["username"]):
            usernameUsed = True
            return redirect("/")

        usr = request.form["username"]
        data = [tuple(request.form.values())]
        addUser(data)

        print(request.form)
        return redirect("/home")

    return redirect("/")

@app.route("/home", methods=["POST", "GET"])
def home():
    if (usr == "" and pwd == ""):
        return redirect("/")

    if not isUsernameUsed(usr):
        return redirect("/")

    return render_template("home.html", name=usr)


@app.route("/<name>/deleteAccount", methods=("POST",))
def deleteAccount(name):
    delUser(name)
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)