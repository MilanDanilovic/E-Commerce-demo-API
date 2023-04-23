var user
var whish_list

$(document).ready(function () {
    user = checkToken("login.html")
    gel_user_whishlist(user)

});

function gel_user_whishlist(user){

    fetch("http://localhost:8082/rest/mongodb/wishlist/getWishlistByUsername?username=" + user).then(resp => {

        if (resp.status == 200) {
            console.log(resp)

            resp.json().then(data => {
               // console.log(data)

                data["productList"].forEach(el=>{
                    var p = el
                    console.log(p)
                    if(p.id!==null){
                        draw_product_in_catalog(p.id, p.imageURL1, p.name, Number(p.price), toInt(p.discount), p.flagNew, p.productType, p)
                        like_product(p.id.timestamp, user, p)
                    }
                    
                })
            });
        }
        else {

        }
    });
}

function like_product(id , user, p){
    var a_like_product = document.getElementById("a_like_product" + id)
    a_like_product.classList.remove("unliked")
    a_like_product.classList.add("liked")
    a_like_product.onclick = function(){
        
        if(a_like_product.classList.contains("unliked")){
            console.log("daaa1")
            a_like_product.classList.remove("unliked")
            a_like_product.classList.add("liked")
            console.log(a_like_product.classList)
            //add product in wish list /rest/mongodb/wishlist/addWishlis
        }
        else{
            a_like_product.classList.replace("liked", "unliked")
            document.getElementById("mainp" + id).remove()
            delete_product_from_whish_list(p, user) 
        }
    }
}

