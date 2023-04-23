var user
var loaded = 0
var load_more_step = 8
var products_data = new Array()
var checked_type_list = new Array()
var brands = 

$(document).ready(function () {
    user = localStorage.getItem("tokenLogin")
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
    
    draw_brand_filters()
    get_latest_products()
    
})

function get_latest_products(){
    fetch("http://localhost:8082/rest/mongodb/product/getAll").then(resp=>{ 
        if(resp.status == 200 ){
            resp.json().then(data =>{  
                loaded = 0;
                $("#product_list").empty()
                products_data = data
                products_data.reverse()
                show_products(data)
            })
        }
    });
}

function get_type_products(type){

    fetch("http://localhost:8082/rest/mongodb/product/findProductByProductType?productType="+ type).then(resp=>{ 
        if(resp.status == 200 ){
            resp.json().then(data =>{
                loaded = 0;
                $("#product_list").empty()
                products_data = data
                products_data.reverse()
                show_products(products_data)      
            })
        }
    });

}

function get_brand_products(brand){

    fetch("http://localhost:8082/rest/mongodb/product/findProductByBrand?name="+ brand).then(resp=>{ 
        if(resp.status == 200 ){
            resp.json().then(data =>{
                loaded = 0;
                $("#product_list").empty()
                products_data = data
                products_data.reverse()
                show_products(products_data)      
            })
        }
    });

}

function show_products(products_data){
    products_data.forEach(item => {
        console.log(item)
        if(products_data.indexOf(item) >= loaded && products_data.indexOf(item) < (loaded + load_more_step) )
            draw_product_in_catalog(item.id, item.imageURL1, item.name, Number(item.price), toInt(item.discount), item.flagNew,item.productType, item) 
        
    });
    loaded += load_more_step;
}

$("#load_more").click(function(){
    if(products_data.length > loaded)
        show_products(products_data)
    else
    {
        bootbox.alert("There are no more products available!")
    }
})

$('input[name=cb]').on('change', function() {
    if($(this).attr('id')!="ALL")
        get_type_products($(this).attr('id'))
    else
        get_latest_products()
 });

 $('.filter_types').on('click', function() {
    if($(this).attr('id')!="ALL")
        get_type_products($(this).attr('id'))
    else
        get_latest_products()
 });

function draw_brand_filters(){
    
    const brands_filter = document.querySelectorAll(".brand_filters")
    brands_filter.forEach(el =>{
    
        fetch("http://localhost:8082/rest/mongodb/brand/getAll").then(resp=>{ 
            if(resp.status == 200 ){
                resp.json().then(data =>{
                    data.forEach(item =>{
                        
                        let box_div = document.createElement("div")
                        box_div.className = "form-check"
                        el.appendChild(box_div)
                        let radio_input = document.createElement("input")
                        radio_input.className = "form-check-input"
                        radio_input.type = "radio"
                        radio_input.id = item.name
                        radio_input.name = "rb_brand"
                        radio_input.onchange =  function() {
                            console.log(item.name)
                            get_brand_products(radio_input.id)
                        }
                        
                        let name = document.createElement("label")
                        name.classList.add("form-check-label")
                        name.innerHTML = item.name
                        box_div.appendChild(radio_input)
                        box_div.appendChild(name)
                    
                })
                })
            }
        });
    })
    
}





