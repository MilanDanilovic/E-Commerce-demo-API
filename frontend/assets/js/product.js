function draw_product_in_catalog(product_id, product_img_url, pproduct_title, pproduct_price, discount, new_flag, product_type, product)
{   
    var user = localStorage.getItem("tokenLogin")
    const product_list = document.getElementById("product_list")
    const mainProduct = document.createElement("div")
    
    const singleProduct = document.createElement("div")


    mainProduct.classList.add("col-md-6", "col-lg-4", "col-xl-3", product_type)
    mainProduct.id = "mainp" + product_id.timestamp
    singleProduct.classList.add("single-product")
    singleProduct.id = "product-" + product_id.timestamp
    product_list.appendChild(mainProduct)

    mainProduct.appendChild(singleProduct)

    let product_img_and_buttons = document.createElement("div")
    product_img_and_buttons.classList.add("part-1", "popUpImg")
    product_img_and_buttons.style.backgroundSize = "auto 100%"
    product_img_and_buttons.style.backgroundRepeat = "no-repeat"
    product_img_and_buttons.style.backgroundPosition = "center"
    product_img_and_buttons.style.backgroundImage = 'url('+ product_img_url +')'
    
    let discount_new_span = document.createElement("span")
    if( Number(discount) > 0 ){
        
        discount_new_span.classList.add("discount")
        discount_new_span.innerHTML = discount +"% off"
        product_img_and_buttons.appendChild(discount_new_span)
    }
    else if(new_flag=="NEW"){
        discount_new_span.classList.add("new")
        discount_new_span.innerHTML = "new"
        product_img_and_buttons.appendChild(discount_new_span)
    }

    singleProduct.appendChild(product_img_and_buttons)

    let product_title_price = document.createElement("div")
    product_title_price.classList.add("part-2")
    
    singleProduct.appendChild(product_title_price)

    let butonsList = document.createElement("ul")
    product_img_and_buttons.appendChild(butonsList)

    let li_shopping_bag = document.createElement("li")
    let a_shopping_bag = document.createElement("a")

    a_shopping_bag.classList.add("unliked")

    a_shopping_bag.id = "a_shop_bag" + product_id
    a_shopping_bag.onclick = function(){
        if(user){
            if(a_shopping_bag.classList.contains("unliked"))
            {   
                
                update_product_list(product, 1, user)
                a_shopping_bag.classList.remove("unliked")
                a_shopping_bag.classList.add("liked")
                a_shopping_bag.innerHTML = "<i class=\"fas fa-shopping-cart\" style=\"color:red\"></i>"
                
                
            }
            else
            {
                a_shopping_bag.classList.replace("liked","unliked")
                a_shopping_bag.classList.remove("liked")
                a_shopping_bag.classList.add("unliked")
                a_shopping_bag.innerHTML = "<i class=\"fas fa-shopping-cart\"></i>"
                update_product_list(product, 0, user)
            }
        }
    }
    a_shopping_bag.innerHTML = "<i class=\"fas fa-shopping-cart\"></i>"
    li_shopping_bag.appendChild(a_shopping_bag)
    butonsList.appendChild(li_shopping_bag)

    let li_like = document.createElement("li")
    let a_like_product = document.createElement("a")
    a_like_product.id = "a_like_product" + product_id.timestamp
    a_like_product.classList.add("unliked")

    a_like_product.onclick = function(){
        if(user){
        if(a_like_product.classList.contains("unliked")){
            console.log("daaa1")
            a_like_product.classList.remove("unliked")
            a_like_product.classList.add("liked")

            add_product_in_user_whishlist(user, product)

        }
        else{
            a_like_product.classList.replace("liked", "unliked")
            delete_product_from_whish_list(product, user)
        }
        }
    }
    a_like_product.innerHTML = "<i class=\"fas fa-heart\"></i>"
    li_like.appendChild(a_like_product)
    butonsList.appendChild(li_like)

    let li_expand = document.createElement("li")
    let a_expand = document.createElement("a")
    a_expand.id = "a_expand" + product_id
    a_expand.onclick = function(){

        var modal = document.getElementById("myModal");
        var modalImg = document.getElementById("img01");

        modal.style.display = "block"
        modalImg.style.backgroundSize = "auto 100%"
        modalImg.style.backgroundRepeat = "no-repeat"
        modalImg.style.backgroundPosition = "center"
        modalImg.style.backgroundImage = 'url('+ product_img_url +')'

        var span = document.getElementsByClassName("closes")[0];
        span.onclick = function() { 
            modal.style.display = "none";
        }
    }

    a_expand.innerHTML = "<i class=\"fas fa-expand\"></i>"
    li_expand.appendChild(a_expand)
    butonsList.appendChild(li_expand)

    let product_title = document.createElement("h3")
    product_title.classList.add("product-title")
    product_title.style.cursor = "pointer"
    product_title.innerHTML = pproduct_title + "<a class=\"text-dark\" href= \"product-page.html?product_number=\""+product_id +"></a>"

    product_title.onclick = function(){ 
        console.log(pproduct_title)
        window.location.href = "product-page.html?name="+ pproduct_title
    }

    product_title_price.appendChild(product_title)

    let product_old_price = document.createElement("h4")
    product_old_price.classList.add("product-old-price")
    product_old_price.innerHTML = pproduct_price + "RSD"

    let product_price = document.createElement("h4")
    product_price.classList.add("product-price")

    if(Number(discount)!= 0)
    {
        product_title_price.appendChild(product_old_price)

        var numVal2 = Number(discount)/100;
        var totalValue = (pproduct_price - (pproduct_price * numVal2)).toFixed(2)
       
        product_price.innerHTML = totalValue + "RSD";
        
    }
    else
    {
        product_price.innerHTML = pproduct_price+"RSD";
    }
    product_title_price.appendChild(product_price)
}




function draw_shopping_bag_product(product_id, product_img_url, product_title, product_price, disc, product_brand, product_type, quantity, product){
    var user = localStorage.getItem("tokenLogin")
    var tpp = document.getElementById("product_total_price")
    var tp = document.getElementById("total_price")
    var sp = document.getElementById("ship_price")  
    //console.log(tpp.innerText)
    var total_prod_price = tpp.innerText? Number(tpp.innerText.match(/(\d+)/)[0]) : 0
    console.log("da")
    var total_price = tp.innerText? Number(tp.innerText.match(/(\d+)/)[0]): 0
    var ship_price = sp.innerText? Number(sp.innerText.match(/(\d+)/)[0]): 0

    if(Number(disc)!= 0)
    {

        var numVal2 = Number(disc)/100;
        var totalValue = (product_price - (product_price * numVal2)).toFixed(2)
       
        product_price = totalValue
        
    }

    tpp.innerText = total_prod_price + product_price*quantity + "RSD"
    tp.innerText = total_prod_price + product_price*quantity + ship_price +"RSD"


    const product_list = document.getElementById("product_sbag_list")
    const mainProduct = document.createElement("div")

    mainProduct.classList.add("product")
    mainProduct.id = product_id.timestamp
    product_list.appendChild(mainProduct)
    let prod_info_div = document.createElement("div")
    prod_info_div.classList.add("row" ,"justify-content-center", "align-items-center")
    mainProduct.appendChild(prod_info_div)

    let img_div = document.createElement("div")
    img_div.classList.add("col-md-3", "product-image")
    prod_info_div.appendChild(img_div)

    let img = document.createElement("img")
    img.classList.add("img-fluid" ,"d-block", "mx-auto", "image")
    img.src = product_img_url
    img_div.appendChild(img)

    let div_info = document.createElement("div")
    div_info.classList.add("col-md-5", "product-info")
    prod_info_div.appendChild(div_info)

    let a_product_title = document.createElement("a")
    a_product_title.classList.add("product-name", "text-dark", "fw-bold");
    a_product_title.href = "product-page.html?product_number="+product_id.timestamp
    a_product_title.innerHTML = product_title
    div_info.appendChild(a_product_title)

    let spec_div = document.createElement("div")
    spec_div.classList.add("product-specs")

    let brand_div = document.createElement("div")
    brand_div.innerHTML = "Brand:&nbsp;<span class=\"value\">"+ product_brand +"<span></div>"

    let type_div = document.createElement("div")
    type_div.innerHTML = "Type:&nbsp;<span class=\"value\">"+ product_type +"<span></div>"

    spec_div.appendChild(brand_div)
    spec_div.appendChild(type_div)

    div_info.appendChild(spec_div)

    let quantity_div = document.createElement("div")
    quantity_div.classList.add("col-6", "col-md-2", "quantity")
    quantity_div.innerHTML ="<label class=\"form-label d-none d-md-block\" for=\"quantity\">Quantity</label>"
    let inputQuantity = document.createElement("input")
    inputQuantity.type = "number"
    inputQuantity.min = 1
    inputQuantity.id = "number"+ product_id.timestamp
    inputQuantity.classList.add("form-control", "quantity-input")
    inputQuantity.value = quantity
    var oldVal = quantity

    inputQuantity.onchange = function(){

        price_div.innerHTML = product_price*inputQuantity.value + "RSD"
        console.log(product_price)
        total_prod_price = Number(tpp.innerText.match(/(\d+)/)[0])
        total_price = Number(tp.innerText.match(/(\d+)/)[0])
        ship_price = Number(sp.innerText.match(/(\d+)/)[0])
        if(oldVal < inputQuantity.value){
            tpp.innerText = (total_prod_price + product_price*(inputQuantity.value-oldVal) )+ "RSD"
            tp.innerText = (total_price + product_price * (inputQuantity.value-oldVal) )+ "RSD"
        }
        else if (oldVal > inputQuantity.value){
            tpp.innerText = (total_prod_price - product_price*(oldVal - inputQuantity.value) )+ "RSD"
            tp.innerText = (total_price - product_price*(oldVal - inputQuantity.value) )+ "RSD"
        }
        else{}
        oldVal = inputQuantity.value
        update_product_list(product, inputQuantity.value, user)
        
    }

    quantity_div.appendChild(inputQuantity)

    let price_div = document.createElement("div")
    price_div.classList.add("col-6", "col-md-2", "price", "pt-4")
    price_div.innerText = product_price*quantity + "RSD"

    prod_info_div.appendChild(quantity_div)
    prod_info_div.appendChild(price_div)

    
    let div_for_delete_butt = document.createElement("div")
    div_for_delete_butt.classList.add("row", "justify-content-end")
    prod_info_div.appendChild(div_for_delete_butt)

    let delete_button = document.createElement("button")
    delete_button.classList.add("btn", "btn-outline-dark", "btn-sm")
    delete_button.type = "button"
    delete_button.style = "max-width:fit-content;"
    delete_button.innerHTML = "<i class=\"fas fa-trash\"></i>"

    delete_button.onclick = function(){
        tpp.innerText = (total_prod_price - product_price*(oldVal - inputQuantity.value) )+ "RSD"
        tp.innerText = (total_price - product_price*(oldVal - inputQuantity.value) )+ "RSD"
        $("#"+ product.id.timestamp).empty();
        update_product_list(product, 0, user)
    }

    div_for_delete_butt.appendChild(delete_button)
    
}


function add_product_in_user_whishlist(user, product){
    console.log("da ovo")
    fetch("http://localhost:8082/rest/mongodb/wishlist/addWishlist?username="+user,  {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: 
        JSON.stringify
        ({
           
            id : product.id ,
            name: product.name,
            imageURL1: product.imageURL1,
            imageURL2: product.imageURL3,
            imageURL3: product.imageURL2,
            brand: product.brand,
            description: product.description,
            flagNew: product.flagNew,
            price:product.price,
            discount:product.discount,
            productType:product.productType

        })}).then(resp => {
            console.log(resp)
            if (resp.status == 200) {
                console.log()
            }
            else {

                
            }
        })
}

function delete_product_from_whish_list(product, user){
    
    fetch("http://localhost:8082/rest/mongodb/wishlist/deleteWishList?username=" + user , {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: 
        JSON.stringify
        ({
            id : product.id ,
            name: product.name,
            imageURL1: product.imageURL1,
            imageURL2: product.imageURL3,
            imageURL3: product.imageURL2,
            brand: product.brand,
            description: product.description,
            flagNew: product.flagNew,
            price:product.price,
            discount:product.discount,
            productType:product.productType

        })}).then(res => {
        if (res.status == 200){

        }else{
            bootbox.alert("Something went wrong, please try again")
        }
            
    })
}


function draw_purchased_product(product_id, product_img_url, product_title, product_price, disc, product_brand, product_type, quantity, product){
    var user = localStorage.getItem("tokenLogin")

    if(Number(disc)!= 0)
    {

        var numVal2 = Number(disc)/100;
        var totalValue = (product_price - (product_price * numVal2)).toFixed(2)
       
        product_price = totalValue
        
    }

    const product_list = document.getElementById("product_sbag_list")
    const mainProduct = document.createElement("div")

    mainProduct.classList.add("product")
    mainProduct.id = product_id.timestamp
    product_list.appendChild(mainProduct)
    let prod_info_div = document.createElement("div")
    prod_info_div.classList.add("row" ,"justify-content-center", "align-items-center")
    mainProduct.appendChild(prod_info_div)

    let img_div = document.createElement("div")
    img_div.classList.add("col-md-3", "product-image")
    prod_info_div.appendChild(img_div)

    let img = document.createElement("img")
    img.classList.add("img-fluid" ,"d-block", "mx-auto", "image")
    img.src = product_img_url
    img_div.appendChild(img)

    let div_info = document.createElement("div")
    div_info.classList.add("col-md-5", "product-info")
    prod_info_div.appendChild(div_info)

    let a_product_title = document.createElement("a")
    a_product_title.classList.add("product-name", "text-dark", "fw-bold");
    a_product_title.href = "product-page.html?product_number="+product_id.timestamp
    a_product_title.innerHTML = product_title
    div_info.appendChild(a_product_title)

    let spec_div = document.createElement("div")
    spec_div.classList.add("product-specs")

    let brand_div = document.createElement("div")
    brand_div.innerHTML = "Brand:&nbsp;<span class=\"value\">"+ product_brand +"<span></div>"

    let type_div = document.createElement("div")
    type_div.innerHTML = "Type:&nbsp;<span class=\"value\">"+ product_type +"<span></div>"

    spec_div.appendChild(brand_div)
    spec_div.appendChild(type_div)

    div_info.appendChild(spec_div)

    let price_div = document.createElement("div")
    price_div.classList.add("col-6", "col-md-2", "price", "pt-4")
    price_div.innerText = product_price*quantity + "RSD"

    prod_info_div.appendChild(price_div)

    
    


    
}
