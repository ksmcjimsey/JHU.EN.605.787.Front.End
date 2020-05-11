describe("Spec v2: ShoppingListController", function() {

  // provide service is the API.  Like the .config
  // Use a provide service to provide a mock service, defined inline
  // Mock service is part of the module now

  beforeEach(function () {

    // provide has a service method
    module(function ($provide) {

      // Two services the original service we are mocking had.
      $provide.service('ShoppingListServiceErrorMock', function () {
        var service = this;
        service.addItem = function (name, quantity) {
          throw new Error("Test message.");
        };

        service.getItems = function () {
          return null;
        };

      });
    });

    module('ShoppingListApp');
  });

  var $controller;
  var shoppingListController;

  // Injecting the controlle and the new mock service.  Just like injecting 
  // any other service.  The service was created above using the $provide.service
  beforeEach(inject(function (_$controller_, ShoppingListServiceErrorMock) {
    $controller = _$controller_;

    // Now we provide it to our ShoppingListController call
    // The ShoppingListController is created here and passed in the mock
    // service
    shoppingListController =
      $controller('ShoppingListController',
                  {ShoppingListService: ShoppingListServiceErrorMock});

  }));

  // Tests method
  // Call the addItem() and the mock service returns the error
  // We expect "Test messaage" to be set in the controller errorMessage
  // variable.
  it("should change error message in controller", function() {
    shoppingListController.addItem();
    expect(shoppingListController.errorMessage).toBe("Test message.");
  });

});
