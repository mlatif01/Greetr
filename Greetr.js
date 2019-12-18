// IIFE that accepts global object and jQuery object
(function(global, $) {
    
    // use 'new' on the object
    var Greetr = function(firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    };
    
    // **Below properties are accessible within this function using 'this', due to closures. Also, they are hidden within the scope of the IIFE and not accesible from outside the function**
    
    // currently supported languages
    var supportedLangs = ['en', 'es'];
    
    // informal greetings
    var informalGreetings = {
        en: 'Yo',
        es: 'Hola'
    };
    
    // formal greetings
    var formalGreetings = {
        en: 'Hello',
        es: 'Buenos Dias'
    };
    
    // logging messages
    var logMessages = {
        en: 'Logged in',
        es: 'Inició sesión'
    };
    
    // prototype holds functions to save memory space
    Greetr.prototype = {
        
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },
        
        // check the language is valid
        validate: function() {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid lanauge";
            }
        },
        
        informalGreeting: function() {
            return informalGreetings[this.language] + ' ' + this.firstName + '!';
        },
        
        formalGreeting: function() {
            return formalGreetings[this.language] + ' ' + this.fullName();
        },
        
        // chainable methods - returns it's containing object
        greet: function(isFormal) {
            var msg;
            
            // if undefined or null it will be coerced to 'false'
            if (isFormal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.informalGreeting();
            }
            
            if (console) {
                console.log(msg);
            }
            
            // 'this' refers to the calling object at execution time and makes the method chainable
            return this;
        },
        
        // log messages to console
        log: function() {
            
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            
            // chainable
            return this;
        },
        
        // set new language for user
        setLang: function(lang) {
            this.language = lang;
            
            this.validate();
            
            // chainable
            return this;
        },
        
        // HTML Greeting
        HTMLGreeting: function(selector, isFormal) {
            if (!$) {
                throw 'jQuery not loaded';
            }
            
            if (!selector) {
                throw 'Missing JQuery selector';
            }
            
            var msg;
            if (isFormal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }
            
            $(selector).html(msg);
            
            return this;
            
            
        }
        
        
    };
    
    // function constructor - object is created here which means the user can 'new' an object without having to call new
    Greetr.init = function(firstName, lastName, language) {
        
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
        
        self.validate();
        
    }
    
    // Set up the prototype chain
    // any objects created with this function should point here
    Greetr.init.prototype = Greetr.prototype;
    
    // Set up G$ Alias as a shortcut for using this library
    global.Greetr = global.G$ = Greetr;
    
    
}(window, jQuery));