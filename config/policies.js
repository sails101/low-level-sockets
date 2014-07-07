/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!documentation/
 */


module.exports.policies = {

  // Default policy for all controllers and actions
  // (`true` allows public access)
  '*': true,

  // Ensure that request originated from a socket before running
  // any of SocketController's actions that rely on `req` originating
  // from a request socket:
  SocketController: {
    'id': 'isSocket',
    'join': 'isSocket',
    'leave': 'isSocket',
    'broadcast': 'isSocket',
    'socketRooms': 'isSocket'
  }
};
