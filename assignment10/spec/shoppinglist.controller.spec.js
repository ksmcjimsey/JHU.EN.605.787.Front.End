// *** Example of how to test a controller ***

describe("ShoppingListController", function() {

  // Loads the shopping list App
  beforeEach(module('ShoppingListApp'));

  var $controller;
  var shoppingListController;

  // Inject $controller so we can reuse the $controller
  beforeEach(inject(function (_$controller_) {
    // Angular strips off the "_" to pass the correct value
    $controller = _$controller_;

    // Create a mock service so we can test the error in the controller
    // only and not worry about the service.
    // Fake the functions in the service that we need.
    var ShoppingListServiceErrorMock = {};
    ShoppingListServiceErrorMock.addItem = function (name, quantity) {
      throw new Error("Test message.");
    };
    ShoppingListServiceErrorMock.getItems = function () {
      return null;    // scab
    };

    // Same name as the controller in our code that is being tested
    // Then tell it to replace the normal service with our mock service.
    // Replaces the injected controller: 
    //          ShoppingListController.$inject = ['ShoppingListService'];
    // with the mock object.
    shoppingListController =
      $controller('ShoppingListController',
                  {ShoppingListService: ShoppingListServiceErrorMock});

  }));

  // Run the test and expect the result
  // URL for me is: http://127.0.0.1:5500/SpecRunner.html
  it("should change error message in controller", function() {
    shoppingListController.addItem();
    expect(shoppingListController.errorMessage).toBe("Test message.");
  });

});
