const mineflayer = require('mineflayer');

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: 'snugsmp.play.hosting', // Replace with server IP
    port: 25565,            // Default port
    username: 'senpaispider',// Change this to bot username
    version: false,         // Auto-detect server version
  });

  // Handle login/register commands
  bot.once('spawn', () => {
    setTimeout(() => {
      if (bot.chat) {
        bot.chat('/register <snugsenpai0043>'); // Only runs once
        bot.chat('/login <snugsenpai0043>');
      }
    }, 3000); // Wait for server to load auth plugin
  });

  // Auto-reconnect on kick/disconnect
  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 5 seconds...');
    setTimeout(createBot, 50000);
  });

  bot.on('kicked', (reason) => {
    console.log('Kicked:', reason);
  });

  bot.on('error', (err) => {
    console.log('Error:', err);
  });

  // Auto respawn on death
  bot.on('death', () => {
    setTimeout(() => {
      bot.respawn();
    }, 1000);
  });
}

createBot();
