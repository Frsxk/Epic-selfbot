require('dotenv').config();

// Cooldown tolerance (0.05+ is safe, set it higher to lower epic guard encounter)
const tolerance = 0.05

module.exports = {
    user: '6823456789043125',
    bot: '555955826880413696',
    channel: '974590667445633064',
    token: `${process.env.TOKEN}`,

    // Customize your commands here
    huntCmd: 'rpg hunt hardmode together',
    workCmd: 'rpg chainsaw',
    farmCmd: 'rpg farm bread',
    trainingCmd: 'rpg ultraining',
    adventureCmd: 'rpg adventure hardmode',

    // Customize your cooldowns and reductions here (in minutes)
    huntCd: 1 + tolerance,
    workCd: 5 + tolerance,
    farmCd: 10 + tolerance,
    trainingCd: 15 + 0.1, // giving time to response
    adventureCd: 60 + tolerance,
    cdReduction: 1, // in decimal
}