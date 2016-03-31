app = angular 
        .module("contactsMgr", ['ngRoute', 'ngSanitize', 'ngAnimate', 'firebase', 'mgcrea.ngStrap'])
     /*-------------------------------------------
        | CHAINING BEGIN
        ---------------------------------------------*/
        
    /*-------------------------------------------------
    | DIRECTIVES BEGIN
    --------------------------------------------------*/

    .directive('editable', function() {
  
    return {
       restrict: 'AE',
       templateUrl: 'assets/partials/editable.html',
       scope: {
            value: '=editable',
            field: '@fieldType'
       },
       controller: function($scope) {
           
           $scope.editor =  {
            showing: false,
            value: $scope.value 
            //from the line that has '=editable'...
           };
            console.log($scope.value);
           
           
            $scope.toggleEditor = function() {
            
            $scope.editor.showing = !$scope.editor.showing;
            $scope.field = ($scope.field) ? $scope.field : 'text';
           };
           
           
            $scope.save = function() {
              
                $scope.value = $scope.editor.value;
                 $scope.value.$save();
           
                $scope.toggleEditor();
                
            };
               
           },
       
           
       }
      
        
    })



  
    /*------------------------------------------------
    | DIRECTIVES END
    -------------------------------------------------*/

    /*--------------------------------------------- 
    | SERVICES BEGIN
     ------------------------------------------------*/   


        .factory('Contact', function ContactFactory($firebaseArray, $firebaseObject) {
        
          var contacts = new Firebase("https://contactsmgr.firebaseIO.com/contacts");

        return {
            get: function() {
             return $firebaseArray(contacts);   
            },
            find: function(id) {
                return $firebaseObject(contacts.child(id));
            }
        };
    
        
        })

       /*--------------------------------------------- 
    | SERVICES END
     ------------------------------------------------*/  
        /*-------------------------------------------
        | ROUTING BEGIN
        ---------------------------------------------*/
        .config(function($routeProvider) {
        
  
    /*
        
        $locationProvider
        
        .html5Mode({
            enabled: true,
            requireBase: false
        });
       
    */    
    
        $routeProvider
        
        .when('/', {
        
        controller: 'indexCtrl',
        templateUrl: 'assets/partials/index.html'
        
        })
        
        .when('/add-contact', {
        
        controller: 'addCtrl',
        templateUrl: 'assets/partials/add.html'
            
        })
        
        .when('/contact/:id', {
        
        controller: 'contactCtrl',
        templateUrl: 'assets/partials/contact.html'
            
        })
        .when('/sandbox', {
          controller: 'sandboxCtrl',
          templateUrl: 'assets/partials/sandbox.html'
        })
        .otherwise({
           redirectTo: '/' 
        });
        
        
        
        })
         /*-------------------------------------------
        | ROUTING END
        ---------------------------------------------*/

         /*-------------------------------------------
        | FILTERS BEGIN
        ---------------------------------------------*/

        .filter('paragraph', function() {
        
        return function(input) {
         
            return (input) ? input.replace(/\n/g, '<br />') : input;
        };
    
        })
      
         /*-------------------------------------------
        | FILTERS END
        ---------------------------------------------*/
        
         /*-------------------------------------------
        | CONTROLLER BEGIN
        ---------------------------------------------*/
        .controller("indexCtrl", function($scope,$http, Contact, $firebaseObject, $firebaseArray, $location, $alert) {
       
       var deletionAlert=$alert({
        title: 'Success!',
        content: 'The contact was deleted succesfuly.',
        type: 'warning',
        container: '#alertContainer',
        show: false
           
       });
        
    
        $scope.delete = function(index) {
        $scope.contacts.$remove(index);
        deletionAlert.show();
          
        };
        $scope.contacts = Contact.get();
    
    $scope.startSearch = function() {
    $location.path('/');
        
    };
    
    $scope.pageClass = function(path) {
      return (path == $location.path()) ? 'active' :  '' ;
    };
    
    
    /* Sets up the sorting filter's reverseSort as descending by default */
    
    $scope.reverseSort = true;
    
    
    $scope.sortData = function(column) { 
        $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
        $scope.sortColumn = column;
    }
    
    // getSortClass serves to determine what caret from Font Awesome is going to be used (down for descending and up for ascending) 
    
    $scope.getSortClass = function(column) {
     
        if ($scope.sortColumn == column) {
         
            return $scope.reverseSort ? $scope.caretPosition = 'fa fa-caret-up' : $scope.caretPosition = 'fa fa-caret-down' ;
            
        } 
    }
       
})

    .controller('sandboxCtrl', function($scope) {
    



    
    
    })
    .controller('addCtrl', function($scope, Contact, $alert) {
        
    
    
    
    var submitAlert = $alert({
       title: 'Success',
       content: 'Contact was succesfuly added!',
       type: 'success',
       container: '#alertContainer',
       show: false
       
        
        
    });
    
       $scope.submit = function(contact) {
        $scope.contacts.$add(contact);
      submitAlert.show();
        
        
    };
 
    
    
    
    })

    .controller('contactCtrl', function($scope, $routeParams, Contact, $firebaseObject) {
    $scope.contact = Contact.find($routeParams.id);
    })


        /*-------------------------------------------
        | CONTROLLER END
        ---------------------------------------------*/
    /*-------------------------------------------
        | CHAINING END
        ---------------------------------------------*/
;

 