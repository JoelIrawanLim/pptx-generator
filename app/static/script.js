"use strict";
const button = Array.from(document.getElementsByClassName("btn"))
//console.log(button);
button.forEach(btn => {
    btn.addEventListener("click", function(){
    button.forEach(element => {
        element.classList.remove("clicked");
    });
    this.classList.add("clicked")
});
});

console.log("hhi")

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".buttons .btn");

    buttons.forEach(button => {
        button.addEventListener("click", async (event) => {
            event.preventDefault();

            const searchQuery = document.getElementById("searchquery").value;
            const searchOption = button.value;

            if (!searchQuery) {
                alert("Please enter a search query.");
                return;
            }

            try {
                const response = await fetch("/pptx-search", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "X-Requested-With": "XMLHttpRequest", // Add this header
                    },
                    body: new URLSearchParams({
                        searchquery: searchQuery,
                        searchoption: searchOption,
                    }).toString(),
                });

                if (response.ok) {
                    const result = await response.json(); // Parse JSON response
                    console.log("Response:", result);
                    alert(result.message); // Display message to the user
                } else {
                    console.error("Error:", response.status, response.statusText);
                    alert("Failed to perform search. Please try again.");
                }
            } catch (error) {
                console.error("Network Error:", error);
                alert("An error occurred. Please check your network connection.");
            }
        });
    });
});
