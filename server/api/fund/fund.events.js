/**
 * Fund model events
 */

'use strict';

import {EventEmitter} from 'events';
import Fund from './fund.model';
var FundEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FundEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Fund.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    FundEvents.emit(event + ':' + doc._id, doc);
    FundEvents.emit(event, doc);
  }
}

export default FundEvents;
