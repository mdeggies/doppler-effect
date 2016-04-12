# Overview of The Doppler Effect

1. The star’s (1) colour should change based on the value of the velocity input (2), where:
    a. 0 = no colour change
    b. ‐100 = Blue
    c. 100 = Red
2. The slider (3) should update the velocity input (2), in the range ‐100 to 100 inclusive.
3. The velocity input should accept numbers only; which are limited to range of the slider (3).
4. The slider should be based on either a log or exponential scale, providing more detail towards the negative velocity range (Blue).

## How to run

https://dopplereffect.herokuapp.com/

You can run the simulation locally by navigating to the directory in your terminal and running the 'serve' command and viewing the page at http://localhost:3000/. Alternatively, you can run 'python -m SimpleHTTPServer 3000' if 'serve' doesn't work.

## Design Decisions

Instead of tinting the star, which resulted in very poor quality, I wanted to actually change the star's color. What I did was create a hidden canvas element that overlays the star and changes the color of it's outermost rings.



## Todos

This was a really fun challenge to work on. Towards the end, I tried to play around with Greensock's TweenMax animation library. My goal was to change the color of the star based on the



## Resources

http://ionden.com/a/plugins/ion.rangeSlider/en.html
http://jsfiddle.net/pandey_mohit/BeSwL/
http://jsfiddle.net/IonDen/zqh4o7uc/
https://codepen.io/juliangarnier/pen/idhuG
