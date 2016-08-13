var app = angular.module('waitStaffApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'home.html'
    })
    .when('/add-meal', {
        templateUrl: 'add-meal.html',
        controller: 'AddMealCtrl',
        controllerAs: 'addMealCtrl'
    })
    .when('/earnings', {
        templateUrl: 'earnings.html',
        controller: 'AddMealCtrl',
        controllerAs: 'addMealCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);

app.run(function(mealDataService) {
    mealDataService.init();
});

app.service('mealDataService', function() {
    var vm = this;

    // Form data from user input
    vm.data = {
        baseMealPrice: null,
        tipPercent: null,
        taxRate: null
    };

    // For displaying error message
    vm.formInvalid = false;

    // Initilize variables
    vm.init = function() {
        vm.subtotal = 0;
        vm.tipAmount = 0;
        vm.mealTotal = 0;
        vm.totalTips = 0;
        vm.mealCount = 0;
        vm.avgTip = 0;
    };
});

app.controller('AddMealCtrl', function($scope, mealDataService) {
    var addMealCtrl = this;
    addMealCtrl.data = mealDataService.data;
    addMealCtrl.service = mealDataService;

    // Calculates charges for each customer
    addMealCtrl.getCustomerCharges = function() {
        // Calculate subtotal of meal
        addMealCtrl.service.subtotal = addMealCtrl.data.baseMealPrice;
        // Calculate tip amount based on subtotal and tip percentage
        addMealCtrl.service.tipAmount = addMealCtrl.service.subtotal * (addMealCtrl.data.tipPercent / 100);
        // Calculate total cost of meal, including tax and tip
        addMealCtrl.service.mealTotal = addMealCtrl.service.subtotal + (addMealCtrl.service.subtotal * (addMealCtrl.data.taxRate / 100)) + addMealCtrl.service.tipAmount;
    };

    // Calculates cumulative earnings
    addMealCtrl.getEarnings = function() {
        // Calculate cumulative total tips
        addMealCtrl.service.totalTips += addMealCtrl.service.tipAmount;
        // Calculate average tip per meal
        addMealCtrl.service.avgTip = addMealCtrl.service.totalTips / addMealCtrl.service.mealCount;
    };

    // Submit form
    addMealCtrl.submit = function() {
        // If form is valid, populate charges, meal count, and earnings
        if ($scope.mealDetailsForm.$valid) {
            addMealCtrl.service.formInvalid = false;
            addMealCtrl.getCustomerCharges();
            addMealCtrl.service.mealCount++;
            addMealCtrl.getEarnings();
        // Else display error message
        } else {
            addMealCtrl.service.formInvalid = true;
        }
    };

    // Clear form fields while keeping previously submitted data
    addMealCtrl.clearInput = function() {
        addMealCtrl.data.baseMealPrice = null;
        addMealCtrl.data.taxRate = null;
        addMealCtrl.data.tipPercent = null;
    };

    // Resets the form to its initial state by clearing all input fields and reinitializing variables
    addMealCtrl.reset = function() {
        addMealCtrl.clearInput();
        addMealCtrl.service.init();
    };
});
