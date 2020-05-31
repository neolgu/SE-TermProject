from flask import Flask, render_template, request
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# firebase 연동
cred = credentials.Certificate("se-back-end-firebase-adminsdk.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://se-back-end.firebaseio.com/'
})

# # 디비 위치 지정
# ref = db.reference()
# # 추가
# ref.update({"이름": "값의 형태"})
# # 받아오기
# data = ref.get()

app = Flask(__name__)


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


if __name__ == "__main__":
    app.run(host='0.0.0.0', port="8080")
