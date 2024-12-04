import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";


let result
let root

// Define a React component for rendering the results
const SearchResults = ({ authors }) => {
  return (
      <div>
          <h3>Search Results:</h3>
          <ul>
              {authors.map((author, index) => (
                  <li key={index}>{author}</li>
              ))}
          </ul>
      </div>
  );
};

// Function to activate React and render content into `search-results`
const activateReact = (authors) => {
  const container = document.getElementById("search-results");
  root = ReactDOM.createRoot(container);
  root.render(<SearchResults authors={authors} />);
};


// Vanilla JavaScript logic
const button = Array.from(document.getElementsByClassName("btn"));
button.forEach(btn => {
    btn.addEventListener("click", function () {
        button.forEach(element => {
            element.classList.remove("clicked");
        });
        this.classList.add("clicked");
    });
});

console.log("hhi");

let searchOption = "";

const buttons = document.querySelectorAll(".buttons .btn");

buttons.forEach(button => {
    button.addEventListener("click", async (event) => {
        event.preventDefault();
        searchOption = button.value;
    });
});

const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const searchQuery = document.getElementById("searchquery").value;
    if (!searchQuery) {
        alert("Please enter a search query.");
        return;
    }

    try {
        const response = await fetch("/pptx-search", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Requested-With": "XMLHttpRequest",
            },
            body: new URLSearchParams({
                searchquery: searchQuery,
                searchoption: searchOption,
            }).toString(),
        });

        if (response.ok) {
            result = ""
            result = await response.json();
            console.log("Response:", result);
            // alert(result.message);
            if (result.author && Array.isArray(result.author)) {
              // Call React to render results
              activateReact(result.author);
            }
        } else {
            console.error("Error:", response.status, response.statusText);
            alert("Failed to perform search. Please try again.");
        }
    } catch (error) {
        console.error("Network Error:", error);
        alert("An error occurred. Please check your network connection.");
    }
});

export default null;

