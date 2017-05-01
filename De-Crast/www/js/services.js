angular.module('decrast.services', ['ngOpenFB'])

    // dummy Tasks data
    .factory('Tasks', function() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var tasks = [{
            id: 0,
            title: 'Ben Sparrow',
            deadline: '2017-01-01'
        }, {
            id: 1,
            title: 'Max Lynx',
            deadline: '2017-01-03'
        }, {
            id: 2,
            title: 'Adam Bradleyson',
            deadline: '2017-01-02'
        }];

        return {
            all: function() {
                return tasks;
            },
            remove: function(tasks) {
                tasks.splice(tasks.indexOf(task), 1);
            },
            get: function(taskId) {
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i].id === parseInt(taskId)) {
                        return tasks[i];
                    }
                }
                return null;
            }
        }
    })


    // ftasks dummy data
    .factory('Ftasks', function() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var ftasks = [{
            id: 0,
            title: 'Ben Sparrow',
            deadline: '2017-05-05'
        }, {
            id: 1,
            title: 'Max Lynx',
            deadline: '2017-05-06'
        }, {
            id: 2,
            title: 'Adam Bradleyson',
            deadline: '2017-05-07'
        }];

        return {
            all: function() {
                return ftasks;
            },
            remove: function(ftasks) {
                ftasks.splice(ftasks.indexOf(ftask), 1);
            },
            get: function(ftaskId) {
                for (var i = 0; i < ftasks.length; i++) {
                    if (ftasks[i].id === parseInt(ftaskId)) {
                        return ftasks[i];
                    }
                }
                return null;
            }
        }
    })

    // friends dummy data
    .factory('Friends', function() {
        // Might use a resource here that returns a JSON array

        return function() {
            // currently the uid input is fbId, later will be De-Crast userId
            self.addFriend = function(uid, name, status) {
                var friend = {
                    friend_uid: uid,
                    friend_name: name,
                    friend_status: status
                };
                return friend;
            };
            // change the friend's status
            self.statusHandler = function(friend, status) {
                friend.friend_status = status;
                return friend;
            };
            // other potential handler
            // dropdown menu/popup selection page when creating a new task
            // Be blocked detector
            return self;
        };

    })
    // notifications dummy data
    .factory('Notif', function() {
        // Might use a resource here that returns a JSON array

        return function() {
            // currently the uid input is fbId, later will be De-Crast userId
            self.addNotif = function(sender, recipient, type, sent_date, notificationId, task, metadata, file, text) {
                var notif = {
                    notif_sender: sender,
                    notif_recipient: recipient,
                    notif_type: type,
                    notif_sent_date: sent_date,
                    notif_notificationId: notificationId,
                    notif_task: task,
                    notif_metadata: metadata,
                    notif_file: file,
                    notif_text: text
                };
                return notif;
            };
            // other potential handler
            // dropdown menu/popup selection page when creating a new task
            // Be blocked detector
            return self;
        };
    })
    /*
     This factory will be used for creating task objects and processing changes to the tasks. We will also likely add functions
     to  update local storage and the server in this factory.
     */

    .factory('TaskFact', function() {

        return function() {

            //task constructor?
            self.addTask = function(taskId, name, descrip, category, time, partner, facebook, evidenceType, owned) {

                var task = {
                    task_name: name,
                    task_descrip: descrip,
                    task_category: category,
                    task_time: time,
                    task_partner: partner,
                    task_facebook: facebook,
                    task_evidenceType: evidenceType,
                    task_owned: owned
                };

                task.task_id = taskId;

                /*
          // CODE TO UPDATE MASTER LIST, LOCAL STORAGE, AND SERVER. NOT SURE IF IT SHOULD GO HERE OR IN CONTROLLER
           $rootScope.task_list[task.task_id] = task;

           localStorage.setItem('task_list', angular.toJson($rootScope.task_list));

           //api call
           */
                return task;
            };

            //task editor?
            self.editTask = function(task, name, descrip, category) {
                task.task_name = name;
                task.task_descrip = descrip;
                task.task_category = category;

                /*
                 Could put code to update localStorage and server here or at the calls.
                 */
                return task;
            };

            self.updateDue = function(task, update_bool, time) {
                if (update_bool == true) {
                    task.task_time = time;
                }

                return task;
                /*
                 Again, we can do local storage here or at the point of call.
                 */
            };


            return self;
        };

    })

    .factory('Categories', function() {
        return function() {
            // currently the uid input is fbId, later will be De-Crast userId
            self.addCategory = function(id, name) {
                var category = {
                    id: id,
                    name: name
                };
                return category;
            };
            return self;
        };

    })

    .factory('EvidenceTypes', function() {
        var evidenceTypes = [{
            evidenceTypeId: 0,
            name: 'Photo'
        }, {
            evidenceTypeId: 1,
            name: 'GPS'
        }, {
            evidenceTypeId: 2,
            name: 'Honor'
        }]

        return {
            all: function() {
                return evidenceTypes;
            },
            get: function(evidenceTypeId) {
                for (var i = 0; i < evidenceTypes.length; i++) {
                    if (evidenceTypes[i].evidenceTypeId === parseInt(evidenceTypeId)) {
                        return evidenceTypes[i];
                    }
                }
                return null;
            }
        }
    })

    .factory('FacebookPoster', function(ngFB) {
        return {
            makePost: function() {
                var fbToken = localStorage.getItem('fbAccessToken');

                function getRandomInt(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.floor(Math.random() * (max - min)) + min;
                }

                var msg = '';
                var randomNumber = getRandomInt(1, 5);
                switch (randomNumber) {
                    case 1:
                        msg = 'My life is out of control!';
                        break;
                    case 2:
                        msg = 'I am not as responsible as I thought :(';
                        break;
                    case 3:
                        msg = 'I need to re-evaluate everything';
                        break;
                    case 4:
                        msg = 'Well this is sure embarassing ...';
                        break;
                    case 5:
                        msg = 'I need to do better next time!';
                        break;
                }

                // TODO: Use De-crast server messages and error messages.

                ngFB.api({
                    path: '/me/feed',
                    method: 'POST',
                    params: {
                        link: 'http://www.nooooooooooooooo.com/vader.jpg',
                        picture: 'http://www.nooooooooooooooo.com/vader.jpg',
                        message: msg,
                        access_token: fbToken,
                        privacy: "{'value': 'ALL_FRIENDS'}"
                    }
                }).then(function(res) {
                    console.log("FB post successful!");
                }, function(err) {
                    // error
                    console.log("ERROR:  " + JSON.stringify(err));
                });
            }
        }
    })

    .factory('NotificationHandler', function(Storage, $state) {
        return {
            handleFromBackground: function(notification) {
                /* Remove escape characters to make parsing simpler. */
                console.log("Notification handler from background");
                console.log(JSON.stringify(notification));

                /* Handle invite request. */
                if (notification.type == 5) {
                    var remove_escs = notification.notif_task.replace('\"', '"');
                    notification.notif_task = angular.fromJson(remove_escs);
                    $state.go('tab.notif');
                } else if (notification.type == 6) {
                    var viewer_id = notification.viewer_id;
                    var task_id = notification.task_id;
                    Storage.updateTaskViewer(task_id, viewer_id);
                } else if (notification.type == 2) {
                	// TODO: tell the viewer a file has been uploaded as evidence
                	$state.go('tab.notif');
                }
            },
            handleFromInApp: function(notification) {
                console.log("Notification handler from in-app");
                console.log(JSON.stringify(notification));
            }
        }
    });

    /**
	REMINDER = 0 # from viewer to task owner
	REGULAR = 1 # from system to task owner
	EVIDENCE = 2 # from system to viewer
	DEADLINE = 3 # from user to viewer
	INVITE = 5 # from user to user
	INVITE_ACCEPT = 6 # viewer accepted task invite
	EXPIRED = 7
	COMPLETED = 8
    */