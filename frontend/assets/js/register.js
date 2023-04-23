(function () {
    'use strict'
  
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form){

      form.addEventListener('submit', function (event) {
        
        if (!form.checkValidity() ) {
          event.preventDefault()
          event.stopPropagation()
        }
        else if(document.getElementById("examplePasswordInput").value  != document.getElementById("exampleRepeatPasswordInputa").value){
            console.log(document.getElementById("exampleRepeatPasswordInputa").value, document.getElementById("examplePasswordInput").value )
            document.getElementById("exampleRepeatPasswordInputa").classList.add("invalid");
            document.getElementById("exampleRepeatPasswordInputa").value="";
            event.preventDefault()
            event.stopPropagation()
        }
        else {
            event.preventDefault();
           
            var lastName = document.getElementById("exampleFirstName").value;
            var firstName = document.getElementById("exampleLastName").value;
            var username = document.getElementById("exampleUsername").value;
            var password = document.getElementById("examplePasswordInput").value;
            var Email = document.getElementById("exampleInputEmail").value;
      
            console.log(lastName,firstName,password ,Email);
            
            fetch("http://localhost:8082/rest/mongodb/user/addUser",{
            method:'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
                firstName: lastName,
                lastName: firstName,
                username: username,
                email: Email,
                password:password,
                role:"USER",
                shoppingListings:[],
                wishList:[]
                })

            }
            ).then(resp => {
                console.log(resp.status)
                if (resp.status == 200) {
                  bootbox.alert({ 
                    message: "Your account has been successfully created! You can login now!",
                    callback: function(){ location.href = "login.html"; }    
                  });
                  
                }  
                else
                {
                    location.href = '404.html';
                }    
          });
        }
        form.classList.add('was-validated')
           
         }, false)

    })

})()
