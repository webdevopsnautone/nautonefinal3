
//---------------------Navbar switch-----------------//
function openNav() {
  document.getElementById("mySidenav").style.height = "100vh";
  document.getElementById("mySidenav").style.opacity = "1"; 
}

function closeNav() {
  document.getElementById("mySidenav").style.height = "0";
  document.getElementById("mySidenav").style.opacity = "0"; 
}

//------------------------------for numbersgrowth----------------------------------------//
var a = 0;
$(window).scroll(function() {

  var oTop = $('#counter').offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $('.counter-value').each(function() {
      var $this = $(this),
        countTo = $this.attr('data-count');
      $({
        countNum: $this.text()
      }).animate({
          countNum: countTo
        },

        {

          duration: 3000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
            //alert('finished');
          }

        });
    });
    a = 1;
  }

});

//--------------------Main navbar transition---------------//

  window.addEventListener('scroll',function(){
  let nav = document.querySelector('nav');
  let windowPosition = window.scrollY > 90;
  nav.classList.toggle('new-navbg', windowPosition);
  document.getElementById("navbar").style.backgroundColor = "white";
  document.getElementById("menuicon").style.color = "black";
  document.getElementById("mobilenumber").style.color = "black";
  
  if (window.scrollY < 90) 
    {
      document.getElementById("navbar").style.backgroundColor = "#000f4100";
      document.getElementById("menuicon").style.color = "white";
      document.getElementById("mobilenumber").style.color = "white";
      }  
    })

 //--------------------------------------------hide navbar----//
  //  $(window).scroll(function() {
   // if ($(window).scrollTop() > 700) {
        // We are at the top of the page and want to remove the class
      //  $('#navbar').removeClass('fixed-top');
  //  } else {
     //   $('#navbar').addClass('fixed-top');
   // }
//});

/*---------------------popup video switch-----------------*/
function popupOn() {
  document.getElementById("popupVideo").style.display = "inline";
  document.getElementById("popupVideo").style.opacity = "1";
  document.getElementById("mainvideo").style.opacity = "1";
}

function closePopupOn() {
  document.getElementById("popupVideo").style.display = "none";
  document.getElementById("popupVideo").style.opacity = "0";
  document.getElementById("mainvideo").style.opacity = "0";
}

//------------for logo animation---------------------//

$(function () { 
    $(window).scroll(function () {
      if ($(this).scrollTop() > 20){ 
          $('.navbar-brand-img img').attr('src','asserts/images/innvert.gif');      
            }
          if ($(this).scrollTop() >100){ 
          $('.navbar-brand-img img').attr('src','asserts/images/sm-logo.jpg');      
            }
          if ($(this).scrollTop() < 5){ 
               $('.navbar-brand-img img').attr('src','asserts/images/expand.gif');
       }
    })
});

//------------------------------for 10X growth----------------------------------------//
  var counted = 0;
$(window).scroll(function() {

  var oTop = $('#tengrow').offset().top - window.innerHeight;
  if (counted == 0 && $(window).scrollTop() > oTop) {
    $('.count').each(function() {
      var $this = $(this),
        countTo = $this.attr('data-count');
      $({
        countNum: $this.text()
      }).animate({
          countNum: countTo
        },

        {

          duration: 1500,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
            //alert('finished');
          }

        });
    });
    counted = 1;
  }

});
/*--------------------------audio-----------------------------------*/

function playAudio() { 
  document.getElementById("nautone").play(); 
} 
