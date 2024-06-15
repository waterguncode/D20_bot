//Library
const { Client, GatewayIntentBits } = require('discord.js');

//Definitions
const client = new Client({ intents: [
GatewayIntentBits.Guilds, 
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent,
],
});

// Token Discord Developer Portal
client.login('BOT_TOKEN');

client.on('messageCreate', message => {
    // Convert the message content to lowercase to make it case-insensitive
    const content = message.content.toLowerCase();

    if(message.content === '!d20.help'){    
        message.channel.send(`**Datasheet for D20 bot**\nBasically is an overall dice, you can !d any number\nExamples: **!d46**, **!d20**, **!d2**, **!d40002**\n\nYou can also use modifiers: **!d20 +4**, **!d8 +2**, **!d293 +9**\n Well, it goes on. Hope you like\n\nAuthor: **watergun**`);
        return;
    }

    // Check if the message starts with "!d" followed by a number
    const regex = /^!d(\d+)\s*([+-]\d+)?$/;
    const match = content.match(regex);

    if (match) {
        const sides = parseInt(match[1], 10); // Number of sides on the die
        let modifier = match && match[2] ? parseInt(match[2], 10) : 0; //Transforming modifier into integer

        // Roll the die
        const roll = Math.floor(Math.random() * sides) + 1;
        const total = roll + modifier;

        // Send the result
        if (modifier === 0) {
            message.channel.send(`**D${sides}**: You rolled a **${roll}**`);
        } else {
            message.channel.send(`**D${sides}**: You got **${total}** with a modifier of **${modifier}** and a natural roll of **${roll}**`);
        }
    }
});