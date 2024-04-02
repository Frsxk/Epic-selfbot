
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

client.on('messageCreate', async message => {
    const chnl = await client.channels.cache.find(ch => ch.id === config.channel);
    if (message.channel.id !== config.channel) return;
    // if (message.author.id !== config.bot) return;

    if (message.content == latest) return;
    latest = message.content;

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
        if (p2.includes(`:`)) {
            p3 = p2.split(':')[1].trim();
        } else if (p2.includes(`💎`)) {
            p3 = `gem`;
        } else if (p2.includes(`🍀`)) {
            p3 = `four leaf clover`;
        } else if (p2.includes(`🎲`)) {
            p3 = `dice`;
        } else if (p2.includes(`🎁`)) {
            p3 = `gift`;
        }
        
        // matching and answer
        if (p1 == p3) {
            return chnl.send('yes')
        } else {
            return chnl.send('no')
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
        const text = latest.split('\n')[1].trim().toLowerCase();
        const regex = /[0-9]+/;
        const question = text.match(/[0-9]+/)[0];

        // soon to come (most mine training answers are no)
        const array = ['yes', 'no', 'no', 'no', 'yes'];
        const random = array[Math.floor(Math.random() * array.length)];
        return chnl.send(random);
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

    // auto training
    async function doTraining() {
        chnl.send(config.trainingCmd);
        await sleep(1000);
        if (config.trainingCmd == 'rpg training') {
            // normal training
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

client.login(config.token);
