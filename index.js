
console.log(process.version)
const Discord = require('discord.js');
const Client = new Discord.Client({ intents: 32767 , partials: ['CHANNEL','USER' , 'GUILD_MEMBER' , 'REACTION'] , allowedMentions: ['']});
const config = require('./config.json');
const Axios = require('axios');
const Paginator = require('@koenie06/discord.js-pagination');
const DisTube = require('distube');
const Voice = require('@discordjs/voice');


const Errorhandler = require('discord-error-handler')

process.on('TypeError', error => {
 console.log(error)
})

const Lyrics = require('lyrics-finder');


const Music = new DisTube.default(Client,
  {
    leaveOnEmpty: false,
    emptyCooldown: 0,
    leaveOnFinish: false,
    leaveOnStop: true,
  });

const errorbed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setDescription('**An Error Occured! Please try again**');

const help$ =
{
  name: 'help',
  description: 'Need Some Help?'
}

const play$ =
{
  name: 'play',
  description: 'Play A Song'
}

const pause$ = 
{
  name: 'pause',
  description: 'Pause Song'
}

const resume$ = 
{
  name: 'resume',
  description: 'Resume Song'
}

const volume$ = 
{
  name: 'volume',
  description: 'Set Song Volume'
}

const skip$ = 
{
  name: 'skip',
  description: 'Skip Song'
}

const filter$ = 
{
  name: 'filter',
  description: 'Add Song Filter',
  options: [{
    name: 'filter',
    description: 'The Filter To Set',
    required: true,
    type: 'STRING',
    choices: [{name: '3d' , value: '3d'},{name: 'nightcore' , value: 'nightcore'},{name: 'karaoke' , value: 'karaoke'},{name: 'echo' , value: 'echo'},{name: 'bassboost' , value: 'bassboost'} , {name: 'vaporwave' , value: 'vaporwave'},{name: 'flanger' , value: 'flanger'},{name: 'reverse' , value: 'reverse'},{name: 'phaser' , value: 'phaser'},{name: 'tremolo' , value: 'tremolo'}]
  }],
}

const queue$ = 
{
  name: 'queue',
  description: 'See Songs Queue'
}

const stop$ = 
{
  name: 'stop',
  description: 'Stop Music'
}

const shuffle$ = 
{
  name: 'shuffle',
  description: 'Shuffle Queue Songs'
}

const panel$ = 
{
  name: 'panel',
  description: 'Music Control Panel'
}
const lyrics$ = 
{
  name: 'lyrics',
  description: 'See song lyrics',
   options: [{
    name: 'name',
    description: 'What is the name of the song',
    required: true,
    type: 'STRING',
    
  },{
    name: 'author',
    description: 'What is the name of the song author',
    required: true,
    type: 'STRING',
    
  }],
}
const grab$ = 
{
  name: 'grab',
  description: 'Save this song to your DMs'
}

//done, what a poopi error


//check discord lol

Client.on('ready', async () => 
{
  const activities = [
    `${config.status1}`,
  `${config.status2}`,
  `${config.status3}`,
  `${config.status4}`,
  `${config.status5}`,
  `${config.status6}`,
  `${config.status7}`,
  `${config.status8}`,
  `${config.status9}`,
  `${config.status10}`,
  `${config.status11}`,
  `code by Nishant#8044`,
  `${config.status12}` 
  ]
  //amazing time to run
    let i = 0;
  setInterval(() => Client.user.setActivity(`${activities[i++ % activities.length]}`, { type: `LISTENING` }), 9000);
  Client.guilds.cache.get('890487719619330048')?.commands.set([help$, play$,pause$,resume$,volume$,skip$,filter$,queue$,stop$,shuffle$,panel$,lyrics$,grab$]);//your guild id here
  Client.application.commands.set([help$, play$,pause$,resume$,volume$,skip$,filter$,queue$,stop$,shuffle$,panel$,lyrics$,grab$]);
  Client.user.setStatus('idle');
  console.log(`🚀 ${Client.user.username} Is Online 🚀`);
});

Client.on('guildCreate' , async guild => 
{
  guild.channels.cache.filter(chan => chan.type === 'GUILD_TEXT').first().createInvite().then(inv => 
  {
    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .addField('Guild Name','```' + guild.name + '```',true)
    .addField('Guild ID','```' + guild.id + '```',true)
    .addField('Guild Owner','```' + Client.users.cache.get(guild.ownerId).tag + '```',true)
  
    .addField('Guild Invite',`[Click Here](${inv.url})`,true)
    Client.channels.cache.get(config.guildjoinlog).send({embeds: [embed]});
  })
});

Client.on('messageCreate', async message => 
{
  const owneruser = Client.users.cache.get(config.ownerId)
  if(message.author.bot) return;
  if(message.mentions.users.first() === Client.user)
  {
    const row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
    .setStyle('LINK')
    .setURL(`https://discord.com/oauth2/authorize?client_id=${Client.user.id}&permissions=8&scope=bot%20applications.commands`)
    .setLabel('Invite Me'));
    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('About Me')
    .setAuthor(`${Client.user.username}`,Client.user.displayAvatarURL({ size: 1024, dynamic: true }))
    .setDescription(`${Client.user.username} is a high quality Music bot.\nUse **/help** to get started\n\nThis bot's owner is ${owneruser.username}`)
    message.reply({embeds: [embed] , components: [row]});
  }
  if(!message.author.id === owneruser.id) return;
  if(message.author.id === owneruser.id)
  {
    if(message.content.startsWith('e '))
    {
      const code = message.content.replace('e ','');
      try
      {
        let evaled = eval(code);
        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription('```js\n' + evaled + '\n```');
        message.reply({embeds: [embed]});
      }
      catch(err)
      {
        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription('```js\n' + err + '\n```');
        message.reply({embeds: [embed]});
      }
    }
  }
  else
  {
    return;
  }
});

Client.on('interactionCreate', async interaction => 
{
  const owneruser = Client.users.cache.get(config.ownerId)
  
  if (interaction.isCommand()) 
  {
    if (interaction.commandName === 'help') 
    {
      const embed1 = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Welcome to '+ Client.user.username+`\nThis is an amazing music bot, created for listening to high quality music! It has multiple commands and can even play in STAGE channels!\n\nOwner : ${owneruser.username}\nBot Code Creator : Nishant#8044\nBot Code : [HERE](https://github.com/NishantMajumdar2/musicBot)`)
        
        .setFooter('Page 1/2');
      const embed2 = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Music Commands')
        
        .addField('play', '`↪ Plays A Song`', true)
        .addField('pause', '`↪ Pauses A Song`', true)
        .addField('resume', '`↪ Resumes A Song`', true)
        .addField('volume', '`↪ Sets Song Volume`', true)
        .addField('skip', '`↪ Skip A Song`', true)
        .addField('filter', '`↪ Add Song Filter`', true)
        .addField('queue', '`↪ See Songs Queue`', true)
        .addField('shuffle', '`↪ Shuffle Queue`', true)
        .addField('panel', '`↪ Song Control Panel`', true)
         .addField('grab', '`↪ Save song to DM`', true)
          .addField('lyrics', '`↪ Get Song lyrics`', true)
        .addField('stop', '`↪ Stop Music`', true)
        .setFooter('Page 2/2');
     
      Paginator.button({
        interaction: interaction,
        pages: [embed1, embed2],
        buttons:
        {
          previous:
          {
            label: 'Previous',
            style: 'PRIMARY',
            emoji: '👈'
          },
          next:
          {
            label: 'Next',
            style: 'PRIMARY',
            emoji: '👉'
          },
          stop:
          {
            label: 'Stop',
            style: 'DANGER',
            emoji: '✋'
          }
        },
      });
    }
    if (interaction.commandName === 'grab') 
    {
      let queue = Music.getQueue(interaction);
      if(!queue) {
        
        interaction.reply({content:"Please play music before running this command", ephemeral:true})
        
        }else{
      const grabe = new Discord.MessageEmbed()
      .setTitle(`${queue.songs[0].name}`).addField('Duration',`${queue.songs[0].formattedDuration}`,true)
      .addField('Views',`${queue.songs[0].views}`,true)
      .addField('ID',`${queue.songs[0].id}`,true).setFooter(`Likes : ${queue.songs[0].likes}     |    Dislikes : ${queue.songs[0].dislikes}`).setURL(`${queue.songs[0].url}`).setThumbnail(`${queue.songs[0].thumbnail}`).setColor('RANDOM')
      interaction.reply({content:"Check your DMs",ephemeral:true})
      interaction.user.send({embeds:[grabe]})
    }}
    if (interaction.commandName === 'play') 
    {
      if(!interaction.member.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      try 
      {
        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription('**To play a song, type its name below**');
        interaction.reply({embeds: [embed]});
        const filter = m => m.member.id === interaction.member.id;
        const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });
        collector.on('collect', async m => 
        {
          if(!m.member.voice.channel) return;
          Music.play(m,m.content);
          collector.stop();
        });
      }
      catch (err) 
      {
        return interaction.reply({ embeds: [errorbed], ephemeral: true });
      }
    }
    if (interaction.commandName === 'pause')
    {
       let queue = Music.getQueue(interaction);
      if(!queue) interaction.followUp({content:"Please play music before running this command", ephemeral:true})
      
      if(!interaction.member.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      if(!interaction.guild.me.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      if(!interaction.member.voice.channel === interaction.guild.me.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
     
     
      if(queue.paused)
      {
        return interaction.reply({ embeds: [errorbed], ephemeral: true });
      }
      else
      {
        Music.pause(interaction);
        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription('**Music playing right now is paused**');
        interaction.reply({embeds: [embed]});
      }
    }
    if(interaction.commandName === 'resume')
    {
      if(!interaction.member.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      if(!interaction.guild.me.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      if(!interaction.member.voice.channel === interaction.guild.me.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      let queue = Music.getQueue(interaction);

        if(!queue) interaction.followUp({content:"Please play music before running this command", ephemeral:true})
      if(queue.paused)
      {
        Music.resume(interaction);
        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription('**Music playing right now is Resumed**');
        interaction.reply({embeds: [embed]});
      }
      else
      {
        return interaction.reply({ embeds: [errorbed], ephemeral: true });
      }
    }
    if(interaction.commandName === 'lyrics')
    { const _ = require("lodash");
      let pages = []
       interaction.reply({content:"LYRICS PANEL OPENED",ephemeral:true})
      let current = 0

      let queue = Music.getQueue(interaction);
      let song = interaction.options.getString("song")
      let author = interaction.options.getString("author")

      let res = await Lyrics(author, song) || "Not Found!";
      for(let i = 0; i < res.length; i += 2048) {
        let lyrics = res.substring(i, Math.min(res.length, i + 2000 ))
        let page = new Discord.MessageEmbed()
        .setDescription(lyrics)
        pages.push(page)
    }

     const filter2 = (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && (interaction.user.id == user.id)
    
    let Embed = await interaction.channel.send({content:`Page: ${current+1}/${pages.length}`,embeds:[ pages[current]]})
    
    await Embed.react('🇱')
    await Embed.react('🇾')
    await Embed.react('🇷')
    await Embed.react('🇮')
    await Embed.react('🇨')
    await Embed.react('🇸')
    await Embed.react('🇸')
    await Embed.react('⬅️')
    await Embed.react('➡️')
    await Embed.react('➡️')
    await Embed.react('❌')
    await Embed.react('❌')
    let ReactionCol = Embed.createReactionCollector(filter2)

    ReactionCol.on("collect", (reaction, user) => {
        reaction.users.remove(reaction.users.cache.get(interaction.user.id))

        if(reaction.emoji.name == '➡️') {
            if(current < pages.length - 1) {
                current += 1
                Embed.edit({content:`Page: ${current+1}/${pages.length}`,embeds:[pages[current]]})
            }
        } else  {
            if(reaction.emoji.name === '⬅️') {
                if(current !== 0) {
                    current -= 1
                    Embed.edit({content:`Page: ${current+1}/${pages.length}`,embeds: [pages[current]]})
                }
            }else
            if(reaction.emoji.name === '❌') {
                
                    current -= 1
                    Embed.edit({content:`Closed LYRICS panel`,embeds: []})
                
            }
        }
    })

      
        
      
    }
    if(interaction.commandName === 'volume')
    {
      if(!interaction.member.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      if(!interaction.guild.me.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      if(!interaction.member.voice.channel === interaction.guild.me.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      let queue = Music.getQueue(interaction);
       if(!queue) interaction.followUp({content:"Please play music before running this command", ephemeral:true})
      const row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
      .setCustomId('vol_down')
      .setStyle('PRIMARY')
      .setEmoji('🔈'),new Discord.MessageButton()
      .setCustomId('vol_up')
      .setStyle('PRIMARY')
      .setEmoji('🔊'))
      const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription('**Volume: ' + queue.volume + '%**')
      interaction.reply({embeds: [embed] , components: [row]});
      const filter = i => i.member.id === interaction.member.id;
      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 400000 });
      collector.on('collect', async i => 
      {
        if(!i.member.voice.channel) return i.reply({ embeds: [errorbed], ephemeral: true });
        if(!i.guild.me.voice.channel) return i.reply({ embeds: [errorbed], ephemeral: true });
        if(!i.member.voice.channel === interaction.guild.me.voice.channel) return i.reply({ embeds: [errorbed], ephemeral: true });
        if (i.customId === 'vol_up') 
        {
          let queue1 = Music.getQueue(i);
          if(queue1.volume.toString().startsWith('150')) return i.reply({ embeds: [errorbed], ephemeral: true });
          Music.setVolume(i,queue1.volume + 5);
          let queue2 = Music.getQueue(i);
          const embed1 = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setDescription('**Volume: ' + queue2.volume + '%**')
          await i.update({embeds: [embed1]});
        }
        if(i.customId === 'vol_down')
        {
          let queue1 = Music.getQueue(i);
          if(queue1.volume < 5) return i.reply({ embeds: [errorbed], ephemeral: true });
          Music.setVolume(i,queue1.volume - 5);
          let queue2 = Music.getQueue(i);
          const embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setDescription('**Volume: ' + queue2.volume + '%**')
          await i.update({embeds: [embed]});
        }
      });
    }
    if(interaction.commandName === 'panel')
    {
      if(!interaction.member.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      if(!interaction.guild.me.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      if(!interaction.member.voice.channel === interaction.guild.me.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      let queue = Music.getQueue(interaction);
      if(!queue) interaction.followUp({content:"Please play music before running this command", ephemeral:true})
      const row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
      .setCustomId('n1')
      .setStyle('SECONDARY')
      .setLabel('\u200b').setDisabled(),new Discord.MessageButton()
      .setCustomId('vol_down')
      .setStyle('PRIMARY')
      .setEmoji('🔈'),new Discord.MessageButton()
      .setCustomId('vol_up')
      .setStyle('PRIMARY')
      .setEmoji('🔊'),new Discord.MessageButton()
      .setCustomId('n8')
      .setStyle('SECONDARY')
      .setLabel('\u200b').setDisabled())
   const row2 = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
      .setCustomId('n4')
      .setStyle('SECONDARY')
      .setLabel('\u200b').setDisabled(),new Discord.MessageButton()
      .setCustomId('pause')
      .setStyle(4)
      .setEmoji('⏸️'),new Discord.MessageButton()
      .setCustomId('play')
      .setStyle('SUCCESS')
      .setEmoji('▶️'),new Discord.MessageButton()
      .setCustomId('n2')
      .setStyle('SECONDARY')
      .setLabel('\u200b').setDisabled())
      const stoprow = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
      .setCustomId('ne22')
      .setStyle('SECONDARY')
      .setLabel('Thanks').setDisabled(),new Discord.MessageButton()
      .setCustomId('n2234')
      .setStyle('SECONDARY')
      .setLabel('For').setDisabled(),new Discord.MessageButton()
      .setCustomId('n2324')
      .setStyle('SECONDARY')
      .setLabel('Using').setDisabled(),new Discord.MessageButton()
      .setCustomId('n24442')
      .setStyle('SECONDARY')
      .setLabel(`${Client.user.username}`).setDisabled())
      const row3 = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
      .setCustomId('n3')
      .setStyle('SECONDARY')
      .setLabel('\u200b').setDisabled(),new Discord.MessageButton()
      .setCustomId('skip')
      .setStyle(2)
      .setEmoji('⏩'),new Discord.MessageButton()
      .setCustomId('shuffle')
      .setStyle(2)
      .setEmoji('🔃'),new Discord.MessageButton()
      .setCustomId('n5')
      .setStyle('SECONDARY')
      .setLabel('\u200b').setDisabled())
       const row4 = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
      .setCustomId('n90')
      .setStyle('SECONDARY')
      .setLabel('\u200b').setDisabled(),new Discord.MessageButton()
      .setCustomId('stop2')
      .setStyle(4)
      .setEmoji('🛑'),new Discord.MessageButton()
      .setCustomId('refresh')
      .setStyle('SUCCESS')
      .setEmoji('🔄'),new Discord.MessageButton()
      .setCustomId('n524')
      .setStyle('SECONDARY')
      .setLabel('\u200b').setDisabled())
      
      
      const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`Now Playing - ${queue.songs[0].name}`)
      .setDescription('**Music Control Panel** \n Volume : ' + queue.volume + 
      "\n Paused? : "+queue.paused)
      interaction.reply({embeds: [embed] , components: [row,row2,row3,row4]});
      const filter = i => i.member.id === interaction.member.id;
      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 400000 });
      collector.on('collect', async i => 
      {
        if(!i.member.voice.channel) return i.reply({ embeds: [errorbed], ephemeral: true });
        if(!i.guild.me.voice.channel) return i.reply({ embeds: [errorbed], ephemeral: true });
        if(!i.member.voice.channel === interaction.guild.me.voice.channel) return i.reply({ embeds: [errorbed], ephemeral: true });
        if (i.customId === 'vol_up') 
        {
          let queue1 = Music.getQueue(i);
          if(queue1.volume.toString().startsWith('150')) return i.reply({ embeds: [errorbed], ephemeral: true });
          Music.setVolume(i,queue1.volume + 5);
          let queue2 = Music.getQueue(i);
          const embed1 = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle(`Now Playing - ${queue.songs[0].name}`)
          .setDescription('**Music Control Panel** \n Volume : ' + queue.volume + 
      "\n Paused? : "+ queue.paused)
          await i.update({embeds: [embed1]});
        }
         if (i.customId === 'pause') 
        {
          if(queue.paused){
            return 
          }else{
          Music.pause(interaction);
        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Now Playing - ${queue.songs[0].name}`)
        .setTitle(`Now Playing - ${queue.songs[0].name}`)
       .setDescription('**Music Control Panel** \n Volume : ' + queue.volume + 
      "\n Paused? : "+ queue.paused)
       await i.update({embeds: [embed]});}
        }
          if (i.customId === 'play') 
        {
          if(queue.paused){
             Music.resume(interaction);
        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
       .setDescription('**Music Control Panel** \n Volume : ' + queue.volume + 
      "\n Paused? : "+ queue.paused)
      .setTitle(`Now Playing - ${queue.songs[0].name}`)
       await i.update({embeds: [embed]});
          }else{
            return
         }
        }
         if (i.customId === 'shuffle') 
        {
           if(queue.songs.length === 1) return interaction.followUp({ embeds: [errorbed], ephemeral: true });
             Music.shuffle(interaction);
        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
       .setDescription('**Music Control Panel** \n Volume : ' + queue.volume + 
      "\n Paused? : "+ queue.paused)
      .setTitle(`Now Playing - ${queue.songs[0].name}`)
      .setFooter("Log: Queue Shuffled")
       await i.update({embeds: [embed]});
       interaction.followUp({content: "Queue is now shuffled!", ephemeral: true})
         
        }
        if (i.customId === 'refresh') 
        {
        
        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
       .setDescription('**Music Control Panel** \n Volume : ' + queue.volume + 
      "\n Paused? : "+ queue.paused)
      .setTitle(`Now Playing - ${queue.songs[0].name}`)
      .setFooter("Log: Refreshed, by " + i.user.username)
       await i.update({embeds: [embed]});
       interaction.followUp({content: "Refreshed the panel", ephemeral: true})
         
        }
        if (i.customId === 'stop2') 
        {
         Music.stop(interaction);
        const embed = new Discord.MessageEmbed()
        .setColor('RED')
       .setDescription('Thanks for using '+ Client.user.username + `\n The music was stopped by ${i.user.username}`)
      
       await i.update({embeds: [embed], components: [stoprow]});
       interaction.followUp({content: "Music Stopped", ephemeral: true})
         
        }
        if (i.customId === 'skip') 
        {
           if(queue.songs.length === 1) return interaction.followUp({ embeds: [errorbed], ephemeral: true });
        try{
             Music.skip(interaction);
        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
       .setDescription('**Music Control Panel** \n Volume : ' + queue.volume + 
      "\n Paused? : "+ queue.paused)
      .setTitle(`Now Playing - ${queue.songs[0].name}`)
       await i.update({embeds: [embed]});
        }catch(err){
          console.log(err)
        }
        }
        if(i.customId === 'vol_down')
        {
          let queue1 = Music.getQueue(i);
          if(queue1.volume < 5) return i.reply({ embeds: [errorbed], ephemeral: true });
          Music.setVolume(i,queue1.volume - 5);
          let queue2 = Music.getQueue(i);
          const embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
         .setDescription('**Music Control Panel** \n Volume : ' + queue.volume + 
      "\n Paused? : "+ queue.paused)
      .setTitle(`Now Playing - ${queue.songs[0].name}`)
          await i.update({embeds: [embed]});
        }
      });
    }
    if(interaction.commandName === 'skip')
    {

      if(!interaction.member.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      if(!interaction.guild.me.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      if(!interaction.member.voice.channel === interaction.guild.me.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      let queue = Music.getQueue(interaction);
       if(!queue) interaction.followUp({content:"Please play music before running this command", ephemeral:true})
      if(queue.songs.length === 1) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      try
      {
        Music.skip(interaction);
        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription('**Skipped current Song**');
        interaction.reply({embeds: [embed]});
      }
      catch(err)
      {
        return interaction.reply({ embeds: [errorbed], ephemeral: true });
      }
    }
    if(interaction.commandName === 'filter')
    {
      if(!interaction.member.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      if(!interaction.guild.me.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      if(!interaction.member.voice.channel === interaction.guild.me.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      let queue = Music.getQueue(interaction);
        if(!queue) interaction.followUp({content:"Please play music before running this command", ephemeral:true})
      try
      {
        const filt = Music.setFilter(interaction,interaction.options.getString('filter'))
        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription('**Filter: ' + filt + '**');
        interaction.reply({embeds: [embed]});
      }
      catch(err)
      {
        return interaction.reply({ embeds: [errorbed], ephemeral: true });
        conosle.log(err)
      }
    }
    if(interaction.commandName === 'queue')
    {
      if(!interaction.member.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      if(!interaction.guild.me.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      if(!interaction.member.voice.channel === interaction.guild.me.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      const queue = Music.getQueue(interaction);
      if(!queue) interaction.followUp({content:"Please play music before running this command", ephemeral:true})
      if(!queue) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Current Queue of songs')
      .setDescription(`${queue.songs.map((song , id) => `[${song.name}](${song.url})`).slice(0,10).join('\n')}`)
      interaction.reply({embeds: [embed]});
    }
    if(interaction.commandName === 'stop')
    {
      if(!interaction.member.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      if(!interaction.guild.me.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      if(!interaction.member.voice.channel === interaction.guild.me.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      const queue = Music.getQueue(interaction);
      if(!queue.playing)return interaction.reply({ embeds: [errorbed], ephemeral: true });
      Music.stop(interaction);
      const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription('**Music Stopped**')
      interaction.reply({embeds: [embed]});
    }
    if(interaction.commandName === 'shuffle')
    {
      if(!interaction.member.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      if(!interaction.guild.me.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      if(!interaction.member.voice.channel === interaction.guild.me.voice.channel) return interaction.reply({ embeds: [errorbed], ephemeral: true });
     
      const queue = Music.getQueue(interaction);
      if(!queue.playing)return interaction.reply({ embeds: [errorbed], ephemeral: true });
      if(queue.songs.length === 1) return interaction.reply({ embeds: [errorbed], ephemeral: true });
      Music.shuffle(interaction);
      const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription('**Shuffled Songs Queue**');
      return interaction.reply({embeds: [embed]});
    }
   
   
  
  }
  
 
});

Music.on('playSong', (queue, song) => {
  const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setThumbnail(song.thumbnail)
    .setAuthor('Now Playing', 'https://cdn.discordapp.com/attachments/873161348694048780/892310990056747028/855561346087387136.gif')
    .setTitle(song.name)
    .setURL(song.url)
    .addField('Duration', song.formattedDuration, true)
    .addField('Requestor', song.user.username, true);
  queue.textChannel.send({ embeds: [embed] });
});

Music.on('addSong', (queue, song) => {
  const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setThumbnail(song.thumbnail)
    .setAuthor('Added To Queue', 'https://cdn.discordapp.com/attachments/873161348694048780/892310990056747028/855561346087387136.gif')
    .setTitle(song.name)
    .setURL(song.url)
    .addField('Duration', song.formattedDuration, true)
    .addField('Requestor', song.user.username, true);
  queue.textChannel.send({ embeds: [embed] });
});

Music.on('error' , (txt,e) => 
{
  return console.log(e);
})



Client.login(config.TOKEN);
