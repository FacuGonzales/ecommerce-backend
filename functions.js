const RANDOM = require('random');

function RandomObj() {
    return RANDOM.int(1, 6);
}

module.exports = RandomObj;
