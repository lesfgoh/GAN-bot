/** Handle the user message.
 * @param {string} payload the message sent by user
 * @param {AppState} state the state of the app
 * @param {Tool} tools available tools to perform a task
 */
const db = '{ "news" : [' +
'{ "summary":"Donald Trump just couldn t wish all Americans a Happy New Year and leave it at that. Instead, he had to give a shout out to his enemies, haters and  the very dishonest fake news media.  The former reality show star had just one job to do and he couldn t do it. As our Country rapidly grows stronger and smarter, I want to wish all of my friends, supporters, enemies, haters, and even the very dishonest Fake News Media, a Happy and Healthy New Year,  President Angry Pants tweeted.  2018 will be a great year for America! As our Country rapidly grows stronger and smarter, I want to wish all of my friends, supporters, enemies, haters, and even the very dishonest Fake News Media, a Happy and Healthy New Year. 2018 will be a great year for America!  Donald J. Trump (@realDonaldTrump) December 31, 2017Trump s tweet went down about as welll as you d expect.What kind of president sends a New Year s greeting like this despicable, petty, infantile gibberish? Only Trump! His lack of decency won t even allow him to rise above the gutter long enough to wish the American citizens a happy new year!  Bishop Talbert Swan (@TalbertSwan) December 31, 2017no one likes you  Calvin (@calvinstowell) December 31, 2017Your impeachment would make 2018 a great year for America, but I ll also accept regaining control of Congress.  Miranda Yaver (@mirandayaver) December 31, 2017Do you hear yourself talk? When you have to include that many people that hate you you have to wonder? Why do the they all hate me?  Alan Sandoval (@AlanSandoval13) December 31, 2017Who uses the word Haters in a New Years wish??  Marlene (@marlene399) December 31, 2017You can t just say happy new year?  Koren pollitt (@Korencarpenter) December 31, 2017Here s Trump s New Year s Eve tweet from 2016.Happy New Year to all, including to my many enemies and those who have fought me and lost so badly they just don t know what to do. Love!  Donald J. Trump (@realDonaldTrump) December 31, 2016This is nothing new for Trump. He s been doing this for years.Trump has directed messages to his  enemies  and  haters  for New Year s, Easter, Thanksgiving, and the anniversary of 9/11. pic.twitter.com/4FPAe2KypA  Daniel Dale (@ddale8) December 31, 2017Trump s holiday tweets are clearly not presidential.How long did he work at Hallmark before becoming President?  Steven Goodine (@SGoodine) December 31, 2017He s always been like this . . . the only difference is that in the last few years, his filter has been breaking down.  Roy Schulze (@thbthttt) December 31, 2017Who, apart from a teenager uses the term haters?  Wendy (@WendyWhistles) December 31, 2017he s a fucking 5 year old  Who Knows (@rainyday80) December 31, 2017So, to all the people who voted for this a hole thinking he would change once he got into power, you were wrong! 70-year-old men don t change and now he s a year older.Photo by Andrew Burton/Getty Images." , "istrue":false },' +
'{ "summary":"21st Century Wire says The CIA is trying its best to avoid oversight and accountability.Watch a video of this report here: An anonymous ex-CIA officer explains: The classic use of an eyewash is if you have a garden-variety source and all of a sudden he gains access to truly sensitive information, What you might do is have a false communication saying the guy got hit by a bus and died. The large number of people aware of this source suddenly think he is dead. But the continuing reporting on that source and from that source gets put into a very closed compartment that few would know about. In one documented example, CIA officials said that a senior Al-Qaeda member was killed as a result of tribal violence. Yet, in actual fact, the terrorist had been killed by a drone strike.The intent behind this eyewash was to conceal the then-secret CIA drone program in Pakistan.Former CIA inspector general, Fred Hitz, said that deliberately misleading employees is really playing with fire. Steven Aftergood, a government secrecy expert at the Federation of American Scientists, said, When you introduce falsehoods into the communications stream then you can destabilize the whole system of intelligence oversight and compliance with the law. What now needs to be examined is the extent to which this practice still takes places today and who exactly receives the accurate information. Is the true information ever sent to elected officials, or always withheld by this shadow government operating essentially on its own?Interestingly, it is often said by skeptics that any part of the government could never be involved in a monumental conspiracy because too many people would have to know about it, and someone would talk.The exposure of the eyewashing program now crushes this argument, as it reveals to us the extreme extent of compartmentalisation that exists within the modern American government that is capable of hiding the most despicable activities.It is also likely that many other government agencies employ similar tactics, in order to ensure that those at the top stay there and threats to their power can be dealt with quietly. Departments look out for themselves, and particularly their own relevance.Naturally, this intelligence phenomenon extends into the media, as mainstream media outlets always rely on their internal agency  sources  for any  inside information    which could  misleading, or completely false.What might they do, and subsequently try to hide, to ensure they stay relevant?READ MORE ON THE CLANDESTINE CIA: 21st Century Wire CIA Files" , "istrue":false },' +
'{ "summary":"21st Century Wire says This week, the historic international Iranian Nuclear Deal was punctuated by a two-way prisoner swap between Washington and Tehran, but it didn t end quite the way everyone expected. On the Iranian side, one of the U.S. citizens who was detained in Iran, Nosratollah Khosravi-Roodsari, has stayed in Iran, but on the U.S. side   all 7 of the Iranians held in U.S. prisons DID NOT show up to their flight to Geneva for the prisoner exchange   with at least 3 electing to stay in the U.S  TEHRAN SIDE: In Iran, 5 U.S. prisoners were released, with 4 of them making their way to Germany via Switzerland.Will Robinson Daily MailNone of the Iranians freed in the prisoner swap have returned home and could still be in the United States, it has been reported.The seven former inmates, who were released as part of a deal with the Islamic republic, did not show up to get a flight to Geneva, Switzerland, where the exchange was set to take place on Sunday.Three of the Iranians have decided to stay in the United States, ABC reported, with some moving in with their families. However it is not known where the other four are.Three of the Americans who had been detained in Iran   Washington Post journalist Jason Rezaian, former U.S. Marine Amir Hekmati and Christian pastor Saeed Abedini   left Tehran at around 7am the same day, but weren t met by their counterparts in Switzerland Continue this story at the Mail OnlineREAD MORE IRAN NEWS AT: 21st Century Wire Iran Files" , "istrue":false } ]}';
const obj = JSON.parse(db);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function run(payload, state, tools) {
  try{
    if (!state.started){
      state.question = true;
      state.started = true;
      const {yes} = JSON.parse(
        await tools.yesOrNo(
          {question: q1,
          answer: payload}
        )
      );
      if (!yes) {
        tools.reply('Understood, the game has ended now. Goodbye!');
        return;
      }
    }
    if (state.question) {
    state.question = false;
    tools.reply("Please wait, I'm pulling a post.")
    // retrieve from db
    let i = getRandomInt(0, obj.news.length-1);
    let news = obj.news[i].summary;

    state.text = await tools.repeatNews({info: news});
    state.truth = obj.news[i].istrue;
    tools.reply(state.text);
    tools.reply("Is this piece of news true or false?");
    state.rounds++;
    }
    else {
      await tof(payload, state, tools);
      state.replay = true;
    }

    if (state.replay) {
      tools.reply(`Your score is ${state.score} out of ${state.rounds}. Let's play again.`);
      state.replay = false;
      state.question = true;
    }
  }
  catch (e) {
    tools.reply(`There's something wrong with the code. The program will thus terminate. ${e}`);
  }
}

async function tof(payload, state, tools) {
  let { userTruth } = JSON.parse(
    await tools.trueOrFalse(
      {
        question: "Is this piece of news true or false?",
        answer: payload
      }
      )
    );

  if (state.textTruth == userTruth) 
    {
      state.score++;
      tools.reply(`You're correct! This news is ${state.textTruth}. Here's how you can identify why:`); 
      
    }
  else {
      tools.reply(`You're wrong! This news is ${state.textTruth}. Here's how you can identify why:`);
    }
  tools.reply(await tools.explanation({news: state.text, truth: state.textTruth.toString()}));
}

/** Startup.
 * @param {AppState} state the state of the app
 * @param {Tool} tools available tools to perform a task
 */
async function startup(state, tools) {
  q1= "I'm designed to test your social media savviness by giving you both fake and real news. Your task is to identify which is fake, and which is real. Are you ready for the challenge?"
  tools.reply(q1);
  state.started = false;
  state.question = false;
  state.replay = false;
  state.score = 0;
  state.rounds = 0;
  state.text = '';
  state.textTruth = false;
  state.userAnswer = false;
}
