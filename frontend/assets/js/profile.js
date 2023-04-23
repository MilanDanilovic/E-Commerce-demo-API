var user
$(document).ready(function () {
    user = checkToken("login.html")
    fill_up_user_info(user)

});

$("#izmeni-profil-btn").click(function(){
    $('.hidden-edit-profile').toggle()     
})

$("#cancel-izmeni-profil").click(function(){
    $('.hidden-edit-profile').toggle() 
})

$("#potvrdiPromenuIP").click(function(){

    var ime;
    var prezime;
    ime = $("#first_name").val();
    prezime = $("#last_name").val();
    fetch("http://localhost:8082/rest/mongodb/user/updateUser?username=" + user +"&firstname=" + ime + "&lastname="+prezime , {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        }
    }).then(resp => {
        if (resp.status == 200) {
            $("#izmeni-profil").fadeOut();
            bootbox.alert("Ime i Prezime uspesno promenjeni!")
        }
        else {
            
        }
    })

    return false;

})


$("#promeni-sifru-btn").on('click', function (e) {
    $('.hidden-edit-pass').toggle();
})

$("#cancel-promeni-sifru").click(function(){
    $('.hidden-edit-pass').toggle();
})

$("#potvrdiPromenuSifre").click(function(){
    var nova;
    var nova2;
    nova = $("#newPassword").val();
    nova2 = $("#repeatPassword").val();
    var username = localStorage.getItem("tokenLogin")
    if (nova != nova2) {
        bootbox.alert("Niste uleli isto lozinku 2 puta!");
        $("#repeatPassword").val() = ""

    }
    else {
        fetch("http://localhost:8082/rest/mongodb/user/updateUserPassword?username=" + username +"&password="+ nova ,  {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            }
        }
        ).then(resp => {
            if (resp.status == 200) {
                $("#oldpassword").val(nova)
                $("#newPassword").val( ". . .");
                $("#repeatPassword").val(". . .");
                $("#promeni-sifru").fadeOut();
            }
            else {

               
            }
        })
    }
    return false;
});

function fill_up_user_info(user){
    var user = localStorage.getItem("tokenLogin");
    
    fetch("http://localhost:8082/rest/mongodb/user/getUser?username=" + user).then(resp => {

        if (resp.status == 200) {
            resp.json().then(data => {
                console.log(data)
                document.getElementById("name").innerHTML = data['firstName'] + " "+data['lastName'];
                document.getElementById("username").innerHTML = "@" + data['username'];
                document.getElementById("email").innerHTML = data['email'];
                document.getElementById("first_name").value = data['firstName'];
                document.getElementById("last_name").value = data['lastName'];
                document.getElementById("oldpassword").value = data['password'];
            });
        }
        else {

        }
    });
}


