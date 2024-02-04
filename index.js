const { Client } = require('discord.js-selfbot-v13');
const Discord = require('discord.js');
const client = new Client();
const config = require('./config');
const cron = require('node-cron');
require('dotenv').config();
const chalk = require('chalk');

client.on('ready', async () => {
    console.log(chalk.bgBlueBright.black(` ✔️ => Successfully logged in to ${client.user.username}! `));
    const chnl = await client.channels.cache.find(ch => ch.id === config.channel);

    function randomInterval(min, max) {
        return Math.random() * (max - min) + min;
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }; 
    function scheduleTask(task, interval) {
        return cron.schedule(`*/${interval} * * * *`, task);
    }

    // Send stats and track
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
    const msg = `**EPIC RPG STATS TRACKER**\nHunt: ${stats.hunt}\nWork: ${stats.work}\nFarm: ${stats.farm}\nTraining: ${stats.training}\nAdventure: ${stats.adventure}\n\nI am solemnly up to no good.`;
    chnl.send(msg);

    // autohunt
    async function doHunt() {
        chnl.send('rpg hunt hardmode together');
        stats.increaseStats('hunt');
        await sleep(1000);
        msg.edit(msg);
        console.log('hunt done');
    }
    const minHunt = 1.1; 
    const maxHunt = 1.5;
    const randomHunts = randomInterval(minHunt, maxHunt);
    cron.schedule(`*/${randomHunts} * * * *`, doHunt);


    // autowork
    async function doWork() {
        chnl.send('rpg chainsaw');
        stats.increaseStats('work');
        await sleep(1000);
        msg.edit(msg);
        console.log('work done');
    }
    const minWork = 3.5;
    const maxWork = 4;
    const randomWork = randomInterval(minWork, maxWork);
    cron.schedule(`*/${randomWork} * * * *`, doWork);


    // autofarm
    async function doFarm() {
        chnl.send('rpg farm carrot');
        stats.increaseStats('farm');
        await sleep(1000);
        msg.edit(msg);
        console.log('farm done');
    }
    const minFarm = 6.5;
    const maxFarm = 7;
    const randomFarm = randomInterval(minFarm, maxFarm);
    cron.schedule(`*/${randomFarm} * * * *`, doFarm);


    // autotraining
    async function doTraining() {
        chnl.send('rpg ultraining');
        await sleep(1000);
        chnl.send('double');
        await sleep(1000);
        chnl.send('attlock');
        stats.increaseStats('training');
        await sleep(1000);
        msg.edit(msg);
        console.log('training done');
    }
    const minTraining = 10;
    const maxTraining = 10.5;
    const randomTraining = randomInterval(minTraining, maxTraining);
    cron.schedule(`*/${randomTraining} * * * *`, doTraining);


    // autoadventure
    async function doAdventure() {
        chnl.send('rpg adventure hardmode');
        stats.increaseStats('adventure');
        await sleep(1000);
        msg.edit(msg);
        console.log('adventure done');
    }
    const minAdventure = 39;
    const maxAdventure = 40;
    const randomAdventure = randomInterval(minAdventure, maxAdventure);
    cron.schedule(`*/${randomAdventure} * * * *`, doAdventure);
})

client.login(process.env.TOKEN);

