var app = angular.module('walletApp', []);


app.controller('walletCtrl', function($scope) {
    //init
    $scope.transactionTypes = ['Add','Remove'];
    $scope.transactionType = $scope.transactionTypes[0]; //prevent the empty option for select
    $scope.negativeAmount = false;
    $scope.broke = false;
    
    //init if no persistance
    $scope.currency = "£";
    $scope.total = 0;
    
    // dummy data
    $scope.wallet = [
        {transactionType:"Add", amount:'200', timestamp:"2015-06-08T16:57:24.973Z" },
        {transactionType:"Add", amount:'100', timestamp:"2015-06-08T16:57:24.973Z" },
        {transactionType:"Add", amount:'200', timestamp:"2015-06-08T16:57:24.973Z" },
        {transactionType:"Remove", amount:'100', timestamp:"2015-06-08T16:57:24.973Z" },
        {transactionType:"Remove", amount:'20', timestamp:"2015-06-08T16:57:24.973Z" },
        {transactionType:"Remove", amount:'30', timestamp:"2015-06-08T16:57:24.973Z" }
    ];
    
    $scope.newTransaction = function () {
        if($scope.amount < 0){ // check if amount is positive
            $scope.negativeAmount = true;
           
        }else{
            $scope.negativeAmount = false; // reset negative amount
            if($scope.transactionType === "Remove" && $scope.total < $scope.amount ){ // check if remove and not broke
                $scope.broke = true;
            }else{
                $scope.broke = false; // reset broke
                
                $scope.wallet.push({transactionType:$scope.transactionType, amount:$scope.amount, timestamp:new Date()}); // add transation
                
                // update total
                if($scope.transactionType === "Add"){ 
                    $scope.total += $scope.amount; 
                }else{
                    $scope.total -= $scope.amount;
                }
                
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
        $scope.amount = '';
        $scope.myForm.$setPristine();
    }
   
});
