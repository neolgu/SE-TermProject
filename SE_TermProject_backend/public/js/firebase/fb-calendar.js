
function getSchedules() {

    db.collection("Reservation").orderBy("time").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
			scheduleDBData.push(doc.data());

            calendar.addEvent({
                'title': doc.data()["patientName"] + "\n Dr." + doc.data()["docName"] + "\n Time:" + doc.data()["time"],
                'start': doc.data()["date"],
                'end': doc.data()["date"],
                'id': doc.id,
                'date':doc.data()["date"]
            });

            events = calendar.getEvents();
        });
    });
}

function addSchedule() {

    var name = document.getElementById("Name").value;
    var date = document.getElementById("Date").value;
    var time = document.getElementById("Time").value;
    var dr = document.getElementById("Doctor").value;

    if (name != "" && date != "" && time != "" && dr != "") {
        db.collection("Reservation").add({
            "date": date,
            "docName": dr,
            "patientName": name,
            "time": time,
            "state": "",
        }).then(function () {
            window.location.reload();
        });
    }

}

function editSchedule(id) {

    var name = document.getElementById("Name_edit").value;
    var date = document.getElementById("Date_edit").value;
    var time = document.getElementById("Time_edit").value;
    var dr = document.getElementById("Doctor_edit").value;

    if (name != "" && date != "" && time != "" && dr != "") {
        db.collection("Reservation").doc(id).set({
            "date": date,
            "docName": dr,
            "patientName": name,
            "time": time,
            "state": "",
        }).then(function () {
            window.location.reload();
        });
    }
}

function deleteSchedule(id) {

    db.collection("Reservation").doc(id).delete().then(function () {
        window.location.reload();
    });
}

function filterEvent(drName){
	if(!isfilted){
		calendar.removeAllEvents();
		for(value of events){

			var data = value._def["title"].split("\n");
			docName = data[1].substring(4, data[1].len);

			if(docName == drName) {
			calendar.addEvent(value);
			}
		}
		isfilted = true;
	}
	else {
		calendar.removeAllEvents();

		for(value of events){
			calendar.addEvent(value);
		}

		isfilted = false;
	}
}

var db = firebase.firestore();
var scheduleDBData = new Array();
var schedules = new Array();
getSchedules();

var isfilted = false;
