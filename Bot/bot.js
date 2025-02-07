import { Telegraf } from 'telegraf';

const TOKEN = '7960673905:AAEXFC-QtWIDq3sXgzx2d_9LXz-udSf1jII';
const link = 'https://weather-app-ayaz.netlify.app/';
const portfolioLink = 'https://ayaz-damirov-portfolio.netlify.app/'; 
const linkedinLink = 'https://www.linkedin.com/in/ayaz-damirov-39b633223/'; 
const API_KEY = '90a27bd0a80b8df6cc9d363dbeceed1f';
const bot = new Telegraf(TOKEN);

const fetchWeather = async (city) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      return `❌ Error: ${data.message}`;
    }

    return `🌍 *Weather in ${data.name}*\n🌡 Temperature: ${data.main.temp}°C\n☁ Condition: ${data.weather[0].description}\n💨 Wind Speed: ${data.wind.speed} m/s\n💧 Humidity: ${data.main.humidity}%`;
  } catch (error) {
    return '❌ Failed to fetch weather data. Try again later!';
  }
};

bot.start((ctx) =>
  ctx.reply('Welcome! Use /run to visit the web app or /commands to see available commands.', {
    reply_markup: {
      keyboard: [
        [{ text: '🌤 Web App', web_app: { url: link } }],
      ],
      resize_keyboard: true,
    },
  })
);

bot.command('run', (ctx) => {
  ctx.reply('Opening the web app...', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🌤 Open Web App', web_app: { url: link } }],
      ],
    },
  });
});

bot.command('commands', (ctx) => {
  ctx.reply(`
    Available Commands:
    /run - Visit the weather app
    /portfolio - Visit my portfolio website
    /linkedin - View my LinkedIn profile
    /weather <city> - Get weather information for a city
  `);
});

bot.command('portfolio', (ctx) => {
  ctx.reply('Opening my portfolio...', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'View Portfolio', url: portfolioLink }],
      ],
    },
  });
});

bot.command('linkedin', (ctx) => {
  ctx.reply('Opening my LinkedIn profile...', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'View LinkedIn', url: linkedinLink }],
      ],
    },
  });
});

bot.command('weather', async (ctx) => {
  const city = ctx.message.text.split(' ')[1];
  if (!city) {
    return ctx.reply('❌ Please provide a city name. Example: /weather Baku');
  }

  const weatherInfo = await fetchWeather(city);
  ctx.replyWithMarkdown(weatherInfo);
});

bot.launch();
console.log('Bot is running...');
