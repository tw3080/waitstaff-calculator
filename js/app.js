var app = angular.module('waitStaffApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm'
    })
    .when('/add-meal', {
        templateUrl: 'add-meal.html',
        controller: 'AddMealCtrl',
        controllerAs: 'vm'
    })
    .when('/earnings', {
        templateUrl: 'earnings.html',
        controller: 'EarningsCtrl',
        controllerAs: 'vm'
    });
}]);

app.controller('HomeCtrl', function($scope) {
    // Empty for now
});

app.controller('AddMealCtrl', function($scope) {
    var vm = this;

    // Form data from user input
    vm.data = {};

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

    // Calculates charges for each customer
    vm.getCustomerCharges = function() {
        // Calculate subtotal of meal
        vm.subtotal = vm.data.baseMealPrice;
        // Calculate tip amount based on subtotal and tip percentage
        vm.tipAmount = vm.subtotal * (vm.data.tipPercent / 100);
        // Calculate total cost of meal, including tax and tip
        vm.mealTotal = vm.subtotal + (vm.subtotal * (vm.data.taxRate / 100)) + vm.tipAmount;
    };

    // Submit form
    vm.submit = function() {
        // If form is valid, populate charges and earnings
        if ($scope.mealDetailsForm.$valid) {
            vm.formInvalid = false;
            vm.getCustomerCharges();
            vm.getEarnings();
        // Else display error message
        } else {
            vm.formInvalid = true;
        }
    };

    // Clear form fields while keeping previously submitted data
    vm.clearInput = function() {
        vm.data.baseMealPrice = '';
        vm.data.taxRate = '';
        vm.data.tipPercent = '';
    };

    // Resets the form to its initial state by clearing all input fields and reinitializing variables
    vm.reset = function() {
        vm.clearInput();
        vm.init();
    };
});

app.controller('EarningsCtrl', function($scope) {
    var vm = this;
    // Calculates cumulative earnings
    vm.getEarnings = function() {
        // Calculate cumulative total tips
        vm.totalTips += vm.tipAmount;
        // Calculate total number of meals
        vm.mealCount++;
        // Calculate average tip per meal
        vm.avgTip = vm.totalTips / vm.mealCount;
    };
});

/*
.controller('MainCtrl', function($scope) {
    var vm = this;

    // Form data from user input
    vm.data = {};

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

    // Calculates charges for each customer
    vm.getCustomerCharges = function() {
        // Calculate subtotal of meal
        vm.subtotal = vm.data.baseMealPrice;
        // Calculate tip amount based on subtotal and tip percentage
        vm.tipAmount = vm.subtotal * (vm.data.tipPercent / 100);
        // Calculate total cost of meal, including tax and tip
        vm.mealTotal = vm.subtotal + (vm.subtotal * (vm.data.taxRate / 100)) + vm.tipAmount;
    };

    // Calculates cumulative earnings
    vm.getEarnings = function() {
        // Calculate cumulative total tips
        vm.totalTips += vm.tipAmount;
        // Calculate total number of meals
        vm.mealCount++;
        // Calculate average tip per meal
        vm.avgTip = vm.totalTips / vm.mealCount;
    };

    // Submit form
    vm.submit = function() {
        // If form is valid, populate charges and earnings
        if ($scope.mealDetailsForm.$valid) {
            vm.formInvalid = false;
            vm.getCustomerCharges();
            vm.getEarnings();
        // Else display error message
        } else {
            vm.formInvalid = true;
        }
    };

    // Clear form fields while keeping previously submitted data
    vm.clearInput = function() {
        vm.data.baseMealPrice = '';
        vm.data.taxRate = '';
        vm.data.tipPercent = '';
    };

    // Resets the form to its initial state by clearing all input fields and reinitializing variables
    vm.reset = function() {
        vm.clearInput();
        vm.init();
    };
});
*/
