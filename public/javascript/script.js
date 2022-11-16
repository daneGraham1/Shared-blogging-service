// const { response } = require("express");

window.addEventListener('load', (event) => {

  // NAVBAR FUNCTIONALITY

  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav");
  const navLink = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", mobileMenu);

  navLink.forEach(n => n.addEventListener("click", closeMenu));

  function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }

  function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
  // **************************************************************
  // DARKMODE FUNCTIONALITY

  let darkMode = localStorage.getItem('darkMode')
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  const navImg = document.querySelector(".nav-img");


  // darkModeToggle.addEventListener('click', () => {
  // });

  const enableDarkMode = () => {
    // Add the class to the body
    document.body.classList.add('darkmode');
    // Update darkMode in localStorage
    localStorage.setItem('darkMode', 'enabled');
    // change html text & image
    darkModeToggle.innerHTML = "Light mode 🌞";
    navImg.src = "./images/layout-images/Heron-dark.png";

  }

  const disableDarkMode = () => {
    // Remove the class from the body
    document.body.classList.remove('darkmode');
    // Update darkMode in localStorage 
    localStorage.setItem('darkMode', null);
    // change html text & image
    darkModeToggle.innerHTML = "Dark Mode 🌙";
    navImg.src = "./images/layout-images/Heron-light.png";

  }

  if (darkMode === 'enabled') {
    enableDarkMode();
  }

  // When someone clicks the button
  darkModeToggle.addEventListener('click', () => {
    // get the darkMode setting
    darkMode = localStorage.getItem('darkMode');

    // if it's not currently enabled, enable it
    if (darkMode !== 'enabled') {
      enableDarkMode();
      // if it has been enabled, turn it off  
    } else {
      disableDarkMode();
    }
  });


  // ************************************************************
  // Show comments on post when 'show comments' button is clicked

  const buttonsArray = document.querySelectorAll(".showCommentsBtn");

  buttonsArray.forEach(function (elem) {
    elem.addEventListener("click", showComments);

  });

  // function getPostId(event) {
  //     const eventTarget = event.target;
  //     const postId = eventTarget.getAttribute("postId");
  //     return postId;
  // }

  async function showComments(event) {

    const eventTarget = event.target;
    const postId = eventTarget.getAttribute("postId");
    console.log("postId:", postId);
    console.log("eventTarget:", eventTarget);
    // const postId = getPostId(event);

    // Fetch comments for the given post
    const postComments = await fetchComments(postId);

        // Get the comments table element for the given element
        const commentsTable = document.querySelector(`#commentsTable-${postId}`);
        commentsTable.innerHTML = '';

    // Create tbody element and append to commentsTable
    const tbody = document.createElement("tbody");
    commentsTable.append(tbody);

    console.log("postComments:", postComments);
    if (postComments.length < 1) {
      tbody.innerHTML += `
                    <tr>
                        <td>No one has commented on this post yet. Be the first one!</td>
                        <td></td>
                    </tr>
                `;
      console.log("No one has commented on this post yet. Be the first one!");
    } else {
      // Add comments for the given post to the table.
      postComments.forEach(function (postId) {
        displayComments(postId, tbody);
      });

      // Hide comments
      hideComments(event.target, commentsTable, postId);
    }

  }

  function hideComments(eventTarget, commentsTable, postId) {

    // Create and append hide comments button
    const hideCommentsBtn = document.createElement("button");
    hideCommentsBtn.classList.add("hideCommentsBtn");
    hideCommentsBtn.setAttribute("postId", postId);
    hideCommentsBtn.innerText = "Hide Comments";
    eventTarget.insertAdjacentElement("afterend", hideCommentsBtn);

    // Hide comments
    hideCommentsBtn.addEventListener("click", function () {
      commentsTable.innerHTML = '';
      hideCommentsBtn.remove();
    });
  }

  function displayComments(post, tbody) {

        // Add comments
      tbody.innerHTML += `
        <tr>
        <td><strong>${post.fname} ${post.lname}</strong>
        <br>&nbsp&nbsp&nbsp&nbsp${post.datTime}</td>
        <td>${post.comment}</td>
        </tr>
        `;
    }

    // Testing some other comment formatting...
    // <div class="card-comment">
    //                   <h5>${post.fname} ${post.lname}</h5>
    //                   <p>&nbsp&nbsp${post.comment}</p>
                      
    //                 </div>
    

    // Fetch comments for the given post
    async function fetchComments (postId) {
        const response = await fetch("./services/posts/comments");
        const allComments = await response.json();

         var postComments = allComments.filter(function (element) {
            // console.log("element.postId:", element.postId);
            return (element.postId == postId);
        });
        return postComments;
    } 


  // Add postId to hidden variable on CREATE POST form when the submit button is clicked.
  const postCommentButtonsArray = document.querySelectorAll(".postCommentBtn");

  postCommentButtonsArray.forEach(function (elem) {
    elem.addEventListener("click", addPostIdToHiddenInput);
  });

    function addPostIdToHiddenInput(event) {
        const eventTarget = event.target;
        const postId = eventTarget.getAttribute("postId");

        // Get hidden input element
        const hiddenPostId = document.querySelector(`#hiddenPostId-${postId}`);
        
        hiddenPostId.value = postId;
    }

  // Add postId to hidden variable on DELETE POST form when the submit button is clicked.
  const deletePostButtonsArray = document.querySelectorAll(".deletePostBtn");

  deletePostButtonsArray.forEach(function (elem) {
    elem.addEventListener("click", addPostIdToHiddenInputDelete);
  });

    function addPostIdToHiddenInputDelete(event) {
        const eventTarget = event.target;
        const postId = eventTarget.getAttribute("postId");

        // Get hidden input element
        const hiddenPostId = document.querySelector(`#hiddenDeletePostId-${postId}`);
        hiddenPostId.value = (postId);
    }

    
    /**************************************************
     * Back to top button
     *************************************************/
// select elements
const backToTopBtn = this.document.querySelector("#backToTopBtn");


  // add event listeners
  backToTopBtn.addEventListener("click", function () {
    backToTop();
  });
  this.window.onscroll = function () {
    scrolling();
  };

  // variables
  const scrollHeight = 100;

  // functions

  function scrolling() {
    if ((document.body.scrollTop > scrollHeight) ||
      (document.documentElement.scrollTop > scrollHeight)) {
      backToTopBtn.style.display = "block";
    }
    else {
      backToTopBtn.style.display = "none";
    }
  };



  function backToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };


       

    /**********************************************************************/
    /**
     * Accordion
     */
    var acc = document.getElementsByClassName("accordion");
    var accdnBtn = document.querySelector(".accordion-btn-img");
    // var accdnBtnAP = document.querySelector("#accordion-btn-img-allPosts");
    
    var i;
    
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");
    
        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
   
        if (panel.style.display === "block") {
          panel.style.display = "none";
          
          accdnBtn.setAttribute("src", "./images/layout-images/plus-solid.svg");
        } else {
          panel.style.display = "block";
          accdnBtn.setAttribute("src", "./images/layout-images/minus-solid.svg")
        }
      });
    }

  // uploaded images buttons

  const imgLinks = document.getElementsByClassName("imageLinkBtn");
  var i;

  for (i = 0; i < imgLinks.length; i++) {
    imgLinks[i].addEventListener("click", function () {
      let thisLink = imgLinks[i];
      thisLink.select();
      let text = `<img src="${thisLink.value}">`;
      navigator.clipboard.writeText(text);
      // makeImageLink(thisLink);
    });
  };


  // function makeImageLink(thisLink) {
  //   thisLink.select();
  //   let text = `<img src="${thisLink.value}">`;
  //   navigator.clipboard.writeText(text);
  // };

  // async function customUploadImage(file, alt, title){
  //   await fetch("/uploadImage");
  // }

});

