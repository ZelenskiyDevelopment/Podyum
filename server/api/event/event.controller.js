'use strict';

var _ = require('lodash');
var Event = require('./event.model');
var Q = require('q');
var User = require('./../user/user.model');
var Photo = require('./../photo/photo.model');
var Comment = require('../comment/comment.model');
var socket = require('../../config/socketio.js')(),
    PopulateUtils = require('../../components/utils/PopulateUtils'),
    mongo = require('mongodb');

function getPipeline(interestedUsers) {
    return [
        {
            $match: {
                author: {
                    $in: interestedUsers
                }
            }
        },
        {
            $sort: {date: -1}
        },
        {
            $group: {
                _id: {$ifNull: ['$originalEvent', '$_id']},
                description: {$last: '$description'},
                type: {$last: '$type'},
                date: {$last: '$date'},
                photos: {$last: '$photos'},
                video: {$last: '$video'},
                isShared: {$last: '$isShared'},
                originalEvent: {$last: '$originalEvent'},
                comments: {$last: '$comments'},
                medals: {$last: '$medals'},
                author: {$last: '$author'}
            }
        },
        {
            $sort: {date: -1}
        }
    ];
}


exports.getMyPosts = function (req, res) {

    var Id = req.params.id;
    var findId = new mongo.ObjectID(Id);

    Event.find({
        author: findId
    }).execQ().then(function (events) {

        return res.json(200, events);
    }).catch(function (err) {
        return handleError(res, err);
    });


};

// Get list of events
exports.index = function (req, res) {
    var paths = ['author', 'comments.author'],
        options = PopulateUtils.userPopulateOptionsArray(paths),
        nestedPaths = ['originalEvent.author', 'originalEvent.comments.author', 'comments.author'],
        nestedOptions = PopulateUtils.userPopulateOptionsArray(nestedPaths);

    options.push({
        path: 'originalEvent',
        model: 'Event'
    });

    Event.aggregate(getPipeline(getInterested(req.user)))
        //.allowDiskUse(true)
        .execQ().then(function (events) {
            console.log(events);
            return Event.populateQ(events, options);
        }).then(function (results) {
            return Event.populateQ(results, 'photos');
        }).then(function (results) {
            return Event.populateQ(results, 'comments');
        }).then(function (results) {
            return Event.populateQ(results, nestedOptions);
        }).then(function (results) {
            return res.json(200, results);
        }).catch();
};

exports.getCommentsForEvent = function (req, res) {

    var Id = req.params.id;

    Comment.find({
        _id: Id
    }).populate('author')
        .execQ().then(function (comment) {
            return res.json(200, comment);
        }).catch(function (err) {
            return handleError(res, err);
        });
};

exports.getOwnEventsById = function (req, res) {
    var userId = req.params.id,
        optionsAuthor = PopulateUtils.userPopulateOptions('author'),
        optionsCommentsAuthor = PopulateUtils.userPopulateOptions('comments.author');
    Event.find({
        author: userId
    }).sort({date: -1})
        .populate(optionsAuthor)
        .populate('originalEvent')
        .populate('originalEvent.photos')
        .populate('photos')
        .populate('comments')
        .populate('comments.author')
        .execQ().then(function (events) {
            var promiseArray = [];
            _.each(events, function (event) {
                var deffered = Q.defer();
                promiseArray.push(deffered.promise);
                getCommentsForEvent(event).then(function (event) {
                    if (event.originalEvent) {
                        Event.findById(event.originalEvent,function (err, event) {
                        }).populate(optionsAuthor)
                            .populate(optionsCommentsAuthor)
                            .populate('photos')
                            .populate('comments')
                            .execQ().then(function (originalEvent) {

                                event.originalEvent = originalEvent;
                                getCommentsForEvent(originalEvent).then(function (originalEvent) {
                                    event.originalEvent = originalEvent;
                                    deffered.resolve(event);
                                });
                            })
                    }
                    else {
                        deffered.resolve(event);
                    }
                });
            });
            Q.all(promiseArray).then(function (events) {
                return res.json(200, events);
            });
        }).catch(function (err) {
            return handleError(res, err);
        });
};

exports.getOwnEvents = function (req, res) {
    var userId = req.user._id,
        optionsAuthor = PopulateUtils.userPopulateOptions('author'),
        optionsCommentsAuthor = PopulateUtils.userPopulateOptions('comments.author');
    Event.find({
        author: userId
    }).sort({date: -1})
        .populate(optionsAuthor)
        .populate(optionsCommentsAuthor)
        .populate('originalEvent')
        .populate('originalEvent.photos')
        .populate('photos')
        .populate('comments')
        .execQ().then(function (events) {
            var promiseArray = [];
            _.each(events, function (event) {
                var deffered = Q.defer();
                promiseArray.push(deffered.promise);
                getCommentsForEvent(event).then(function (event) {
                    if (event.originalEvent) {
                        Event.findById(event.originalEvent,function (err, event) {
                        }).populate(optionsAuthor)
                            .populate(optionsCommentsAuthor)
                            .populate('photos')
                            .populate('comments')
                            .execQ().then(function (originalEvent) {
                                event.originalEvent = originalEvent;
                                getCommentsForEvent(originalEvent).then(function (originalEvent) {
                                    event.originalEvent = originalEvent;
                                    deffered.resolve(event);
                                });
                            })
                    }
                    else {
                        deffered.resolve(event);
                    }
                });
            });
            Q.all(promiseArray).then(function (events) {
                return res.json(200, events);
            });
        }).catch(function (err) {
            return handleError(res, err);
        });
};

exports.getOwnEventsToUser = function (req, res) {
    var userId = new mongo.ObjectID(req.params.id),
        optionsAuthor = PopulateUtils.userPopulateOptions('author'),
        optionsCommentsAuthor = PopulateUtils.userPopulateOptions('comments.author');
    Event.find({
        toUser: userId
    }).sort({date: -1})
        .populate(optionsAuthor)
        .populate(optionsCommentsAuthor)
        .populate('originalEvent')
        .populate('originalEvent.photos')
        .populate('photos')
        .populate('comments')
        .execQ().then(function (events) {
            var promiseArray = [];
            _.each(events, function (event) {
                var deffered = Q.defer();
                promiseArray.push(deffered.promise);
                getCommentsForEvent(event).then(function (event) {
                    if (event.originalEvent) {
                        Event.findById(event.originalEvent,function (err, event) {
                        }).populate(optionsAuthor)
                            .populate(optionsCommentsAuthor)
                            .populate('photos')
                            .populate('comments')
                            .execQ().then(function (originalEvent) {
                                event.originalEvent = originalEvent;
                                getCommentsForEvent(originalEvent).then(function (originalEvent) {
                                    event.originalEvent = originalEvent;
                                    deffered.resolve(event);
                                });
                            })
                    }
                    else {
                        deffered.resolve(event);
                    }
                });
            });
            Q.all(promiseArray).then(function (events) {
                return res.json(200, events);
            });
        }).catch(function (err) {
            return handleError(res, err);
        });
};

exports.show = function (req, res) {
    Event.findByIdQ(req.params.id).then(function (event) {
        if (!event) {
            return res.send(404);
        }
        return res.json(event);
    }).catch(function (err) {
        return handleError(res, err);
    });
};

exports.create = function (req, res) {
    var userId = req.body._id,
        event = req.body;
    delete req.body._id;
    req.body.author = userId;
    Event.createQ(event).then(function (event) {
        return Photo.populateQ(event, 'photos');
    }).then(function (event) {
        if (event.type === "onePhoto") {
            event.photos[0].event = event;
            return event.photos[0].saveQ().then(function () {
                return event;
            });
        }
        return event;
    }).then(function (event) {
        var e = event.toObject();
        e.author = req.user;
        return res.json(201, e);
    }).catch(function (err) {
        return handleError(res, err);
    });
};

// Updates an existing event in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Event.findByIdQ(req.params.id).then(function (event) {
        if (!event) {
            return res.send(404);
        }
        return _.merge(event, req.body);
    }).then(function (updated) {
        return updated.saveQ().then(function () {
            return res.json(200, updated);
        });
    }).catch(function (err) {
        return handleError(res, err);
    });
};

// Deletes a event from the DB.
exports.destroy = function (req, res) {
    Event.findById(req.params.id, function (err, event) {
        if (err) {
            return handleError(res, err);
        }
        if (!event) {
            return res.send(404);
        }
        event.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

exports.addComment = function (req, res) {
    Event.findById(req.params.id, function (err, event) {
        console.log(req.body);
        if (err) {
            return handleError(res, err);
        }
        if (!event) {
            return res.send(404);
        }
        var comment = {
            author: req.user._id,
            comment: req.body.comment,
            date: new Date()
        };
        var user = req.user;
        Comment.create(comment, function (err, comment) {
            if (err) {
                return handleError(res, err);
            }
            if (event.type == "onePhoto") {
                Event.populate(event, {path: "photos"}, function (err, event) {
                    event.photos[0].comments.push(comment);
                    event.photos[0].save();
                });
            }
            event.comments.push(comment);
            if (user.id != event.author) {
                User.findById(event.author, function (err, author) {
                    var newNotification = {
                        kind: "commentedBy",
                        data: {
                            _id: req._id,
                            name: user[user.kind].name,
                            firstName: user[user.kind].firstName,
                            lastName: user[user.kind].lastName,
                            profilePhoto: user.profilePhoto
                        }
                    };
                    author.newNotification.push(newNotification);
                    socket.directMessage(event.author, 'notification', newNotification);
                    author.save(function (err) {
                        if (err) return validationError(res, err);
                    });
                });
            }
            //shareEvent(req.params.id, 'comment', req.user._id);
            event.save(function (err) {
                if (err) {
                    return handleError(res, err);
                }
                User.populate(comment, PopulateUtils.userPopulateOptions('author'), function (err, comment) {
                    return res.json(201, comment);
                });
            });
        });
    });
};

exports.share = function (req, res) {
    shareEvent(req.params.id, 'shared', req.user._id)
        .then(function (evt) {
            evt.author = req.user;
            return res.json(201, evt);
        }).catch(function (err) {
            return validationError(res, err);
        });
};

exports.sendCongrats = function (req, res) {
    var srcUser = req.user,
        dstUser = req.body.dstUserId,
        eventId = req.params.id,
        newNotification = {
            kind: "congrats",
            data: {
                _id: srcUser._id,
                name: srcUser[srcUser.kind].firstName || srcUser[srcUser.kind].name,
                lastName: srcUser[srcUser.kind].lastName,
                profilePhoto: srcUser.profilePhoto,
                eventId: eventId
            }
        };


    Event.findById(eventId, function (err, event) {
        var ind = _.sortedIndex(event.medals, srcUser._id.toString(), function (item) {
            return item.toString();
        });

        var isPresent = false;

        if (ind < event.medals.length && event.medals[ind].equals(srcUser._id)) {
            isPresent = true;
        }
        if (!isPresent && dstUser.toString() !== srcUser._id.toString()) {
            Event.update({_id: eventId}, {$push: {medals: {$each: [srcUser._id], $sort: 1}}}, {}, function (err, answer) {
                shareEvent(eventId, 'medal', srcUser);
            });

            User.findById(dstUser, function (err, user) {
                if (err) {
                    return handleError(res, err);
                }
                if (!user) {
                    return res.send(404);
                }
                user.newNotification.push(newNotification);
                socket.directMessage(dstUser, 'notification', newNotification);

                user.save(function (err) {
                    if (err) return validationError(res, err);
                    res.send(200);
                });
            });
        }
        else {
            res.send(200);
        }
    });
};

function getInterested(user) {
    var interested = [user._id],
        assigned, assignedTo;

    assigned = _.map(user.assigned, function (assign) {
        return assign.user;
    });

    assignedTo = _.map(user.assignedTo, function (assign) {
        return assign.user;
    });

    interested.push.apply(interested, user.friends);
    interested.push.apply(interested, assigned);
    interested.push.apply(interested, assignedTo);
    interested.push.apply(interested, user.follows);

    return interested;
}

function shareEvent(evtId, shareType, author) {
    return Event.findByIdQ(evtId).then(function (event) {
        var eventObj = event.toObject();
        var evt = {
            type: shareType,
            isShared: true,
            author: author,
            originalEvent: evtId
        };

        if (eventObj.isShared) {
            evt.originalEvent = eventObj.originalEvent;
        } else {
            evt.originalEvent = event;
        }

        return Event.createQ(evt);
    });
}

function getCommentsForEvent(event) {

    var eventComments = [];
    var optionsCommentsAuthor = PopulateUtils.userPopulateOptions('author');
    _.each(event.comments, function (comment) {
        var commentDefferd = Q.defer();
        eventComments.push(commentDefferd.promise);
        Comment.populateQ(comment, optionsCommentsAuthor).then(function (comment) {
            commentDefferd.resolve(comment);
        });
    });
    var defferedEvent = Q.defer();
    Q.all(eventComments).then(function (comments) {
        event.comments = comments;
        defferedEvent.resolve(event);
    });
    return defferedEvent.promise;
}

function handleError(res, err) {
    return res.send(500, err);
}

function validationError(res, err) {
    return res.json(422, err);
}
