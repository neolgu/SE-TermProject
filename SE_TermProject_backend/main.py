from flask import Flask, render_template, request
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# firebase 연동
cred = credentials.Certificate("se-back-end-firebase-adminsdk.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://se-back-end.firebaseio.com/'
})
# 디비 위치 지정
ref = db.reference()

app = Flask(__name__)


def dict_to_str(ordereddict):
    string = "<p>"
    for x in ordereddict:
        string += str(ordereddict[x]) + "<br>"

    return string + "</p>"


@app.route("/")
def login():
    return render_template('login.html')


@app.route('/result', methods=['POST'])
def post():
    values = [request.form['id'], request.form['pw']]
    asdf = ""
    asdf += str(values[0]) + '\n'
    asdf += str(values[1])

    return asdf


@app.route('/customer')
def customer():
    customer_data = ref.child('Customer').order_by_child('name').get()
    # 검색은 equalto
    # customer_data = ref.child('Customer').order_by_child('name').equal_to('이름').get()

    return dict_to_str(customer_data)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port="8080")
