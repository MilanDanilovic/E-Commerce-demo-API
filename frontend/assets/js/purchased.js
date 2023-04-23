var user
var active_shopping_list

$(document).ready(function () {
    user = checkToken("login.html")
    getuser_purchased_items(user)
    
});

function getuser_purchased_items(user){
    fetch("http://localhost:8082/rest/mongodb/shoppingListings/findBoughtShoppingListings?username="+user).then(resp=>{ 
        if(resp.status == 200 ){

            resp.json().then(data =>{ 
                    console.log(data)
                    active_shopping_list = data.find(function(element) {
                        return element.bought == false
                    });
                   
                    data.forEach(element => {

                        element.productListings.forEach(el=>{
                            var p = el.product
                            draw_purchased_product(p.id, p.imageURL1, p.name, Number(p.price), toInt(p.discount), p.brand.name,p.productType, el.count,el.product)
                           
                        })
                    }); 
            });
        }
    });
}
