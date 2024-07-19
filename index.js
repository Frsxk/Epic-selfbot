
const { Client } = require('discord.js-selfbot-v13');
const client = new Client();
const config = require('./config');
const chalk = require('chalk');

const stats = {
    hunt: 0,
    work: 0,
    farm: 0,
    training: 0,
    adventure: 0,
  
    increaseStats(stat) {
      this[stat]++; 
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
} 
const minute = 60000;

function scheduleTask(task, interval) {
    task();
    setInterval(function() {
        task();
    }, interval)
}
let latest = null;
let trainings;
let ruby = 0;

const arrY = ["yes", "y"];
const arrN = ["n", "no"];
const randomAns = Math.floor(Math.random() * arrY.length);

client.on('messageCreate', async message => {
    const chnl = await client.channels.cache.find(ch => ch.id === config.channel);
    if (message.channel.id !== config.channel) return;
    if (message.author.id !== config.bot) return;

    latest = null;
    latest = message.content;

    if (message.embeds.length > 0) {
        const embed = message.embeds[0];
        const itemsField = embed.fields.find(field => field.name === 'Items');

        if (itemsField) {
            const inv = itemsField.value;
            const regex = /\*\*ruby\*\*: ([0-9]+(,[0-9]+)+)/;
            let check = regex.exec(inv);
            if (check == null) {
                ruby = 0;
            } else {
                ruby = regex.exec(inv)[1].replace(/,/gm, '');
            }
        }
    }

    if (message.content.includes(`:police_car:`) || message.content.includes(`🚓`)) {
        console.log(`please solve captcha and restart`);
        return process.exit();
    }

    function trCasino() {
        const text = latest.split(/\*\*/);
        const emoji = /\? (.*?)\n/;

        const p1 = text[3].trim().toLowerCase()
        const p2 = emoji.exec(latest)[1].trim();

        // translating emojis
        let p3;
        if (p2.includes(`gem`)) {
            p3 = `diamond`;
        } else if (p2.includes(`four_leaf_clover`)) {
            p3 = `four leaf clover`;
        } else if (p2.includes(`game_die`)) {
            p3 = `dice`;
        } else if (p2.includes(`gift`)) {
            p3 = `gift`;
        } else if (p2.includes(`coin`)) {
            p3 = `coin`;
        }
        
        // matching and answer
        if (p1 == p3) {
            return chnl.send(arrY[randomAns]);
        } else {
            return chnl.send(arrN[randomAns]);
        }
    }
    
    function trRiver() {
        const text = latest.split('\n')[1].trim().toLowerCase();
        
        // translating emojis
        let ans;
        if (text.includes(`epicfish`)) {
            ans = `3`;
        } else if (text.includes(`goldenfish`)) {
            ans = `2`;
        } else if (text.includes(`normiefish`)) {
            ans = `1`;
        }
        return chnl.send(ans);
    }

    function trForest() {
        const text = latest.split('\n')[1].trim().split(":");
        const question = latest.split('\n')[2].match(/[A-Za-z]+log/)[0];
        
        // counting logs and sending answer
        const counter = text.filter(log => log == question).length;
        return chnl.send(counter.toString());
    }
    
    function trField() {
        const apple = ['0', 'a', 'p', 'p', 'l', 'e'];
        const banana = ['0', 'b', 'a', 'n', 'a', 'n', 'a'];

        const text = latest.split('\n')[1].trim().split(":")[1].toLowerCase();
        const regex = /(\*\*([^*]+)\*\*)/;
        const question = regex.exec(latest.split('\n')[1].trim())[2];
        const numbermap = {
            'first': 1,
            'second': 2,
            'third': 3,
            'fourth': 4,
            'fifth': 5,
            'sixth': 6
        };
        const number = numbermap[question];

        let ans;
        if (text == 'apple') {
            ans = apple[number];
        } else if (text == 'banana') {
            ans = banana[number];
        }
        chnl.send(ans);
    }

    function trMine() {
        const question = msg.content.split('\n')[1].trim().toLowerCase().match(/[0-9]+/)[0];
        if (ruby > question) {
            return chnl.send(arrY[randomAns]);
        } else {
            return chnl.send(arrN[randomAns]);
        }
    }
    
    // training detections
    trainings = () => {
        if (message.content.includes(`casino`)) {
            trCasino();
        } else if (message.content.includes(`river`)) {
            trRiver();
        } else if (message.content.includes(`forest`)) {
            trForest();
        } else if (message.content.includes(`field`)) {
            trField();
        } else if (message.content.includes(`mine`)) {
            trMine();
        }
    }
});


client.on('ready', async (message) => {
    console.log(chalk.bgBlueBright.black(` ✔️ => Successfully logged in to ${client.user.username}! `));
    const chnl = await client.channels.cache.find(ch => ch.id === config.channel);

    // auto hunt
    async function doHunt() {
        chnl.send(config.huntCmd);
        stats.increaseStats('hunt');
        console.log(`hunt done: ${stats.hunt}`);
    }
    if (config.huntCmd.toLowerCase().includes('rpg')) {
        scheduleTask(doHunt, minute * config.huntCd * config.cdReduction);
        await sleep(2000);
    }

    // auto work
    async function doWork() {
        chnl.send(config.workCmd);
        stats.increaseStats('work');
        console.log(`work done: ${stats.work}`);
    }
    if (config.workCmd.toLowerCase().includes('rpg')) {
        scheduleTask(doWork, minute * config.workCd * config.cdReduction);
        await sleep(2000);
    }

    // auto farm
    async function doFarm() {
        chnl.send(config.farmCmd);
        stats.increaseStats('farm');
        console.log(`farm done: ${stats.work}`);
    }
    if (config.farmCmd.toLowerCase().includes('rpg')) {
        scheduleTask(doFarm, minute * config.farmCd * config.cdReduction);
        await sleep(2000);
    }

    // auto inv check
    async function invCheck() {
        chnl.send(config.invCheck);
        await sleep(1000);
        console.log(`logged ruby count: ${ruby}`);
    }
    if (config.invCheck.toLowerCase().includes('rpg')) {
        scheduleTask(invCheck, minute * config.checkCd * config.cdReduction);
        await sleep(2000);
    }
    
    // auto training
    async function doTraining() {
        chnl.send(config.trainingCmd);
        await sleep(1000);
        if (config.trainingCmd == 'rpg training') {
            // normal training
            await sleep(250);
            trainings();
        } else {
            // ULTRaining command
            chnl.send('double');
            chnl.send('attlock');
            stats.increaseStats('training');
            console.log(`training done: ${stats.training}`);
        }
    }
    if (config.trainingCmd.toLowerCase().includes('rpg')) {
        scheduleTask(doTraining, minute * config.trainingCd * config.cdReduction);
        await sleep(2000);
    }

    // auto adventure
    async function doAdventure() {
        chnl.send(config.adventureCmd);
        stats.increaseStats('adventure');
        console.log(`adventure done: ${stats.adventure}`);
    }
    if (config.adventureCmd.toLowerCase().includes('rpg')) {
        scheduleTask(doAdventure, minute * config.adventureCd * config.cdReduction);
        await sleep(2000);
    }
});

try {
    console.log(chalk.bgBlueBright.black(` ⌛ => Attempting to log in using token... `));
    client.login(config.token);
} catch (error) {
    console.log(chalk.bgRedBright.black(` ❌ => Please check your token and try again.`));
    return process.exit();
}
