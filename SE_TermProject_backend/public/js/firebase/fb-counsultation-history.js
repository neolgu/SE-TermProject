
const customerName = document.getElementById('txt1_cus');
const customerBirth = document.getElementById('birth_cus');
const customerPhoneNo = document.getElementById('phone_cus');
const consultationDate = document.getElementById('now_date_cus');
const type_T = document.getElementById('treatment_cus');
const type_B = document.getElementById('beauty_cus');
const counselor = document.getElementById('txt6_cus');
const title = document.getElementById('txt7_cus');
const content = document.getElementById('txt8_cus');
var customerID;
var historyID;
function addConsultation(evt){
    evt.preventDefault();
    db.collection("Customer")
    .where("customerName","==",customerName.value)
    .where("customerBirth","==",customerBirth.value)
    .where("customerPhoneNo","==",customerPhoneNo.value)
    .get()
    .then(function (querySnapshot){
       querySnapshot.forEach(function (doc){
            
            var postData={
                customerName: customerName.value,
                customerBirth: customerBirth.value,
                customerPhone: customerPhoneNo.value,
                customerId:doc.ref.id,
                consultationDate: consultationDate.value,
                type: {
                    treatment:type_T.checked,
                    beauty:type_B.checked
                },
                counselor: counselor.value,
                title: title.value,
                content: content.value
            };
            //고객기록 히스토리 값 오려주기
            db.collection("Customer")
            .doc(doc.ref.id)
            .get()
            .then((docRef)=>{
                var consultingVal = Number(docRef.data()['consulting']);
                consultingVal = consultingVal + 1;
                db.collection("Customer")
                .doc(doc.ref.id)
                .update({
                    consulting:consultingVal
                })
                .then(()=>{
                    console.log("consulting history added in customer information");
                })
                .catch((error)=>{
                    alert(error+"added History Number");
                })

            })
            .catch((error)=>{
                alert(error);
            });

            db.collection("History")
            .add(postData)
            .then(function(docRef) {
                alert("successfully added");
                console.log('Added document withID: ',docRef.id );
                allClear();
            })
            .catch(function(error){
                alert("Error adding document: ",error);
            });
            console.log(customerBirth.value,customerName.value,consultationDate.value,type_B.checked,type_T.checked,counselor.value,title.value,content.value);
        })
    })
    .catch(function(error){
        alert(error);
    });
    

}
function customerList(id,number,name,birth,phone){
    let tmp_html = `<tr id="${id}" class="tdcls">\
        <td>${number}</td>\
        <td>${name}</td>\
        <td>${birth}</td>\
        <td>${phone}</td>\
    </tr>`;
    $("#customer-lists").append(tmp_html);
    
}
function HistoryList(id,number,title,date){
    let tmp_html = `<tr id="${id}">\
        <td>${number}</td>\
        <td>${title}</td>\
        <td>${date}</td>\
    </tr>`;
    $("#history-lists").append(tmp_html);
    
}
function searchCustomer(){
    $("#customer-lists").html("");
    var index=0;
    var name = $("#search-name").val();
    var birth = $("#search-birth").val();
    
    db.collection("Customer").where("customerName","==",name).where("customerBirth","==",birth).get()
    .then(function (querySnapshot){
       querySnapshot.forEach(function (doc){
            data = doc.data();
            customerList(doc.ref.id,++index,data["customerName"],data["customerBirth"],data["customerPhoneNo"]);
       })
       $("#search-name").val("");
       $("#search-birth").val("");
    })
    .catch(function(error){
        alert(error);
    });
}

function allClear(){
    $('#txt1_cus').val("");
    $('#birth_cus').val("");
    $('#phone_cus').val("");
    $('#now_date_cus').val("");
    $('#treatment_cus').val("");
    $('#beauty_cus').val("");
    $('#txt6_cus').val("");
    $('#txt7_cus').val("");
    $('#txt8_cus').val("");
}

$("#customer-lists").on("click", "tr", function() { 
    
    var id = $(this).attr('id');
    customerID = id;
    db.collection("History").where("customerId","==",id)
    .onSnapshot(function (querySnapshot){
        $("#history-lists").html("");
        var index=0;
        console.log(querySnapshot);
        querySnapshot.forEach(function (doc){
             data = doc.data();
             HistoryList(doc.ref.id,++index,data["title"],data["consultationDate"]);
        })
     })
    
});

function clearConsulting(){
    $("#txt1").val("");
    $("#birth").val("");
    $("#now_date").val("");
    $("#treatment").prop("checked",false);
    $("#beauty").prop("checked",false);
    $("#txt6").val("");
    $("#txt7").val("");
    $("#txt8").val("");
}

$("#history-lists").on("click", "tr", function() { 
    var id = $(this).attr('id');
    historyID=id;
    db.collection("History")
    .doc(id)
    .get()
    .then((docRef)=>{
        data = docRef.data();
        $("#txt1").val(data["customerName"]);
        $("#birth").val(data["customerBirth"]);
        $("#now_date").val(data["consultationDate"]);
        $("#treatment").prop("checked",data["type"]["treatment"]);
        $("#beauty").prop("checked",data["type"]["beauty"]);
        $("#txt6").val(data["counselor"]);
        $("#txt7").val(data["title"]);
        $("#txt8").val(data["content"]);
    })
    .catch((error)=>{
        alert("error in select_customer");
    })
});
function editConsultation() {
    document.getElementById("edit-consultation-btn").style="display:block"      
    document.getElementById("complete-btn").style="display:block"
        document.getElementById("edit-consultation-btn").background= "blue";
        var oEle1 = document.getElementById('txt1') ;
        oEle1.readOnly = false ;
        var oEle2 = document.getElementById('now_date') ;
        oEle2.readOnly = false ;
        var oEle3 = document.getElementById('birth') ;
        oEle3.readOnly = false ;
        var oEle4 = document.getElementById('treatment') ;
        oEle4.onclick=true;
        var oEle5 = document.getElementById('beauty') ;
        oEle5.onclick=true;
        var oEle6 = document.getElementById('txt6') ;
        oEle6.readOnly = false ;
        var oEle7 = document.getElementById('txt7') ;
        oEle7.readOnly = false ;
        var oEle8 = document.getElementById('txt8') ;
        oEle8.readOnly = false ;                                 
                 
}

function deleteConsultation(){
    
    db.collection("History")
    .doc(historyID)
    .delete()
    .then(()=>{
        alert("successfully deleted");
        console.log("successfully deleted");
    })
    .catch(function(error){
        console.log(error);
    }); 

    db.collection("Customer")
    .doc(customerID)
    .get()
    .then((docRef)=>{
        var consultingVal = Number(docRef.data()['consulting']);
        consultingVal = consultingVal - 1;
        db.collection("Customer")
        .doc(customerID)
        .update({
            consulting:consultingVal
        })
        .then(()=>{
            console.log("consulting history deleted from customer information");
        })
        .catch((error)=>{
            alert(error+"delete History Number");
        })

    })
    .catch((error)=>{
        alert(error);
    });

    clearConsulting();
    back_to_list();
}

function back_to_list() {
    document.getElementById("history_form").style="display:none"
    document.getElementById("history_list").style="display:block"
}
function edit_complete() {
    document.getElementById("complete-btn").style="display:block"
    db.collection("History")
        .doc(historyID)
        .update({
            customerName: $("#txt1").val(),
            customerBirth: $("#birth").val(),
            customerPhone: $("#txt1").val(),
            consultationDate: $("#now_date").val(),
            type: {
                treatment:$("#treatment").is(":checked"),
                beauty:$("#beauty").is(":checked")
            },
            counselor: $("#txt6").val(),
            title: $("#txt7").val(),
            content: $("#txt8").val()                  
        })
        .then((docRef)=>{
            alert("succesfully updated");
        })
         .catch(function(error){
            alert(error);
        });
    
}

window.onload = function () {
    document.getElementById('add-consultation-btn').addEventListener('click', addConsultation,false);
    document.getElementById('search-btn').addEventListener('click', searchCustomer,false);
    document.getElementById('edit-consultation-btn').addEventListener('click', editConsultation,false);
    document.getElementById('delete-consultation-btn').addEventListener('click', deleteConsultation,false);
    document.getElementById('show_list_btn').addEventListener('click', back_to_list,false);
    document.getElementById('complete-btn').addEventListener('click', edit_complete,false);
    
}

var db = firebase.firestore();