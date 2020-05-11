describe('The menu service', function() {
    'use strict';
  
    var $httpBackend;
    var menuService;
    var ApiPath;
  
    /**
     * Gets called before each unit test it()
     */
    beforeEach(function() {
      // Load module
      module('common');
  
      // Load any dependencies
      inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        menuService = $injector.get('MenuService');
        ApiPath = $injector.get('ApiPath');
      });
    });
  
    it('should retrieve all menu items when no category code is specified', function() {
      $httpBackend.expectGET(ApiPath + '/menu_items.json').respond(testData.allMenuItems);
      menuService.getMenuItems(null).then(function(items) {
        expect(items).toEqual(testData.allMenuItems);
      });
      $httpBackend.flush();
    });

});