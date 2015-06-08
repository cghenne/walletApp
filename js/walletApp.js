var app = angular.module('walletApp', []);


app.controller('walletCtrl', function($scope) {
    //init
    $scope.transactionTypes = ['Add','Remove'];
    $scope.transactionType = $scope.transactionTypes[0]; //prevent the empty option for select
    $scope.negativeAmount = false;
    $scope.broke = false;
    
    if (localStorage.getItem("total") === null) {
        // first time
        $scope.currency = "£";
        $scope.total = 0;
        $scope.wallet = [];
        localStorage.setItem('currency', $scope.currency);
        localStorage.setItem('total', $scope.total);
        localStorage.setItem('wallet', JSON.stringify($scope.wallet));
    }else{
        $scope.currency = localStorage.getItem('currency');
        $scope.total = parseFloat(localStorage.getItem('total'));
        $scope.wallet = JSON.parse(localStorage.getItem('wallet'));
    }
    
    
    $scope.updateCurrency = function (newCurrency){
        $scope.currency = newCurrency;
        localStorage.setItem('currency', newCurrency);
    }
    
    
    $scope.newTransaction = function () {
        if($scope.amount < 0){ // check if amount is positive
            $scope.negativeAmount = true;           
        }else{
            $scope.negativeAmount = false; // reset negative amount
            if($scope.transactionType === "Remove" && $scope.total < $scope.amount ){ // check if remove and not broke
                $scope.broke = true;
            }else{
                $scope.broke = false; // reset broke
                
                $scope.wallet.push({transactionType:$scope.transactionType, amount:$scope.amount, timestamp:new Date()}); // add transaction
                localStorage.setItem('wallet', JSON.stringify($scope.wallet));
                // update total
                if($scope.transactionType === "Add"){ 
                    $scope.total += $scope.amount; 
                }else{
                    $scope.total -= $scope.amount;
                }
                localStorage.setItem('total', $scope.total);
                
                // reset form
                $scope.amount = '';
                $scope.myForm.$setPristine();
            }
        }
    };
    
    
    $scope.reset = function () {
        $scope.negativeAmount = false;
        $scope.broke = false;
        $scope.wallet = [];
        $scope.currency = "£";
        $scope.total = 0;
        $scope.wallet = [];
        localStorage.setItem('currency', $scope.currency);
        localStorage.setItem('total', $scope.total);
        localStorage.setItem('wallet', JSON.stringify($scope.wallet));
        //reset form
        $scope.amount = '';
        $scope.myForm.$setPristine();
    }
   
});
