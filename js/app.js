//initialize the controller
var app = angular.module('todoApp', []);
app.controller('titlecontroller', ["$scope", function ($scope) {

  $scope.username = '';
  $scope.name = '';
  $scope.getStarted = function () {
    $scope.name = $scope.username;
    $scope.appTitle = $scope.name;
  }
  $scope.greeting = function () {
    let time = new Date().getHours();
    if (time < 12) {
      return 'Good Morning'
    }
    else if (time < 17) {
      return 'Good Afternoon'
    }
    else if (time < 21) {
      return 'Good Evening'
    }
    else {
      return 'Hope you have a nice day'
    }
  }
}])

app.controller('TodoController', function ($scope) {
  $scope.tasks = JSON.parse(localStorage.getItem('task')) || [];
  console.log($scope.tasks, "task")
  $scope.newTask = '';
  $scope.editedTask = '';
  // to add the task
  $scope.addTask = function () {
    if ($scope.newTask.trim() !== '') {
      $scope.tasks.push($scope.newTask);
      updateLocalStorage();
      $scope.newTask = ''; // Clear the input
    }
  };
  // to delete the task 
  $scope.removeTask = function (index) {
    if (index >= 0 && $scope.tasks.length) {
      $scope.tasks.splice(index, 1);
    }
    updateLocalStorage();
  };
  // to edit the task and open the dialog
  $scope.editTask = function (index) {
    $scope.editedTask = $scope.tasks[index];
    $scope.editIndex = index;
    $('#exampleModal-' + index).modal('show'); 
  }
  // update the edited task
  $scope.updateTask = function (index, editedTask) {

    // Check if the index is valid
    console.log(index, "index")
    if (index >= 0 && index < $scope.tasks.length) {
      $scope.tasks[index] = editedTask;
      updateLocalStorage();
      $('#exampleModal-' + index).modal('hide');
    } else {
      // Handle invalid index
      console.log('Invalid index:', index);
    }
    // Clear the editedTask
    $scope.editedTask = '';
  };



// handle to update the localstorage everytime value can be updated
  function updateLocalStorage() {
    localStorage.setItem('task', JSON.stringify($scope.tasks));
  }
});





