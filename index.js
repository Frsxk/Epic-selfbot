const { Client } = require('discord.js-selfbot-v13');
const client = new Client();
const config = require('./config');
const cron = require('node-cron');
require('dotenv').config();
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
const newMsg = `**EPIC RPG STATS TRACKER**\nHunt: ${stats.hunt}\nWork: ${stats.work}\nFarm: ${stats.farm}\nTraining: ${stats.training}\nAdventure: ${stats.adventure}`;

client.on('messageCreate', async message => {
    const chnl = await client.channels.cache.find(ch => ch.id === config.channel);
    if (message.author.id !== config.bot) return;
    if (message.channel.id !== config.channel) return;

    if (message.content.includes(`<@${client.user.id}>`)) {
        console.log(`please solve captcha and run again`);
        return process.exit()
    }
})

client.on('ready', async (message) => {
    console.log(chalk.bgBlueBright.black(` ✔️ => Successfully logged in to ${client.user.username}! `));
    const chnl = await client.channels.cache.find(ch => ch.id === config.channel);

    // Send stats and track
    const msg = `**EPIC RPG STATS TRACKER**\nHunt: 0\nWork: 0\nFarm: 0\nTraining: 0\nAdventure: 0`;
    const statMsg = await chnl.send(msg);

    let previousNumber;
    const minute = 60000;
    function randomInterval(min, max) {
        let random;
        do {
            random = Math.floor(Math.random() * (max - min + 1)).toFixed(3) + min;
        } while(random === previousNumber);
        previousNumber = random;
        return random;
    }
    function scheduleTask(task, interval) {
        task();
        setInterval(function() {
            task();
        }, interval)
    }

    // auto hunt
    async function doHunt() {
        chnl.send(config.huntCmd);
        stats.increaseStats('hunt');
        await sleep(1000);
        // statMsg.edit(newMsg);
        console.log('hunt done');
    }
    scheduleTask(doHunt, minute * 1.05);
    await sleep(1000);

    // auto work
    async function doWork() {
        chnl.send(config.workCmd);
        stats.increaseStats('work');
        await sleep(1000);
        // statMsg.edit(newMsg);
        console.log('work done');
    }
    scheduleTask(doWork, minute * 5.04);
    await sleep(1000);

    // auto farm
    async function doFarm() {
        chnl.send(config.farmCmd);
        stats.increaseStats('farm');
        await sleep(1000);
        // statMsg.edit(newMsg);
        console.log('farm done');
    }
    scheduleTask(doFarm, minute * 10.03);
    await sleep(1000);

    // auto training
    async function doTraining() {
        chnl.send(config.trainingCmd);
        await sleep(1000);
        chnl.send('double');
        await sleep(1000);
        chnl.send('attlock');
        stats.increaseStats('training');
        await sleep(1000);
        // statMsg.edit(newMsg);
        console.log('training done');
    }
    scheduleTask(doTraining, minute * 15.02)
    await sleep(1000);

    // auto adventure
    async function doAdventure() {
        chnl.send('rpg adv h');
        stats.increaseStats('adventure');
        await sleep(1000);
        // statMsg.edit(newMsg);
        console.log('adventure done');
    }
    await sleep(1000);
    scheduleTask(doAdventure, minute * 60.01)
})

client.login(process.env.TOKEN);

