/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/funds              ->  index
 * GET     /api/funds/:id          ->  show
 */

'use strict';

import _ from 'lodash';

// Due to lack of time, I did not manage to generate a viable MongoDB schema for the funds/chart JSON supplied
// I reverted to importing the JSON data directly on the front end, via the assets directory.
// The server is made obsolete, due to the above mentioned actions.

// Gets a single Fund from the DB
export function show(req, res) {
    return [];
}

// Gets a list of Funds
export function index(req, res) {
  return {};
}
