var brands = new Array()
var obj_brands = new Array()
var discount = ["NONE", "SMALL", "HALF", "BIG"]
var product_types = ["FACE", "LIPS", "EYES","CHEEKS","BROWS","SETS","NAILS"]


$(document).ready(function () {
  
  get_brands_data(brands, obj_brands)
  console.log(brands, obj_brands)
  create_brand_dropdownList(discount,"discount")
  create_brand_dropdownList(product_types,"type")

})


$("#promeni-sifru-btn").on('click', function (e) {
    $('.hidden-edit-pass').toggle();
})

$("#cancel-promeni-sifru").click(function(){
    $('.hidden-edit-pass').toggle();
})

$("#izmeni-profil-btn").click(function(){
    $('.hidden-edit-profile').toggle()     
})

$("#cancel-izmeni-profil").click(function(){
    $('.hidden-edit-profile').toggle() 
})

$("#potvrdiPromenu").click(function(ev){     
    ev.preventDefault()
    var na = document.getElementById("product-name").value;
    var imageURL1 = document.getElementById("img1").value;
    var imageURL2 = document.getElementById("img2").value;
    var imageURL3 = document.getElementById("img3").value;
    var brand = $( "#brands" ).val()
    var price= document.getElementById("price").value;
    var discount= $( "#discounts" ).val()
    var description= document.getElementById("disc").value;
    var productType= $( "#types" ).val()

    var brand_obj = obj_brands.find(el=>el.name == brand)
    console.log(brand_obj)

    console.log(na, imageURL1,imageURL2,imageURL3,brand,description,price,discount,productType)
    
    fetch("http://localhost:8082/rest/mongodb/product/addProduct",{
    method:'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
        name: na,
        imageURL1: imageURL1,
        imageURL2: imageURL2,
        imageURL3: imageURL3,
        brand: brand_obj,
        description: description,
        flagNew:"NEW",
        price: price,
        discount: discount,
        productType: productType
    })
    }).then(resp => {
        console.log(resp.status)
        if (resp.status == 200) {
          bootbox.alert( "You added one product in database");
          
        }  
        else
        {
          bootbox.alert({ 
            message: "Error while adding a product",
            callback: function(){ location.href = "admin.html"; }    
          });
        }    
  })
});

$("#dele").click(function(){    
    var na = document.getElementById("na").value;
    var productType= document.getElementById("ty").value;
            fetch("http://localhost:8082/rest/mongodb/product/deleteProduct?name="+na+"&productType="+productType,{
            method:'DELETE',
            headers: {
              'Content-type': 'application/json'
            }
        
            }).then(resp => {
                console.log(resp.status)
                if (resp.status == 200) {
                  bootbox.alert("Deleting product finished successfully");
                }  
                else
                { 
                  bootbox.alert("Error while deleting a product");
                }    
          })
        
});

function create_brand_dropdownList(values, field_id){ 
 

  var select = document.createElement("select");
  select.classList.add("form-control")
  select.name = field_id +"s"
  select.id = field_id + "s"

  for (const val of values)
  {
      var option = document.createElement("option");
      option.value = val;
      option.text = val.charAt(0).toUpperCase() + val.slice(1);
      select.appendChild(option);
  }

  document.getElementById(field_id).appendChild(select);

}

function get_brands_data(brands, obj_brands){
  
  fetch("http://localhost:8082/rest/mongodb/brand/getAll").then(resp=>{ 
      if(resp.status == 200 ){
          resp.json().then(data =>{
              
              data.forEach(item =>{
                obj_brands.push(item)
                brands.push(item.name)
                  
              
            })
            create_brand_dropdownList(brands, "brand")
          })
      }
  });
}


