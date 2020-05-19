from flask import Flask

app = Flask(__name__)
@app.route("/")
def hello():
    return "<h1>Hello World!</h1>"

@app.route("/hello")
def hello_flask():
    return "<h1>Hello Flask!</h1>"

@app.route("/first")
def hello_first():
    return "<h3>Hello First!</h3>"

if __name__ == "__main__":
    app.run(host="127.0.0.1", port="8080")

