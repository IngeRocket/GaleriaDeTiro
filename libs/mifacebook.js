window.fbAsyncInit = function() {
  FB.init({
    appId      : '699571204003993',
    xfbml      : true,
    version    : 'v2.9'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk')); 


function shareScoreMedia(score) {
  FB.ui({
    method: 'share',
    href: 'https://google.com',
    quote: 'Obtuve una puntuacion de: ' + score +' en la Dificultad: Media',

  }, function(response){});
  
}

function shareScoreDificil(score) {
  FB.ui({
    method: 'share',
    href: 'https://google.com',
    quote: 'Obtuve una puntuacion de: ' + score +' en el Modo: Dificil',

  }, function(response){});
  
}

function shareScoreFacil(score) {
  FB.ui({
    method: 'share',
    href: 'https://google.com',
    quote: 'Obtuve una puntuacion de: ' + score +' en el Modo: Facil',

  }, function(response){});
  
}

function shareScoreIA(score) {
  FB.ui({
    method: 'share',
    href: 'https://google.com',
    quote: 'Obtuve una puntuacion de: ' + score +' en contra de la Inteligencia Artificial',

  }, function(response){});
  
}

function shareScoreRival(nombre,score,nombreDificultad) {
  FB.ui({
    method: 'share',
    href: 'https://google.com',
    quote: 'Venci a:'+ nombre+' con una puntuacion de: ' + score +' en la Dificultad: '+nombreDificultad,

  }, function(response){});
  
}