$(function () { // Same as document.addEventListener("DOMContentLoaded"...

console.log ("In event loader code");

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
});


(function (global) {

    console.log("In function global loader code");

    // Set locations for different page pieces and elements to use
    var dc = {};

    var homeHtmlUrl = "snippets/home-snippet.html";     // Loads the main section of the home page
    var allCategoriesUrl =
    "https://davids-restaurant.herokuapp.com/categories.json";  // Holds the JSON return from the server
    var categoriesTitleHtml = "snippets/categories-title-snippet.html";
    var categoryHtml = "snippets/category-snippet.html";
    var menuItemsUrl =
    "https://davids-restaurant.herokuapp.com/menu_items.json?category=";    // Need to add the category to the end of this URL
    var menuItemsTitleHtml = "snippets/menu-items-title.html";
    var menuItemHtml = "snippets/menu-item.html";

    // Convenience function for inserting innerHTML for 'select'
    var insertHtml = function (selector, html) {
        console.log ("In function insertHtml");
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };


    // Return substitute of '{{propName}}' with propValue in given 'string'.
    var insertProperty = function (string, propName, propValue) {
        console.log ("In function insertProperty");
        
        var propToReplace = "{{" + propName + "}}";
        string = string
        .replace(new RegExp(propToReplace, "g"), propValue);
        return string;

    };
    

    // Remove the class 'active' from home and switch to Menu button
    var switchMenuToActive = function () {

        console.log("In switchMenuToActive");

        // Remove 'active' from home button
        var classes = document.querySelector("#navHomeButton").className;
        classes = classes.replace(new RegExp("active", "g"), "");
        document.querySelector("#navHomeButton").className = classes;
    
        // Add 'active' to menu button if not already there
        classes = document.querySelector("#navMenuButton").className;
        if (classes.indexOf("active") === -1) {
        classes += " active";
        document.querySelector("#navMenuButton").className = classes;
        }
    };





    // Given array of category objects, returns a random category object.
    function chooseRandomCategory (categories) {

        console.log("In chooseRandomCategory function");

        // Choose a random index into the array (from 0 inclusively until array length (exclusively))
        var randomArrayIndex = Math.floor(Math.random() * categories.length);
    
        // return category object with that randomArrayIndex
        return categories[randomArrayIndex];
    }

    
    global.$dc = dc;
    
})(window);     // End of function (global)