

const $bookingStatus = document.querySelector('.main-cal-booking-tbody');
/**
 * initApp handles setting up UI event listeners
 */
function addBooking(number, name, doc, time, date) {
    var now = new Date();
    var schTime = new Date(date + " " + time);
    var gap = now.getTime() - schTime.getTime();

    var status;
    var color;

    if (gap > 0) {
        color = "blue";
        status = "완료";
    } else if (gap/1000/60 >= -30) {
        color = "green"
        status = "진행중";
    } else {
        color = "orange";
        status = "예정";
    }

    let tmp_html = `<tr>\
            <td>${number}</td>\
            <td>${name}</td>\
            <td><span class="label bg-${color}">${status}</span></td>\
            <td>${doc}</td>\
            <td>${time}</span></td>\
        </tr>`;
    $('#reservation-status').append(tmp_html);
}
 
function reloadTodo(date){
    $('#reservation-status').html('');
    var index=0;

    // query from firestore
    db.collection("Reservation").where("date", "==", date).orderBy("time").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            fieldData = doc.data();
            //console.log(fieldData);
            addBooking(++index, fieldData["patientName"], fieldData["docName"], fieldData["time"], date);
        });
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

var db = firebase.firestore();