/**
 * SocketController
 *
 * @description :: Server-side logic for managing sockets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


  /**
   * `SocketController.getRoomSubscribers()`
   */
  getRoomSubscribers: function (req, res) {
    if (!req.param('room')) return res.badRequest('No `room` specified- please specify the name of the room whose subscribers you want to look up.');
    var subscribers = sails.sockets.subscribers(room);
    return res.ok(require('util').format(
      'The "%s" room currently has %d subscribers: ',
      req.param('room'),
      subscribers.length,
      subscribers
    ));
  },


  /**
   * `SocketController.id()`
   */
  id: function (req, res) {
    return res.ok('My socket ID is: ' + sails.sockets.id(req.socket));
  },


  /**
   * `SocketController.getSocketRooms()`
   */
  getSocketRooms: function (req, res) {
    var rooms = sails.sockets.socketRooms(req.socket);
    return res.ok(require('util').format(
      'My socket is currently subscribed to %d rooms: ',
      rooms.length,
      rooms
    ));
  },

  /**
   * `SocketController.rooms()`
   */
  rooms: function (req, res) {
    var rooms = sails.sockets.rooms();
    return res.ok(require('util').format(
      'There are currently %d rooms: ',
      rooms.length,
      rooms
    ));
  },

  /**
   * `SocketController.join()`
   */
  join: function (req, res) {
    if (!req.param('room')) return res.badRequest('No room specified- please specify the name of the room to join.');
    sails.sockets.join(req.socket, req.param('room'));
    return res.ok();
  },


  /**
   * `SocketController.leave()`
   */
  leave: function (req, res) {
    if (!req.param('room')) return res.badRequest('No room specified- please specify the name of the room to leave.');
    sails.sockets.leave(req.socket, req.param('room'));
    return res.ok();
  },


  /**
   * `SocketController.broadcast()`
   */
  broadcast: function (req, res) {
    if (!req.param('room')) return res.badRequest('No `room` specified- please specify the name of the room you want to broadcast this data to.');
    if (!req.param('data')) return res.badRequest('No `data` specified- please specify data to send.');
    sails.sockets.broadcast(req.socket, req.param('room'), req.param('data'));
    return res.ok();
  },


  /**
   * `SocketController.emitTo()`
   */
  emitTo: function (req, res) {
    if (!req.param('socketId')) return res.badRequest('No `socketId` specified- please specify the id of the socket you want to emit this data to.');
    if (!req.param('data')) return res.badRequest('No `data` specified- please specify data to send.');
    sails.sockets.emit(req.param('socketId'), req.param('data'));
    return res.ok();
  },


  /**
   * `SocketController.blast()`
   */
  blast: function (req, res) {
    if (!req.param('data')) return res.badRequest('No `data` specified- please specify data to send.');
    sails.sockets.blast(req.param('data'));
    return res.ok();
  }
};

