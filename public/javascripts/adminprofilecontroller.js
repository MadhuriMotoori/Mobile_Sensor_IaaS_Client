
"use strict"
  app.controller('adminprofilecontroller',['$scope','$http','$state','$cookies', '$interval',function ($scope, $http, $state, $cookies, $interval){

    if($cookies.get('username') ==undefined || $cookies.get('username') =='' || $cookies.get('username') == null){
        //$state.go('admin')



    }
    else
    {

        $scope.test = $state.params.test;
        $scope.user = $cookies.get('username');

        $scope.logout = function(){
            $cookies.remove('username');
            $state.go('login')
        }



        var updatedashboard = function() {
            console.log('Changing exampleText');
            $scope.total_users();
            $scope.sensors_count()
            $scope.cluster_count();
            $scope.pending_sensorcount();
            $scope.active_sensorcount();
            $scope.terminated_sensorcount();
            $scope.sensor_typecount();
            $scope.sensors_per_cluster();
        };
        
        $interval(updatedashboard, 5000, 1);
        
        $scope.total_users = function(){
            $http.get('http://localhost:5000/api/v1/totalusers')
                .success(function(data){
                    if(data.statusCode == 200)
                    {
                        $scope.users = data.users;
                    }
                    else
                    {
                    }
                })
                .error(function(error){
                    console.log('error');
                })
        }

        $scope.sensors_count = function(){
            $http.get(
                'http://localhost:5000/api/v1/totalsensors'

            )
                .success(function(data){
                    if(data.statusCode == 200)
                    {
                        $scope.sensors = data.sensors;
                    }
                    else
                    {
                    }
                })
                .error(function(error){
                    console.log('error')
                })
        }

        $scope.cluster_count = function(){
            $http.get(
                    'http://localhost:5000/api/v1/totalclusters'

                )
                    .success(function(data){
                        if(data.statusCode == 200)
                        {
                            $scope.clusters = data.clusters;
                        }
                        else
                        {
                        }
                    })
                    .error(function(error){
                        console.log('error')
                    })
        }


        $scope.active_sensorcount = function () {

            $http.get(
                'http://localhost:5000/api/v1/activesensors'
            )
                .success(function(data){
                    if(data.statusCode == 200)
                    {
                        $scope.activesensors = data.activesensors;
                        $scope.activesensorlist = data.result;
                    }
                    else
                    {
                    }
                })
                .error(function(error){
                    console.log('error')
                })

        }

        $scope.pending_sensorcount = function () {

            $http.get(
                'http://localhost:5000/api/v1/pendingsensors'
            )
                .success(function (data) {
                    if (data.statusCode == 200) {
                        $scope.pendingsensorscount = data.pendingsensors;
                        $scope.pendingsensorlist = data.result;

                    }
                    else {
                    }
                })
                .error(function (error) {
                    console.log('error')
                })
        }

        $scope.terminated_sensorcount = function () {

            $http.get(
                'http://localhost:5000/api/v1/terminatedsensors'

            )
                .success(function (data) {
                    if (data.statusCode == 200) {
                        $scope.terminatedsensorscount = data.terminatedsensors;
                        $scope.terminatedsensorlist = data.result;
                    }
                    else {
                    }
                })
                .error(function (error) {
                    console.log('error')
                })
        }

        $scope.sensor_typecount = function () {
            $http.get(
                'http://localhost:5000/api/v1/typecount'

            )
                .success(function (data) {
                    if (data.statusCode == 200) {
                        $scope.sensorcount = data.count;
                        $scope.sensortypes = data.types;
                    }
                    else {
                    }
                })
                .error(function (error) {
                    console.log('error')
                })
        }

        $scope.sensors_per_cluster = function(){
            $http.get(
                'http://localhost:5000/api/v1/sensorspercluster'

            )
                .success(function (data) {
                    if (data.statusCode == 200) {
                        $scope.clustercount = data.count;
                        $scope.clusternames = data.clusters;
                    }
                    else {
                    }
                })
                .error(function (error) {
                    console.log('error')
                })
        }

    }
      
  }])