function checkToken(redirect_url){
    var user = localStorage.getItem("tokenLogin")
    if(!user){
        location.href = redirect_url
        return user
    }
    else
    {
        return user
    }
}

function toInt(s) {
    switch (s) {
        case "NONE": 
          return 0 
        case "SMALL":
          return 30
        case "HALF":
          return 50
        case "BIG":
          return 80
    }
}

function update_product_list(product, count, user){
  console.log(product)

  fetch("http://localhost:8082/rest/mongodb/productListings/addProductListing?username=" + user ,  {
  method: 'POST',
  headers:{
      'Content-Type':'application/json'
  },
  body: JSON.stringify({
      product:product,
      count:Number(count)
      })
  }).then(resp => {
      console.log(resp)
      if (resp.status == 200) {
          console.log()
      }
      else {

          
      }
  })
}

$("#logout").click(function(){
    localStorage.removeItem("tokenLogin")
})

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