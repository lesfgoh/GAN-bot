/** Handle the user message.
 * @param {string} payload the message sent by user
 * @param {AppState} state the state of the app
 * @param {Tool} tools available tools to perform a task
 */
async function run(payload, state, tools) {
  try{
    if (!state.started){
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
    if (!state.question) {
    tools.reply("Please wait, I'm pulling a post.")
    state.text = await tools.fakePost
      (
          {userMessage: payload}
      );
      tools.reply(state.text);
      state.question = true;
      tools.reply("Is this piece of news true or false?");
    }
    else {
      await tof(payload, state, tools);
      state.question = false;
    }
  }

  catch (e) {
    tools.reply("There's something wrong with the code. The program will thus terminate.");
  }
}

async function tof(payload, state, tools) {
  const {truth} = JSON.parse(
    await tools.trueOrFalse(
      {
        question: "Is this piece of news true or false?",
        answer: payload
      }
      )
    );
  if (truth) 
    {
      state.correct+=1;
      tools.reply("You're wrong!");
    }
  else {
    tools.reply("You're correct!"); 
    }
  tools.reply("Here's how you can identify where it's fake:");
  tools.reply(await tools.explanation({fake_news: state.text}));
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
  state.correct = 0;
  state.text = '';
}