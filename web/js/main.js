jQuery(document).ready(function($) {
    $(".scroll").click(function(event){		
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
    });


    var navoffeset=$(".agileits_header").offset().top;
    $(window).scroll(function(){
       var scrollpos=$(window).scrollTop(); 
       if(scrollpos >=navoffeset){
           $(".agileits_header").addClass("fixed");
       }else{
           $(".agileits_header").removeClass("fixed");
       }
    });

    $(".dropdown").hover(            
        function() {
            $('.dropdown-menu', this).stop( true, true ).slideDown("fast");
            $(this).toggleClass('open');        
        },
        function() {
            $('.dropdown-menu', this).stop( true, true ).slideUp("fast");
            $(this).toggleClass('open');       
        }
    );
    
    $().UItoTop({ easingType: 'easeOutQuart' });

});

$(window).load(function(){
    $('.flexslider').flexslider({
      animation: "slide",
      start: function(slider){
        $('body').removeClass('loading');
      }
    });
  });

  paypal.minicart.render();

  paypal.minicart.cart.on('checkout', function (evt) {
      var items = this.items(),
          len = items.length,
          total = 0,
          i;

      // Count the number of each item in the cart
      for (i = 0; i < len; i++) {
          total += items[i].get('quantity');
      }

      if (total < 3) {
          alert('The minimum order quantity is 3. Please add more to your shopping cart before checking out');
          evt.preventDefault();
      }
  });


  $(function(){
    $('#example').okzoom({
      width: 150,
      height: 150,
      border: "1px solid black",
      shadow: "0 0 5px #000"
    });
  });


/* Cart */
function showCart(cart) {
    $('#modal-cart .modal-body').html(cart)
    $('#modal-cart').modal();
    let cartSum =  $('#cart-sum').text() ? $('#cart-sum').text() : '$0'
    if(cartSum) {
        $('.cart-sum').text(cartSum)
    }
}

function getCart() {
    $.ajax({
        url: 'cart/show',
        type: 'GET',
        success: function(res) {
            if(!res)
                alert('????????????')
            
            showCart(res)
        },
        error: function() {
            alert('Error')
        }
    })    
}

function clearCart() {
    $.ajax({
        url: 'cart/clear',
        type: 'GET',
        success: function(res) {
            if(!res)
                alert('????????????')
            
            showCart(res)
        },
        error: function() {
            alert('Error clear')
        }
    })    
}


$('.add-to-cart').click(function(){
    let id = $(this).data('id')
    $.ajax({
        url: 'cart/add',
        data: {id: id},
        type: 'GET',
        success: function(res) {
            if(!res)
                alert('????????????')
            
            showCart(res)
        },
        error: function() {
            alert('Error')
        }
    })
    return false
})

$('#modal-cart .modal-body').on('click', '.del-item', function(){
    let id = $(this).data('id')
    $.ajax({
        url: 'cart/del-item',
        data: {id: id},
        type: 'GET',
        success: function(res) {
            if(!res)
                alert('????????????')
            let now_location = window.location.pathname
            if(now_location == '/cart/checkout') 
                location = 'cart/checkout'
            showCart(res)
        },
        error: function() {
            alert('Error')
        }
    })    
})
/* Cart */

$('.value-plus, .value-minus').on('click', function() {
    let id = $(this).data('id')
    let qty = $(this).data('qty')
    $('.cart-table .overlay').fadeIn()
    $.ajax({
        url: 'cart/change-cart',
        data: {id: id, qty: qty},
        type: 'GET',
        success: function(res){
            if(!res)
                alert('???????????? ?????????? ???????????????????? ??????????????')      
            location = 'cart/checkout'     
        },
        error: function() {
            alert('Error')
        }        
    })
})

$('.value-plus').on('click', function(){
    var divUpd = $(this).parent().find('.value'), newVal = parseInt(divUpd.text(), 10)+1;
    divUpd.text(newVal);
});

$('.value-minus').on('click', function(){
    var divUpd = $(this).parent().find('.value'), newVal = parseInt(divUpd.text(), 10)-1;
    if(newVal>=1) divUpd.text(newVal);
});

