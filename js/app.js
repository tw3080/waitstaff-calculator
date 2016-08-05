angular.module('waitStaffApp', []).controller('MainCtrl', function($scope) {
    var vm = this;

    // Initilize variables
    vm.subtotal = 0;
    vm.tipAmount = 0;
    vm.mealTotal = 0;
    vm.totalTips = 0;
    vm.mealCount = 0;
    vm.avgTips = 0;

    // Form data
    vm.data = {};

    // Submit form
    vm.submit = function() {
        if ($scope.mealDetailsForm.$valid) {
            console.log('The form is valid');
            /* TODO: How can I keep these as numbers AND round them to two decimal places AND keeping the trailing zeros? Seems like I can only pick two of those. */
            // Calculate subtotal of meal
            vm.subtotal = Math.round(vm.data.baseMealPrice * 1e2) / 1e2;
            // Calculate tip amount based on subtotal and tip percentage
            vm.tipAmount = Math.round((vm.subtotal * (vm.data.tipPercent / 100)) * 1e2) / 1e2;
            // Calculate total cost of meal, including tax and tip
            vm.mealTotal = Math.round(((vm.subtotal + (vm.subtotal * (vm.data.taxRate / 100))) + vm.tipAmount) * 1e2) / 1e2;
        } else {
            // TODO: Add better error handling
            console.log('The form is invalid');
        }
    };
});
