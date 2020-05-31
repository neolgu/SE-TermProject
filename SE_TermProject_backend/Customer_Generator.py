import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# firebase 연동
cred = credentials.Certificate("se-back-end-firebase-adminsdk.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://se-back-end.firebaseio.com/'
})

user = {'name': '고길동',
        'group': '일반',
        'birth': '990112',
        'phone': '010-1234-1231',
        'address': '서울',
        'regi_date': '2020-05-31',
        'memo': '코리안 소드마스터',
        'rank': '일반',
        'point': 0}

# 디비 위치 지정
ref = db.reference()

# ref.child('Customer').push(user)
# data = ref.child('Customer').order_by_child('name').equal_to(user['name']).get()
# print(data)
