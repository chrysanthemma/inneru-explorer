// INTRO TEXT 
// Taken from: https://css-tricks.com/snippets/css/typewriter-effect/
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate; // Array of strings to type
    this.el = el; // The HTML element where the text will be displayed
    this.loopNum = 0; // Keeps track of which string is currently being typed
    this.period = parseInt(period, 10) || 2000; // Time period before switching to the next string (default: 2000 ms)
    this.txt = ''; // Holds the current state of the text being displayed
    this.tick(); // Start the typing animation
    this.isDeleting = false; // Flag to indicate if the text is being deleted
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length; // Selects the current string based on the loop number
    var fullTxt = this.toRotate[i]; // The full string to type out

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1); // Remove one character if deleting
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1); // Add one character if typing
    }
    // Updates the innerHTML of the element to show the current state of `txt`
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this; // Reference to the current instance for use in the setTimeout callback
    var delta = 200 - Math.random() * 200; // Randomize the typing speed

    if (this.isDeleting) { delta /= 2; } // Speed up when deleting

    if (!this.isDeleting && this.txt === fullTxt) { // If typing is complete, set the delay for the next string
    delta = this.period; 
    if (this.loopNum === this.toRotate.length - 1) {
        setTimeout(function() {
            that.el.innerHTML = that.txt; // Remove the wrap span and cursor
        }, 500); // Delay to make sure the last string is displayed for a moment
        setTimeout(function() {
            that.el.style.opacity = '0';
        }, 1100);
        return; // Stop the animation
    }
    this.isDeleting = true; // Start deleting the current text
    } else if (this.isDeleting && this.txt === '') {  // If the text is fully deleted, move to the next string
    this.isDeleting = false;
    this.loopNum++;
    delta = 500; // Short pause before starting the next string
    }

    setTimeout(function() {  // Call the `tick()` method again after the calculated delay
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};