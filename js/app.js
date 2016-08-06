angular.module('waitStaffApp', []).controller('MainCtrl', function($scope) {
    var vm = this;

    // Form data from user input
    vm.data = {};

    // For displaying error message
    vm.formInvalid = false;

    // Initilize variables
    vm.init = function() {
        /* TODO: I'd like these to be formatted as 0.00? */
        vm.subtotal = 0;
        vm.tipAmount = 0;
        vm.mealTotal = 0;
        vm.totalTips = 0;
        vm.mealCount = 0;
        vm.avgTip = 0;
    };

    // Calculates charges for each customer
    vm.getCustomerCharges = function() {
        /* TODO: How can I keep these as numbers AND round them to two decimal places AND keeping the trailing zeros? Seems like I can only pick two of those. */
        // Calculate subtotal of meal
        vm.subtotal = Math.round(vm.data.baseMealPrice * 1e2) / 1e2;
        // Calculate tip amount based on subtotal and tip percentage
        vm.tipAmount = Math.round((vm.subtotal * (vm.data.tipPercent / 100)) * 1e2) / 1e2;
        // Calculate total cost of meal, including tax and tip
        vm.mealTotal = Math.round(((vm.subtotal + (vm.subtotal * (vm.data.taxRate / 100))) + vm.tipAmount) * 1e2) / 1e2;
    };

    // Calculates cumulative earnings
    vm.getEarnings = function() {
        // Calculate cumulative total tips
        // TODO: Why is Math.round not working here?
        vm.totalTips += Math.round(vm.tipAmount * 1e2) / 1e2;
        // Calculate total number of meals
        vm.mealCount++;
        // Calculate average tip per meal
        vm.avgTip = Math.round((vm.totalTips / vm.mealCount) * 1e2) / 1e2;
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
