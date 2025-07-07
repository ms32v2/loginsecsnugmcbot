const mineflayer = require('mineflayer');

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: 'snugsmp.play.hosting', // ✅ Your server IP
    port: 25565,            // ✅ Default port
    username: 'SnugLifesteal',// ✅ Replace with bot's username
    version: false          // Auto-detect
  });

  bot.on('login', () => {
    console.log(`[LOGIN] Connected as ${bot.username}`);
  });

  bot.once('spawn', () => {
    console.log('[SPAWN] Bot spawned into the world.');

    setTimeout(() => {
      const registerCommand = '/register <cpmp0043>';
      const loginCommand = '/login <cpmp0043>';

      console.log(`[AUTH] Sending: ${registerCommand}`);
      bot.chat(registerCommand);

      console.log(`[AUTH] Sending: ${loginCommand}`);
      bot.chat(loginCommand);
    }, 3000);
  });

  // ✅ Log commands sent
  const originalChat = bot.chat;
  bot.chat = function (message) {
    console.log(`[CHAT] Executing command: ${message}`);
    return originalChat.call(bot, message);
  };

  // ✅ Listen for server messages (to detect successful login)
  bot.on('message', (jsonMsg) => {
    const msg = jsonMsg.toString();
    console.log(`[SERVER] ${msg}`);

    if (
      msg.toLowerCase().includes("logged in") || 
      msg.toLowerCase().includes("successfully") || 
      msg.toLowerCase().includes("welcome")
    ) {
      console.log('[✔️ LOGIN SUCCESS] Bot is successfully logged in!');
    }
  });

  bot.on('death', () => {
    console.log('[DEATH] Bot died. Respawning...');
    setTimeout(() => {
      console.log('[RESPAWN] Sending respawn command...');
      bot.respawn();
    }, 1000);
  });

  bot.on('end', () => {
    console.log('[DISCONNECT] Bot disconnected. Reconnecting in 5 seconds...');
    setTimeout(createBot, 5000);
  });

  bot.on('kicked', (reason) => {
    console.log('[KICKED] Bot was kicked:', reason);
  });

  bot.on('error', (err) => {
    console.log('[ERROR] Error occurred:', err);
  });
}

createBot();
