var user
var active_shopping_list

$(document).ready(function () {
    user = checkToken("login.html")
    getusers_shopingg_bag(user)
    
});

function getusers_shopingg_bag(user){
    fetch("http://localhost:8082/rest/mongodb/shoppingListings/findNotBoughtShoppingListings?username="+user).then(resp=>{ 
        if(resp.status == 200 ){

            resp.json().then(data =>{ 
                    console.log(data)
                    active_shopping_list = data.find(function(element) {
                        return element.bought == false
                    });
                   
                    data.forEach(element => {

                        element.productListings.forEach(el=>{
                            var p = el.product
                            draw_shopping_bag_product(p.id, p.imageURL1, p.name, Number(p.price), toInt(p.discount), p.brand.name,p.productType, el.count,el.product)
                           
                        })
                    }); 
            });
        }
    });
}

function add_shopping_listing(user){

    fetch("http://localhost:8082/rest/mongodb/shoppingListings/updateBought?username=" + user,  {
        method: 'PUT'
        }).then(resp=>{ 
        if(resp.status == 200 ){
            
            bootbox.dialog({ 
                title: 'Info window',
                message: 'You have just made a purchase, you can see the purchase history on the link below',
                size: 'large',
                onEscape: true,
                backdrop: true,
                buttons: {
                    fee: {
                        label: 'History',
                        className: 'btn-dark',
                        callback: function(){
                            window.location.href = "login.html"         
                        }
                    },
                    fi: {
                        label: 'Ok',
                        className: 'btn-dark',
                        callback: function(){
                            
                        }
                    }
                
                }
            })
          
        }
        else{
            bootbox.alert("Something went wrong, please try again!")
        }
        })
   

}
checkout.onclick = function(){
    add_shopping_listing(user)
}