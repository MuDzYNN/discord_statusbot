const colors = require('colors/safe');
const client = require('../client/client');
const types = [
    {type: "message", color: colors.white},
    {type: "succesfull", color: colors.brightGreen},
    {type: "info", color: colors.cyan},
    {type: "warning", color: colors.yellow},
    {type: "error", color: colors.red}
]

const GetColor = (type) => {
    if (!type) type = "message";

    for (color of types) {
        if (color.type == type) {
            return color.color;
        }
    }

    return types[0].color;
}

const print = (message, type) => {
    const color = GetColor(type);
    const prefix = colors.bgBlack.brightBlue(`[${client.user.tag}]`);
    console.log(prefix + ' ' + color(message));
}

module.exports = print;
