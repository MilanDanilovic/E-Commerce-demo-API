$(document).ready(function () {
    
    $("#search-addons").keyup(function () {
       
        var filter = $(this).val();

        $("#product_list .col-md-6").each(function () {
            if ($(this).children('div').children('div.part-2').children('h3').text().search(new RegExp(filter, "i")) < 0)
            {
                $(this).fadeOut();
            }
            else
            {   
                $(this).show();
            }
        });
    });
})
