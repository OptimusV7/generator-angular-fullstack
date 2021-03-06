/**
 * Broadcast updates to client when the model changes
 */

import <%= classedName %>Events from './<%= basename %>.events';

// Model events to emit
const events = ['save', 'remove'];

export function register(spark) {
    // Bind model events to socket events
    /* eslint-disable-next-line no-unused-vars */
    for(const event of events) {
        const listener = createListener(`<%= cameledName %>:${event}`, spark);

        <%= classedName %>Events.on(event, listener);
        spark.on('disconnect', removeListener(event, listener));
    }
}


function createListener(event, spark) {
    return function(doc) {
        spark.emit(event, doc);
    };
}

function removeListener(event, listener) {
    return function() {
        <%= classedName %>Events.removeListener(event, listener);
    };
}
