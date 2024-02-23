// const { Client } = require('discord.js-selfbot-v13');
// const client = new Client();
// const config = require('./config');
// require('dotenv').config();
// const chalk = require('chalk');

// const child = require('./index');
// const stats = {
//     hunt: 0,
//     work: 0,
//     farm: 0,
//     training: 0,
//     adventure: 0,
  
//     increaseStats(stat) {
//       this[stat]++; 
//     }
// }
// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// } 
// const newMsg = `**EPIC RPG STATS TRACKER**\nHunt: ${stats.hunt}\nWork: ${stats.work}\nFarm: ${stats.farm}\nTraining: ${stats.training}\nAdventure: ${stats.adventure}`;

// client.on('messageCreate', async message => {
//     if (message.channel.id !== config.channel) return;

//     if (message.content.includes(`:police_car:`) || message.content.includes(`🚓`)) {
//         console.log(`please solve captcha and type start`);
//         return child.pause(child.sProc);
//     }
//     if (message.content === 'start') {
//         console.log('bot started');
//         return child.resume(child.sProc);
//     } 
//     if (message.content === 'pause') {
//         console.log('bot paused');
//         return child.pause(child.sProc);
//     }
// })
// client.on('ready', async (message) => {
//     console.log(chalk.bgBlueBright.black(` ✔️ => Successfully logged in to ${client.user.username}! `));
//     const chnl = await client.channels.cache.find(ch => ch.id === config.channel);

//     // Send stats and track
//     const msg = `**EPIC RPG STATS TRACKER**\nHunt: 0\nWork: 0\nFarm: 0\nTraining: 0\nAdventure: 0`;
//     // const statMsg = await chnl.send(msg);

//     let previousNumber;
//     const minute = 60000;
//     function randomInterval(min, max) {
//         let random;
//         do {
//             random = Math.floor(Math.random() * (max - min + 1)).toFixed(3) + min;
//         } while(random === previousNumber);
//         previousNumber = random;
//         return random;
//     }
//     function scheduleTask(task, interval) {
//         task();
//         setInterval(function() {
//             task();
//         }, interval)
//     }

//     // auto hunt
//     async function doHunt() {
//         chnl.send(config.huntCmd);
//         stats.increaseStats('hunt');
//         console.log(`hunt done: ${stats.hunt}`);
//     }
//     scheduleTask(doHunt, minute * 0.85);
//     await sleep(1000);

//     // auto work
//     async function doWork() {
//         chnl.send(config.workCmd);
//         stats.increaseStats('work');
//         console.log(`work done: ${stats.work}`);
//     }
//     scheduleTask(doWork, minute * 5.04);
//     await sleep(1000);

//     // auto farm
//     async function doFarm() {
//         chnl.send(config.farmCmd);
//         stats.increaseStats('farm');
//         console.log(`farm done: ${stats.work}`);
//     }
//     scheduleTask(doFarm, minute * 10.03);
//     await sleep(1000);

//     // auto training
//     async function doTraining() {
//         chnl.send(config.trainingCmd);
//         await sleep(1000);
//         chnl.send('double');
//         chnl.send('attlock');
//         stats.increaseStats('training');
//         console.log(`training done: ${stats.training}`);
//     }
//     scheduleTask(doTraining, minute * 15.1)
//     await sleep(1000);

//     // auto adventure
//     async function doAdventure() {
//         chnl.send('rpg adv h');
//         stats.increaseStats('adventure');
//         console.log(`adventure done: ${stats.adventure}`);
//     }
//     await sleep(1000);
//     scheduleTask(doAdventure, minute * 54.01)
// })

// client.login(process.env.TOKEN);
