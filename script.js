// Body-theme - light/dark mode 
const toggleButton = document.getElementById('toggle-theme');
const root = document.documentElement;

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

// Icon toggle
if (document.body.classList.contains('light-mode')) {
    toggleButton.textContent = '☀️';
} else {
    toggleButton.textContent = '🌙';
}
});


// Toggle floating menu styling via ext CSS
function toggleContactMenu() {
    const menu = document.getElementById('contact-menu');
    menu.classList.toggle('show'); // Toggle the 'show' class to show or hide the menu
}

// Hide menu if clicked outside
document.addEventListener('click', (event) => {
    const menu = document.getElementById('contact-menu');
    const widget = document.getElementById('contact-widget');
    
    if (!menu.contains(event.target) && !widget.contains(event.target)) {
        menu.classList.remove('show');
    }
});

// or refactoring thus:
// const isClickInside = menu.contains(event.target) || widget.contains(event.target);
// if (!isClickInside) {
//     menu.classList.remove('show');
// }

// Hiding floating menu via Esc key
document.addEventListener('keydown', (e) => {
    const menu = document.getElementById('contact-menu');
    if (e.key === 'Escape') {
        menu.classList.remove('show');
    }
});


// Contact Form
// Showing contact form when clicked for
function showContactForm() {
    const form = document.getElementById('contact-form');
    
    form.style.display = "block"; // show the form

    // Reveal the form with smooth transition
    form.classList.add('show'); // Add class to make it visible and adjust height

    // Close the floating menu after clicking
    const menu = document.getElementById('contact-menu');
    menu.classList.remove('show'); // Remove the "show" class to hide the menu

    // Smooth scroll to the form without affecting the page scroll position
    setTimeout(() => {
        form.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // Align at the top of the screen
        });
    }, 100); // Slight delay before scroll to avoid page jump behavior
}

// Toggle the contact form visibility
function toggleForm() {
    const formContainer = document.getElementById("contact-form");
    formContainer.classList.toggle("show"); // Toggle the form's visibility
}

// Contact form data submission as an alert
// function submitForm(event) {
//     event.preventDefault();
//     alert('Thank you! Unfortunately, I will not receive your message as this is a beta project. Kindly reach out via email or any of my social media platforms.');
//     event.target.reset();
// }

// Contact form data submission on DOM 
let form = document.querySelector("form");
let submitBtn = document.querySelector("#submit-btn");

const handleFormSubmit = (e) => {
    e.preventDefault();

    //disable the submit button
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    //user input data
    let firstName = document.querySelector("[name='firstName']").value;
    let lastName = document.querySelector("[name='lastName']").value;
    let email = document.querySelector("[name='email']").value;
    let subject = document.querySelector("[name='subject']").value;
    let message = document.querySelector("[name='message']").value;
    // let dataView = document.getElementById("data-view");
    let dataView = document.querySelector("#data-view");
    
    //userData object
    const userData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    subject: subject,
    message: message,
    };
    
    //clg
    const userDataAsJson = JSON.stringify(userData);
    console.log(userData);
    console.log("=================================");
    console.log(userDataAsJson);

    //output on innerHTML
    //below doesn't work well with the typeWriter() function, because it contains HTML tags
    // dataView.innerHTML = 
    // `<li>First Name: ${userData.firstName}</li>
    // <li>Last Name: ${userData.lastName}</li>
    // <li>Email: ${userData.email}</li>
    // <li>Subject: ${userData.subject}</li>
    // <li>Message: ${userData.message}</li>`;

    // const outputText = 
    // `<li>First Name: ${userData.firstName}</li>
    // <li>Last Name: ${userData.lastName}</li>
    // <li>Email: ${userData.email}</li>
    // <li>Subject: ${userData.subject}</li>
    // <li>Message: ${userData.message}</li>`;


    //plain text for typewriter function
    const outputText = `First Name: ${userData.firstName}
    Last Name: ${userData.lastName}
    Email: ${userData.email}
    Subject: ${userData.subject}
    Message: ${userData.message}`;
    
    //typewriter effect
    typeWriter(outputText, "data-view", 50, () => {
        //pop-up alert
        alert('Thank you! Unfortunately, I will not receive your message as this is a beta project. Kindly reach out via email or any of my social media platforms.');
        form.reset(); //form resets after submission

        //re-enable the button
        submitBtn.disabled = false;
        submitBtn.innerText = "Send Message";
        
        //clear the output after 60 seconds
        // setTimeout(() => {
        // dataView.innerHTML = "";
        // }, 60000); // 60000 ms = 60 seconds

        //fade out the DOM display element and clear user data
        setTimeout(() => {
            const dataView = document.getElementById("data-view");
            dataView.classList.add("fade-out"); //DOM display section id

        //wait for fade-out to complete before clearing user data on innerHTML
        setTimeout(() => {
            dataView.innerHTML = "";
            dataView.classList.remove("fade-out"); //reset for future output
        }, 500); // 0.5 second = the .fade class transition time on style. the content is cleared and the fade-out class is removed, text content cleared so it’s ready for the next message.
        }, 10000); //wait 10 seconds after the form is submitted before starting the fade-out.

        });
    };
    
    //typewriter function
    function typeWriter(text, elementId, speed, callback) {
        const element = document.getElementById(elementId);
        element.innerHTML = ""; //to clear previous output
        let i = 0;
        function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback(); //run callback i.e alert when typing is done
        }
    }
    type();
}

form.addEventListener("submit", handleFormSubmit);


// Page feedback
function setFeedback(icon, type) {
    //highlight the selected thumb and remove others
    document.querySelectorAll('.fa-thumbs-up, .fa-thumbs-down').forEach(i => i.classList.remove('selected'));
    icon.classList.add('selected'); //adding the selected class/icon to the one the user clicked

    //save the feedback type (like/dislike) in localStorage
    localStorage.setItem('pageFeedback', type);
    console.log("Saved to localStorage:", localStorage.getItem('pageFeedback'));

    //removing the localStorage if no longer needed
    // localStorage.removeItem("pageFeedback"); //only removes the "pageFeedback" entry
    // localStorage.clear(); //wipes out the entire localStorage locker for that domain

    //show and trigger the feedback message
    showFeedbackMessage(type); 

    //synchronize the feedback on both locations (footer and floating menu)
    // syncFeedbackState();
}

    //add 'selected' class to both relevant thumbs
    // if (type === 'like') {
    //     document.getElementById('thumb-up-footer').classList.add('selected');
    //     document.getElementById('thumb-up-floating').classList.add('selected');
    // } else if (type === 'dislike') {
    //     document.getElementById('thumb-down-footer').classList.add('selected');
    //     document.getElementById('thumb-down-floating').classList.add('selected');
    //     }

    // define the (type) function to display feedback message
    function showFeedbackMessage(type) { //type is the value/type of icon passed from the caller
        const feedbackMessageFooter = document.getElementById('feedback-message-footer');
        //const feedbackMessageFloating = document.getElementById('feedback-message-floating');
        
        const msgText = "Thanks for your feedback!";
        
        feedbackMessageFooter.textContent = msgText;
         // feedbackMessageFooter.style.color = "#2563eb";

        // feedbackMessageFloating.textContent = msgText;
        // feedbackMessageFloating.style.color = "#2563eb";
        
        setTimeout(() => {
            feedbackMessageFooter.textContent = "";
            // feedbackMessageFloating.textContent = "";
        }, 3000); //clears the message after 3 seconds
    }
    
    //to restore the user’s previous feedback and sync the feedback state on page load
    function syncFeedbackState() {
        const storedFeedback = localStorage.getItem('pageFeedback'); //stores and gets the saved localStorage value (like or dislike)
        
        //firstly removes/clears previous icon selection
        document.querySelectorAll('#thumb-up-footer, #thumb-down-footer') //remove - #thumb-up-floating, #thumb-down-floating
        .forEach(i => i.classList.remove('selected'));

    //based on what's stored, it re-applies the selected state so users see their previous selection
    if (storedFeedback === 'like') {
        document.getElementById('thumb-up-footer').classList.add('selected');
        // document.getElementById('thumb-up-floating').classList.add('selected');
    } else if (storedFeedback === 'dislike') {
        document.getElementById('thumb-down-footer').classList.add('selected');
        // document.getElementById('thumb-down-floating').classList.add('selected');
    }
}

// Sync feedback state on page load
document.addEventListener('DOMContentLoaded', syncFeedbackState);


//Movie-buff cascade
function toggleSubList() {
    const subList = document.getElementById("movie-sub-list");
    const arrow = document.getElementById("movie-arrow");

    const isVisible = subList.style.display === "block";
    subList.style.display = isVisible ? "none" : "block";
    arrow.textContent = isVisible ? "▼" : "▲";
}

function openTrailer(url) {
    const overlay = document.getElementById("trailer-overlay");
    const iframe = document.getElementById("trailer-frame");
    
    iframe.src = url;
    overlay.style.display = "flex"; //show overlay
}

function closeTrailer() {
    const overlay = document.getElementById("trailer-overlay");
    const iframe = document.getElementById("trailer-frame");

    iframe.src = ""; // Stop video
    overlay.style.display = "none"; //hide overlay
}



// Toggle floating menu styling via JS directly
// function toggleContactMenu() {
//   const menu = document.getElementById('contact-menu');
//   if (menu.style.display === "flex") {
//     menu.style.display = "none";
//   } else {
//     menu.style.display = "flex";
//   }
// }

//Listener to hide the floating menu when clicked outside
// document.addEventListener('click', (event) => {
//   const menu = document.getElementById('contact-menu');
//   const widget = document.getElementById('contact-widget');

//   if (!menu.contains(event.target) && !widget.contains(event.target)) {
//     menu.style.display = 'none';
//   }
// });


// Hide menu if clicked outside specifically for float menu clicks
// document.addEventListener('click', (event) => {
//   const menu = document.getElementById('contact-menu');
//   const widget = document.getElementById('contact-widget');

//   const isClickInside = menu.contains(event.target) || widget.contains(event.target);

//   if (!isClickInside && menu.style.display === 'flex') {
//     menu.style.display = 'none';
//   }
// });

// // Hide menu if Esc key is pressed
// document.addEventListener('keydown', (e) => {
//   const menu = document.getElementById('contact-menu');
//   if (e.key === 'Escape' && menu.style.display === 'flex') {
//     menu.style.display = 'none';
//   }
// });