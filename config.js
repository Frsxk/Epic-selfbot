require('dotenv').config();

// Cooldown tolerance (0.05+ is safe, set it higher to lower epic guard encounter)
const tolerance = 0.05;

module.exports = {
    bot: '555955826880413696', // EPIC RPG bot id, do NOT change
    channel: '', //type in your channel id
    token: `${process.env.TOKEN}`,

    // Customize your commands here
    // Leave blank to turn off
    huntCmd: 'rpg hunt',
    workCmd: 'rpg chop',
    farmCmd: 'rpg farm',
    trainingCmd: 'rpg training',
    adventureCmd: 'rpg adventure',

    // Customize your cooldowns and reductions here (in minutes)
    huntCd: 1 + tolerance,
    workCd: 5 + tolerance,
    farmCd: 10 + tolerance,
    trainingCd: 15 + 0.1, // giving time to response
    adventureCd: 60 + tolerance,
    cdReduction: 1, // in decimal
}