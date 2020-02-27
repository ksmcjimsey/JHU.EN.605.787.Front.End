// adds event listeners
$(function () { // Same as document.addEventListener("DOMContentLoaded"...

    console.log ("In event loader code");

    // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
    $("#navbarToggle").blur(function (event) {
          console.log("In function global loader code");
          var screenWidth = window.innerWidth;
          if (screenWidth < 768) {
              $("#collapsable-nav").collapse('hide');
          }
    });
});   // End of add event listener after loading.


// Loaded in its own "namespace".  dc object is returned back to the window.
(function (global) {

    console.log("In function global loader code");

    var dc = {};

    // Settings for snippets of html and for JSON loaded from the server.
    var homeHtmlUrl = "snippets/home-snippet.html";
    var allCategoriesUrl =
      "https://davids-restaurant.herokuapp.com/categories.json";
    var categoriesTitleHtml = "snippets/categories-title-snippet.html";
    var categoryHtml = "snippets/category-snippet.html";
    var menuItemsUrl =
      "https://davids-restaurant.herokuapp.com/menu_items.json?category=";
    var menuItemsTitleHtml = "snippets/menu-items-title.html";
    var menuItemHtml = "snippets/menu-item.html";
    var aboutHtmlUrl = "snippets/about-snippet.html";


    // Convenience function for inserting innerHTML for 'select'
    var insertHtml = function (selector, html) {
        console.log ("In function insertHtml and selector is: " + selector + " plus html argument.");
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    // Show loading icon inside element identified by 'selector'.
    var showLoading = function (selector) {
        console.log ("In function showLoading");
        var html = "<div class='text-center'>";
        html += "<img src='images/ajax-loader.gif'></div>";
        insertHtml(selector, html);
    };

    // Return substitute of '{{propName}}' with propValue in given 'string'
    var insertProperty = function (string, propName, propValue) {
        console.log ("In function insertProperty");
        console.log ("propName: " + propName + "  propValue: " + propValue);
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
    };  // End of switchMenuToAcitive


    // On page load (before images or CSS)
    document.addEventListener("DOMContentLoaded", function (event) {

      console.log("In document.addEventListener DOMContentLoaded anonymous function.");

      // TODO: STEP 0: Look over the code from
      // *** start ***
      // to
      // *** finish ***
      // below.
      // We changed this code to retrieve all categories from the server instead of
      // simply requesting home HTML snippet. We now also have another function
      // called 
      //    1. buildAndShowHomeHTML that will receive all the categories from the server and process them: 
      //      A. choose random category, 
      //      B. retrieve home HTML snippet, 
      //      C. insert that random category into the home HTML snippet, 
      //      D. and then insert that snippet into our main page (index.html).
      //
      // TODO: STEP 1: Substitute [...] below with the *value* of the function buildAndShowHomeHTML,
      // so it can be called when server responds with the categories data.

      // *** start ***
      // On first load, show home view
      console.log("Coursera assignment");
      showLoading("#main-content");   // Posts a loading gif

      // Show the home snippet in the main section
      $ajaxUtils.sendGetRequest(
        allCategoriesUrl,
        buildAndShowHomeHTML, // ***** <---- TODO: STEP 1: Substitute [...] ******  Do not call function just give name.  Will be called when data is ready.
        true); // Explicitly setting the flag to get JSON from server processed into an object literal
    });
    // *** finish **


    // Builds HTML for the home page based on categories array
    // returned from the server.
    // Categories is autofield somehow by the ajaxUtil call.
    function buildAndShowHomeHTML (categories) {

      console.log("In buildAndShowHomeHTML function");
      //console.log("and categories is: " + JSON.stringify(categories ) );
      // var obj = JSON.parse(categories);
      // console.log(obj);
      // console.log ("Is categories an array? " + Array.isArray(categories) );

      // Load home snippet page
      $ajaxUtils.sendGetRequest(
        homeHtmlUrl,
        function (homeHtml) {     // This function is called once the html is returned from the ajax call

          // console.log("homeHtml value is: " + homeHtml);
          // TODO: STEP 2: Here, call chooseRandomCategory, passing it retrieved 'categories'
          // Pay attention to what type of data that function returns vs what the chosenCategoryShortName
          // variable's name implies it expects.

          var chosenCategoryShortName = chooseRandomCategory(categories)
          console.log ("Random short name chosen" + JSON.stringify(chosenCategoryShortName) );

          // TODO: STEP 3: Substitute {{randomCategoryShortName}} in the home html snippet with the
          // chosen category from STEP 2. Use existing insertProperty function for that purpose.
          // Look through this code for an example of how to do use the insertProperty function.
          // WARNING! You are inserting something that will have to result in a valid Javascript
          // syntax because the substitution of {{randomCategoryShortName}} becomes an argument
          // being passed into the $dc.loadMenuItems function. Think about what that argument needs
          // to look like. For example, a valid call would look something like this:
          // $dc.loadMenuItems('L')
          // Hint: you need to surround the chosen category short name with something before inserting
          // it into the home html snippet.
          // Lecture 60 at about 3:50
          //var shortN = "'" + chosenCategoryShortName.short_name + "'";
          //console.log(shortN);
          var homeHtmlToInsertIntoMainPage = insertProperty(homeHtml, "randomCategoryShortName", "'" + chosenCategoryShortName.short_name + "'");
          //console.log(homeHtmlToInsertIntoMainPage)

          // TODO: STEP 4: Insert the the produced HTML in STEP 3 into the main page
          // Use the existing insertHtml function for that purpose. Look through this code for an example
          // of how to do that.
          insertHtml("#main-content", homeHtmlToInsertIntoMainPage);

        },
        false); // False here because we are getting just regular HTML from the server, so no need to process JSON.
    }


    // Given array of category objects, returns a random category object.
    function chooseRandomCategory (categories) {
      console.log("In chooseRandomCategory function");
      //console.log("with categories: " + JSON.stringify(categories) );

      // Choose a random index into the array (from 0 inclusively until array length (exclusively))
      var randomArrayIndex = Math.floor(Math.random() * categories.length);

      // return category object with that randomArrayIndex
      return categories[randomArrayIndex];
    }


    // Load the menu categories view
    dc.loadMenuCategories = function () {
      console.log("In dc.loadMenuCategories function");
      showLoading("#main-content");
      $ajaxUtils.sendGetRequest(
        allCategoriesUrl,
        buildAndShowCategoriesHTML);
    };

    // Load the menu items view
    // 'categoryShort' is a short_name for a category
    dc.loadMenuItems = function (categoryShort) {
      console.log("In dc.loadMenuItems function");
      showLoading("#main-content");
      $ajaxUtils.sendGetRequest(
        menuItemsUrl + categoryShort,
        buildAndShowMenuItemsHTML);
    };

    // Load the about page
    dc.loadAboutPage = function () {
        console.log("In dc.loadAboutPage function");
    
        // 1. Call the waiting icon
        showLoading("#main-content");

        // 2. call the build and load for About page
        buildAndShowAboutHtml();
        
    }

    function buildAndShowAboutHtml() {

        console.log("In buildAndShowAboutHtml function");

        // 1. Get the html
        $ajaxUtils.sendGetRequest(
          aboutHtmlUrl,
          function (homeHtml) {     // This function is called once the html is returned from the ajax call.

              // 1. Replace image with correct start rating images
              homeHtmlWithStars = randomStar(homeHtml);

              // 2. Insert about page in place of main content html
              insertHtml("#main-content", homeHtmlWithStars);  //***** change with modified html with starts attached. */

          },
          false); // False here because we are getting just regular HTML from the server, so no need to process JSON.  

      }   // End of buildAndShowAboutHtml

      function randomStar(htmlToModify) {
          console.log("In randomStar function");

          // 1. Generate random rating
          var randomRating = Math.floor(Math.random() * 5) + 1;   // Rating one to five
          var randomRatingCounter = randomRating;
          console.log("Random number is: " + randomRating);

          // 2. Loop through and replace with starts
          for (var x = 0; x < 5; x++) {
              if (randomRatingCounter > 0) {
                  htmlToModify = insertProperty(htmlToModify, "star-" + x, "fa fa-star" );
                  randomRatingCounter--;
              } else {
                  htmlToModify = insertProperty(htmlToModify, "star-" + x, "fa fa-star-o");
              }
          }

          // 4. Add text after starts
          var starText = randomRating + "-star rating";
          htmlToModify = insertProperty(htmlToModify, "star-text", starText);

          // 5. return the modified HTML back to build and display
          //console.log(htmlToModify);
          return htmlToModify;
      }   // End of randomStar


      // Builds HTML for the categories page based on the data
      // from the server
      function buildAndShowCategoriesHTML (categories) {
        console.log("In buildAndShowCategoriesHTML function");

        // Load title snippet of categories page
        $ajaxUtils.sendGetRequest(
          categoriesTitleHtml,
          function (categoriesTitleHtml) {
            // Retrieve single category snippet
            $ajaxUtils.sendGetRequest(
              categoryHtml,
              function (categoryHtml) {
                // Switch CSS class active to menu button
                switchMenuToActive();

                var categoriesViewHtml =
                  buildCategoriesViewHtml(categories,
                                          categoriesTitleHtml,
                                          categoryHtml);
                insertHtml("#main-content", categoriesViewHtml);
              },
              false);
          },
          false);
      }


      // Using categories data and snippets html
      // build categories view HTML to be inserted into page
      function buildCategoriesViewHtml(categories,
                                      categoriesTitleHtml,
                                      categoryHtml) {

        console.log("In buildCategoriesViewHtml function");

        var finalHtml = categoriesTitleHtml;
        finalHtml += "<section class='row'>";

        // Loop over categories
        for (var i = 0; i < categories.length; i++) {
          // Insert category values
          var html = categoryHtml;
          var name = "" + categories[i].name;
          var short_name = categories[i].short_name;
          html =
            insertProperty(html, "name", name);
          html =
            insertProperty(html,
                          "short_name",
                          short_name);
          finalHtml += html;
        }

        finalHtml += "</section>";
        return finalHtml;
      }


    // Builds HTML for the single category page based on the data
    // from the server
    function buildAndShowMenuItemsHTML (categoryMenuItems) {
      console.log("In buildAndShowMenuItemsHTML function");

      // Load title snippet of menu items page
      $ajaxUtils.sendGetRequest(
        menuItemsTitleHtml,
        function (menuItemsTitleHtml) {
          // Retrieve single menu item snippet
          $ajaxUtils.sendGetRequest(
            menuItemHtml,
            function (menuItemHtml) {
              // Switch CSS class active to menu button
              switchMenuToActive();

              var menuItemsViewHtml =
                buildMenuItemsViewHtml(categoryMenuItems,
                                      menuItemsTitleHtml,
                                      menuItemHtml);
              insertHtml("#main-content", menuItemsViewHtml);
            },
            false);
        },
        false);
    }


    // Using category and menu items data and snippets html
    // build menu items view HTML to be inserted into page
    function buildMenuItemsViewHtml(categoryMenuItems,
                                    menuItemsTitleHtml,
                                    menuItemHtml) {

      console.log("In buildMenuItemsViewHtml function");

      menuItemsTitleHtml =
        insertProperty(menuItemsTitleHtml,
                      "name",
                      categoryMenuItems.category.name);
      menuItemsTitleHtml =
        insertProperty(menuItemsTitleHtml,
                      "special_instructions",
                      categoryMenuItems.category.special_instructions);

      var finalHtml = menuItemsTitleHtml;
      finalHtml += "<section class='row'>";

      // Loop over menu items
      var menuItems = categoryMenuItems.menu_items;
      var catShortName = categoryMenuItems.category.short_name;
      for (var i = 0; i < menuItems.length; i++) {
        // Insert menu item values
        var html = menuItemHtml;
        html =
          insertProperty(html, "short_name", menuItems[i].short_name);
        html =
          insertProperty(html,
                        "catShortName",
                        catShortName);
        html =
          insertItemPrice(html,
                          "price_small",
                          menuItems[i].price_small);
        html =
          insertItemPortionName(html,
                                "small_portion_name",
                                menuItems[i].small_portion_name);
        html =
          insertItemPrice(html,
                          "price_large",
                          menuItems[i].price_large);
        html =
          insertItemPortionName(html,
                                "large_portion_name",
                                menuItems[i].large_portion_name);
        html =
          insertProperty(html,
                        "name",
                        menuItems[i].name);
        html =
          insertProperty(html,
                        "description",
                        menuItems[i].description);

        // Add clearfix after every second menu item
        if (i % 2 !== 0) {
          html +=
            "<div class='clearfix visible-lg-block visible-md-block'></div>";
        }

        finalHtml += html;
      }

      finalHtml += "</section>";
      return finalHtml;
    }


    // Appends price with '$' if price exists
    function insertItemPrice(html,
                            pricePropName,
                            priceValue) {
      
      console.log("In insertItemPrice function");

      // If not specified, replace with empty string
      if (!priceValue) {
        return insertProperty(html, pricePropName, "");
      }

      priceValue = "$" + priceValue.toFixed(2);
      html = insertProperty(html, pricePropName, priceValue);
      return html;
    }


    // Appends portion name in parens if it exists
    function insertItemPortionName(html,
                                  portionPropName,
                                  portionValue) {
      
      console.log("In insertItemPortionName function");

      // If not specified, return original string
      if (!portionValue) {
        return insertProperty(html, portionPropName, "");
      }

      portionValue = "(" + portionValue + ")";
      html = insertProperty(html, portionPropName, portionValue);
      return html;
    }


    global.$dc = dc;

})(window);
