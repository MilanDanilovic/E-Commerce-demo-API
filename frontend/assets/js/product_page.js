$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search)
    var product_name
    var user = localStorage.getItem("tokenLogin")
    if(!user){
        $(".logged").each(function(){
            $(this).hide()
        });
        $(".visitor").each(function(){
            $(this).show()
        });
    }
    else
    {
        $(".logged").each(function(){
            $(this).show()
        });
        $(".visitor").each(function(){
            $(this).hide()
        });
    }

    
    if(urlParams.has('name'))
    {
        product_name = urlParams.get('name');
    }

   
    
   fill_up_product_page(product_name)

})

function fill_up_product_page(name){
    var product_title, product_desc, product_type, product_brand, brand_desc, product_price, discount, newFlag, img1, img2, img3, brand_img
    fetch("http://localhost:8082/rest/mongodb/product/findProductByName?name="+name).then(resp=>{ 
             
        if(resp.status == 200 ){
            resp.json().then(data =>
            {
                product_title = data["name"]
                product_desc = data["description"]
                product_type = data["productType"]
                product_price = Number(data["price"])
                discount = toInt(data["discount"])
                newFlag = data["flagNew"]
                img1 = data["imageURL1"]
                img2 = data["imageURL2"]
                img3 = data["imageURL3"]

                product_brand = data["brand"]["name"]
                brand_desc = data["brand"]["description"]
                brand_img = data.brand["logo"]


                document.getElementById("product_title").innerHTML = product_title

                var numVal2, price_with_discount
                if(Number(discount)!= 0)
                {
                    numVal2 = Number(discount)/100;
                    price_with_discount = product_price - (product_price * numVal2)

                    var old_price = document.getElementById("product_price_old")
                    old_price.removeAttribute("hidden")
                    old_price.innerHTML = "<del>" + product_price + "RSD</del>"

                    product_price = price_with_discount
                    document.getElementById("product_price").innerHTML = price_with_discount + "RSD"

                    var discount_span = document.getElementById("discount")
                    discount_span.removeAttribute("hidden")
                    discount_span.innerHTML = " "+ discount +"% off"
                }
                else
                {
                    document.getElementById("product_price").innerHTML = product_price + "RSD"
                }
                if(newFlag)
                {
                    document.getElementById("new").removeAttribute('hidden');
                }
                document.querySelector(".zoomed-image").style.backgroundImage = "url("+ img1 +");" // background-size: contain; background-position: left center;"
                document.querySelectorAll(".product_img1").forEach(el =>{el.src = img1})
                document.getElementById("product_img2").click()
                document.getElementById("product_img2").src = img2
                document.getElementById("product_img3").src = img3
                document.getElementById("product_desc").innerHTML = product_desc

                document.getElementById("brandimg").src = brand_img
                document.getElementById("brand_desc").innerHTML = brand_desc

                document.getElementById("brand_name").innerHTML = product_brand
                document.getElementById("product_type").innerHTML = product_type

                fil_up_related_items(product_type)    
            
            })
        }else{
            //location.href = "404.html"
        }
    })  
}



//ako moze da se dobiju 3 podatka iz baze samo za odredjeni tip, onda ta stvar

function fil_up_related_items(product_type){
    fetch("http://localhost:8082/rest/mongodb/product/findProductByProductTypeThree?productType="+ product_type)
    .then(resp=>{ 
             
        if(resp.status == 200 ){
            resp.json().then(data =>
            {
               

                var images = document.querySelectorAll(".related-img")
                
                if(data.length>0)
                images[0].src = data[0].imageURL1
                if(data.length>=2)
                images[1].src = data[1].imageURL1
                if(data.length==3 )
                images[2].src = data[2].imageURL1
                var elements = document.querySelectorAll(".related-name-a");
                
                if(data.length>0)
                elements[0].href =  "product-page.html?name="+ data[0].name
                if(data.length>=2)
                elements[1].href =  "product-page.html?name="+ data[1].name
                if(data.length==3 )
                elements[2].href =  "product-page.html?name="+ data[2].name
                if(data.length>0)
                elements[0].innerHTML =  data[0].name
                if(data.length>=2)
                elements[1].innerHTML =  data[1].name
                if(data.length==3 )
                elements[2].innerHTML =  data[2].name
                
                var prices = document.querySelectorAll(".related-price") 
                if(data.length>0)
                prices[0].innerHTML =  data[0].price + "RSD" 
                if(data.length>=2)
                prices[1].innerHTML =  data[1].price + "RSD" 
                if(data.length==3 )
                prices[2].innerHTML =  data[2].price + "RSD" 
            })
        }
        else{
            location.href = "404.html"
        }
    })  

}
