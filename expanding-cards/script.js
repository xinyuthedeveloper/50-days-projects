//Select all the div with class panel
const panels = document.querySelectorAll(".panel");

//Loop through each panel and add click event listener
panels.forEach((panel) => {
    panel.addEventListener("click", () => {
        //Remove all active class from panels
        panels.forEach(panel => panel.classList.remove("active"));
        //Add the active class to the panel that was clicked on
        panel.classList.add("active");
    } )
})
