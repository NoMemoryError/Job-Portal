app.service('SearchCriteria', function ($rootScope, $ionicLoading, $http, API_URL) {

    console.log("SC Service Initated");

    var jobMapOptions = {};

    var jobMap = {
        category: { value: "" },
        title: { value: "" },
        country: { value: "" },
        region: { value: "" },
        city: { value: "" }
    };


    // This part of the code needs some refactoring.

    // Populating competition criteria options
    var jobCriteria = {};
    $http.get(API_URL + 'job/populateSearchCriteria').
        success(function(data, status, headers, config) {
            jobCriteria = data;
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    $rootScope.$watch(function(){
        return jobCriteria;
    }, function(newVal) {
        console.log('newVal', newVal);
        // Reforming the server response in value title form for generic use
        Object.keys(newVal).forEach(function (key) {

            if(key != '$resolved' && key != '$promise') {
                var tempArray = [];
                jobCriteria[key] = _.union(jobCriteria[key],['Any']);

                // Processing every entry in the object
                _.each(jobCriteria[key], function(keyOptions){
                    if(keyOptions != 'Any') {
                        var tempObject = {};
                        tempObject.value = keyOptions;
                        tempObject.title = keyOptions;
                        tempArray.push(tempObject);
                    } else {
                        var tempObject = {};
                        tempObject.value = "";
                        tempObject.title = keyOptions;
                        tempArray.push(tempObject);
                    }
                });
                jobMapOptions[key] = tempArray;
            }
        });

    }, true);

    return {
        /**
         * Populate the Search Criteria Option
         * @param {Object} Scope
         */
        getJobMapOptions: function(scope) {
            scope.searchCriteriaOpts = jobMapOptions;
            //scope.searchCriteriaOpts = {};
            //_.extend(scope.searchCriteriaOpts,competitionMapOptions);
        },

        /**
         * Getter Method for the Competition Map Object
         * @param {string} name
         * @returns {[]}
         */
        getJobMapParam: function(name) {
            return _.extend({},jobMap[name]);
        },

        /**
         * Setter Method for the Competition Map Object
         * @param {string} name
         * @param {{}} obj
         */
        setJobMapParam: function(name, obj) {
            if(!(_.isUndefined(obj))){
                jobMap[name].value = obj;
            }
        },

        /**
         * Get Competition Map Object
         * @returns {}
         */
        getJobMapObject: function() {
            return _.extend({},jobMap);
        }
    };

});