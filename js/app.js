var App = angular.module("App", ["ui.router"]);
App.controller("AppCtrl", ["$scope", "$state", "$log", function($scope, $state, $log) {
    var margin={
        left:50,
        right:50,
        top:50,
        bottom:50
    },
    width=1000,
    height=1000;

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    var format = d3.format(",d");

    var color = d3.scaleOrdinal(d3.schemeCategory20c);

    var rScale = d3.scaleLinear().range([0,20]);

    var pack = d3.pack()
        .size([width, height])
        .padding(1.5);

    d3.csv("data/mockdata.csv", function(d) {
        d["Death"] = +d.batDeath;
        d["Days"] = (new Date(d.end) - new Date(d.start)) / 86400000;
        return d;
    }, function(error, classes) {
        if (error) throw error;

rScale.domain(d3.extent(classes,function(d){return d.Death}));

        var roots = d3.hierarchy({children:classes})
                    .sum(function(d) { return d.Death});

        var node = svg.selectAll(".node")
                    .data(pack(roots).leaves())
                    .enter()
                    .append("g")
                    .attr("class","node")
                    .attr("transform",function(d){return "translate("+d.x+","+d.y+")";});

        node.append("circle")
        .attr("r",function(d){
            return d.r;
        })
        .attr("fill","red");

        node.append("title")
        .text(function(d) { 
            return d.data.name + "\n" + format(d.value); 
        })

    });

}]);


// App.config(function($stateProvider, $urlRouterProvider) {
//     $stateProvider.state('home', {
//         url: '/home',
//         templateUrl: 'templates/home.html',
//         controller: 'AppCtrl'
//     })

//     .state('work', {
//         url: '/work',
//         templateUrl: 'templates/work.html',
//         controller: 'workCtrl'
//     })
//     $urlRouterProvider.otherwise('/home');

// });