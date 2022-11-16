window.addEventListener("load", function () {

    // select elements
    const myModal = document.querySelector("#toastModal");
    const closeBtn = document.querySelector("#closeSpan");

    // add event listeners
    window.addEventListener("keydown", shiftFocus);
    window.addEventListener("click", shiftFocus);
    closeBtn.addEventListener("click", shiftFocus);



    // call function on page load
    checkToast();


    // functions
    function checkToast() {
        if (document.querySelector("#toastMsg")) {
            myModal.style.display = "block";
        };
    };



    function shiftFocus(){
        myModal.style.display = "none";
    };


    /* example code for animation
    function stopIt() {
        const boxAnimation = document.getElementById("rollerBox");
        let list = boxAnimation.classList;
        list.toggle("pauseCls");
    } */

});