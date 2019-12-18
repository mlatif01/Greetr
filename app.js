// For testing libary

var g = G$('Milad', 'Latif');
g.greet().setLang('es').greet(true).log();
var button = $("#login");
var isFormal = true;

// on login click
button.click(function() {
    var lang = $("#lang").val();
    // check language
    if (lang === 'en') {
        g.setLang('en');
    }
    else if (lang === 'es') {
        g.setLang('es');
    }
    
    // greet user
    g.HTMLGreeting($("#greeting"), isFormal);
})



