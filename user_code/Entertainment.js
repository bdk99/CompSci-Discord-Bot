//Function that reacts with all unique server emojis
function ce(message) 
{
    const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'billtiger');
    const reactionEmoji2 = message.guild.emojis.cache.find(emoji => emoji.name === 'hackerevett');
    const reactionEmoji3 = message.guild.emojis.cache.find(emoji => emoji.name === '420');
    const reactionEmoji4 = message.guild.emojis.cache.find(emoji => emoji.name === '69');
    const reactionEmoji5 = message.guild.emojis.cache.find(emoji => emoji.name === 'potatojump');
    const reactionEmoji6 = message.guild.emojis.cache.find(emoji => emoji.name === 'billiam');
    const reactionEmoji7 = message.guild.emojis.cache.find(emoji => emoji.name === 'youngmanny');
    const reactionEmoji8 = message.guild.emojis.cache.find(emoji => emoji.name === 'CourtManny');
    const reactionEmoji9 = message.guild.emojis.cache.find(emoji => emoji.name === 'sillybilly');
    const reactionEmoji10 = message.guild.emojis.cache.find(emoji => emoji.name === 'santamanny');
    const reactionEmoji11 = message.guild.emojis.cache.find(emoji => emoji.name === 'billywow');
    const reactionEmoji12 = message.guild.emojis.cache.find(emoji => emoji.name === 'zhangy');
    const reactionEmoji13 = message.guild.emojis.cache.find(emoji => emoji.name === 'billy2');
    const reactionEmoji14 = message.guild.emojis.cache.find(emoji => emoji.name === 'manny');
    const reactionEmoji15 = message.guild.emojis.cache.find(emoji => emoji.name === 'billmoji');
    const reactionEmoji16 = message.guild.emojis.cache.find(emoji => emoji.name === 'tim');
  
    message.reply(`${reactionEmoji}`);
    message.react(reactionEmoji2);
    message.react(reactionEmoji3);
    message.react(reactionEmoji4);
    message.react(reactionEmoji5);
    message.react(reactionEmoji6);
    message.react(reactionEmoji7);
    message.react(reactionEmoji8);
    message.react(reactionEmoji9);
    message.react(reactionEmoji10);
    message.react(reactionEmoji11);
    message.react(reactionEmoji12);
    message.react(reactionEmoji13);
    message.react(reactionEmoji14);
    message.react(reactionEmoji15);
    message.react(reactionEmoji16);
}
  
//Function that sends a motivation quote or meme
function motivateme(message) 
{
    var quotes = 
    [
        "https://tenor.com/view/do-it-star-wars-gif-4928619",
        "Push yourself, because no one else is going to do it for you.",
        "If you see a chance to be kind to someone tomorrow, take it. I think we need it. -Brad Pitt",
        "If you don't design your own life plan, chances are you'll fall into someone else's plan. And guess what they have planned for you? Not much.",
        "Life is 10% what happens to you and 90% how you react to it.",
        "Problems are not stop signs, they are guidelines. -Elon Musk",
        "If you fell down yesterday, stand up today. -H.G. Wells",
        "Education is the passport to the future, for tomorrow belongs to those who prepare for it today. — Malcolm X",
        "Education is the most powerful weapon you can use to change the world.",
        "A person who never made a mistake never tried anything new. — Albert Einstein",
        "Learning is never done without errors and defeat. – Vladimir Lenin",
        "Procrastination makes easy things hard and hard things harder.",
        "You don’t have to be great to start, but you have to start to be great.",
        "The way to get started is to quit talking and begin doing. – Walt Disney",
        "The best way to predict your future is to create it. —Abraham Lincoln",
        "The future belongs to those who believe in the beauty of their dreams. ― Eleanor Roosevelt",
        "You are braver than you believe, stronger than you seem and smarter than you think.",
        "Learn from yesterday. Live for today. Hope for tomorrow. – Albert Einstein",
        "He who asks a question is a fool for five minutes; he who does not ask a question remains a fool forever. — Chinese Proverb",
    ]
    var index = getRandomInt(quotes.length - 1);
    message.channel.send(quotes[index]);
}

//Function for Teacher quotes!  DO NOT REMOVE
function quote(message) 
{
    var quotes2 = 
    [
        "'Don't act like you guys are the only ones in my life' - S. Maniccam",
        "'This so dumb' - L. Zhang",
        "'It is not my responsibility to fix problems' - Maniccam",
        "'I want to punch some of you in the face' - S. Maniccam",
        "'I need to beat the crap out of some of you' - Maniccam",
        "'You can't keep blaming software' - eydgahi",
        "'Half of you will fail this class' - every shitty professor ever",
        "'Turn on your camera so I can look you in your eyes' - Sverdlik",
        "'I expect only 30% of you to still be in this room by the end of the semester'-Zhang",
        "'Wow I never knew anyone who was proud of being bad at their job'- Things to say to make them squirm",
        "'Drink coffee all day and you prove things' - Maniccam",
        "'Do it' - Zhang",
        "'I am confident, no one in your jobs as good at recursion than me.' - Li Zhang",
        "'I am not sure how much longer we will be here. This is a once in a century event' - Zhang",
        "'Bla' - Maniccam",
        "'In pseudocode this looks like ...' and proceeds to write perfectly valid python code",
        "'This smells like a math class ' -maniccam",
        "'we can just marathon run through this' - Maniccam",
        "'Let me look at your faces, man to man' -Maniccam",
        "'well that's his problem' - Maniccam",
        "'Languages nowadays baby the programmer. C does not' - Maniccam",
        "'This is so horrible' -Zhang",
        "'Horrible code, this is just... Aweful code' -Zhang",
        "'let's say I'm one of those idiots' -Maniccam",
        "'parenthesisisis' - Maniccam",
        "'this thing is so stupid...  so stupid' -  Zhang",
        "“Worry about it when we get there” Maniccam",
        "'I'm gonna leave. Everybody get out' - Maniccam",
        "'It's okay, we are not abusing our child' - S. Jiang",
        "'Some of you, you insult me, you treat me like nothing' -Li Zhang",
        "'I don't want to be teaching this class but the department is forcing me to'-Zhang",
        "'You guys are supposed to be able to figure this out.  I shouldn't be showing you' -Sverdlik",
        "Every teacher ' You should have gone into this last year'",
        "The teacher last year ' You won't have to worry about this until next year'",
        "“Some of you don’t care...  you’re just writing stuff that only your cat would understand...” ~ Zhang",
        "'Turn off your mic I don't want to hear your family members' - Maniccam",
        "'If you cannot prove this to me, that means we have failed' - Maniccam",
        "'I don't care about the blah blah blah' -S. Maniccam",
        "'why do students play these games with me' -maniccam when one student is missing",
        "'It's just amazing' - Li Zhang",
        "'I say, you just in your orbit around your universe, that's it' - Li Zhang",
        "'Someone could give you a question to make your life miserable' - Maniccam",
        "'oooooooOOOOoooOO' - Maniccam",
        "'Wat da hell is the token type' - Maniccam",
        "'I'm not gonna have infinite lube(loop)' -Maniccam",
        "'There is a god' - Maniccam",
        "“Fun, lower level coding” Maniccam",
        "'I just assume your answer come from aliens, from area 51' - Li Zhang",
        "'I should write a booklet on recursion for dummies' - Li Zhang",
        "'I'll do it next year' - Li Zhang",
        "'I don't think you are geeks, but sometimes you behave like the geeks' - Li Zhang",
        "'You're not a human' - also Li Zhang",
        "'MORE EVIL PLAN'",
        "'you probably hire some aliens to tele-send you the answers' -Li Zhang",
        "'for few people I give up... grading so easy I cant find errors.. probably hire aliens to tele send you answers'",
        "'My cat knows alot about recursion'",
        "'Fans are an optional accessory'-Ryan Kim when talking about PC building",
        "'By You and me, I mean humans' - Manniccam",
        "'UHHHHHhhhhhhhhhhhhhh...' - Maniccam",
        "'If it was a banana, you would put the banana inside the list.' -Maniccam",
        "'X could be an atom, it could be list, it could be banana or dog' - Maniccam",
        "'What if I sent it... Whatever its called....' - Zenia Bahorski",
        "'Error on line 41, I dont wanna count these!' - Zenia Bahorski",
        "'I think I'll play with this later.' - Zenia Bahorski ",
        "'if you are going to the facebook, they have all the data, they know how everyone is connected' -S. Maniccam",
        "'This is where things get really really funky' - Sverdlik",
        "'So you're saying... bounce this guy, and this guy, upstairs?!' - Sverdlik",
        "'Don't tell me something doesn't work, deal with your problems on your own' -S. Maniccam",
        "'Forget about canvas, it doesn't need to mentioned, it's SO dumb' - Li Zhang",
        "'Okay, I've seen enough' -William Sverdlik",
        "'You can proudly proclaim that you have a lisp' -Li Zhang",
        "'This is one of the worst displays of human insanity' - Li Zhang",
        "'It works! Of course it works. Because I'm so good' - Zhang",
        "'this class got complicated quick. we're coding wholeass families now' ",
        "'This is how to find the children' - Sverdlik",
        "'You can't mute me, I am the law' - Ryan Kim",
        "'There are two types of touching.' -S. Maniccam",
        "'Both are touching, but they are a different type of touching' -S. Maniccam",
        "'The second type wasn't exactly soothing' - Maniccam's ex wife probably",
        "'The answer is yes, so I kick the bigger one upstairs' - Sverdlik",
        "'Being busy isn't always not nice' - Kyle Bartush",
        "'This implemention is....hmmm...how do I say it....the most stupid implementation' -Tong about his own code",
        "“Everybody likes to complain about everything” -Maniccam",
        "'Computer science majors, you know, geeks' - Maniccam",
        "'Bill represents our confusion. Zhang represents our insanity. Maniccam represents our frustration and anger. These 3 are literally the holy trinity of compsci professors representing the emotional repercussions of being in computer science' - Jesse in the COSC 311 Sverdlik channel",
        "'How do I find the good N' - William Sverdlik",
        "'How do I pick the pivot?!' - William Sverdlik",
        "'We are literally cheating our ways to a better future' -Anonymous",
        "'Try your stupid approach and fail miserably, burn your life'",
        "'I expect this wednesday would be horrible' - Li Zhang",
        "'What does Eclipse look like?' - Sverdlik",
        "'What a silly language, it cant figure that out for me?!' - Sverdlik",
        "Sverdlik: 'Wait a second, are you telling me I made a mistake?!?'",
        "'You guys are just great' - Sverdlik",
        "'I like my hash with a little salt and pepper myself, but that's just me' - Sverdlik",
        "'For this one, I would say, just use your brain. Use your eyes.' -S. Maniccam",
        "'So have I convinced you all to become literature students yet?'-Sverdlik",
        "'You should change your major to music instead.' (fall 2019 after randomly bringing/playing a guitar in Professor Maniccam's 341)",
        "'You guys think driving is piece of cake, open the car door, turn on ignition, and drive.' -Maniccam",
        "'zwoop' - Maniccam",
        "'This is like grandma driving a car' - Maniccam",
        "'push push push pop pop pop' - Maniccam",
        "'Fuck binary trees, all my homies hate binary trees' - Mr_J",
        "'I'd rather a linked list pulled a bed sheet around my head and skull fucked me than to have to deal with another fucking BST' - @Mr_J",
        "'If you don't know recursion, you are DOOMED!' - Zhang",
        "'Cheat Smartly' - Zhang",
        "'For the next two weeks... Completely ignore your past experiences in programming' - Zhang",
        "'Many books are garbage' -Maniccam",
        "'You cannot hide' - Maniccam",
        "'Some of you have probably heard bad things about me - some of those things are probably true.' - Maniccam",
        "'Never tell an accountant to write a for loop, he'll likely respond 'What the hell is this?'' - Maniccam",
        "When Zhang starts making sex noises while lecturing....",
        "'The two scores above 80% for this quiz are from one boy and from one girl.' * Points at me and other student. * 'That shows you all, that programming is not sexist, and that you are all just bad.' - Zhang",
        "'You and me are going to agree, well, I'm going to force you to agree' - Maniccam",
        "'I can't believe society has lied to me. This is so new -Josh Roznowski'",
        "'it's open book but not open friends' - zhang",
        "'How not to die poor' - Maniccam",
        "'I don't want to do marriage counseling' - Maniccam",
        "“Take a brute force approach” - Narayanan",
        "'NOT MY PROBLEM' - Zhang",
        "'DUMB CANVAS... JUST SO DUMB' - Zhang",
        "'Even if you so dumb, you can figure this out' - Zhang",
        "'Two Two Two Two' -Zhang",
        "'Everyone should know this one, if you aren't dumb enough' - Zhang",
        "'There are lots of ways to make a person less than another' -Bill",
        "'I'm not dreaming. I'm not smoking anything' - Maniccam",
        "'I have to go home and figure this out' - Maniccam",
        "'Open your eyes real wide, slap yourself, and read it' - Maniccam",
        "'You should go home and read it' - Maniccam",
        "'I have no further comment. Wish I could say that to everybody' - Maniccam",
        "'I have a lot of shit to do before 5:30. Bye.' - Maniccam",
        "'That's the only fun in my life, watching other people lose money.' - Maniccam",
        "Illegible text scribbled on the page 'Come on people, what does it say!' -Maniccam",
        "'Don't tell me you're confused. I don't want to hear the word confusion.' - Maniccam",
        "'I have to send an apology letter to my...' Stops talking and continues to something else - Maniccam",
        "'You guys look like good students. Well, I don't know - I haven't looked at your quizzes. But last semester was not good.' -Maniccam",
        "'Mmm, this is good. This is good. I'm so smart.' - classic Zhang",
        "'I think I took an example from somewhere' - Rita Chattopadhyay",
        "'the next section Im SUPPOSED to teach for this class' - Rita Chattopadhyay",
        "'Drawing is not good, don't pay attention to it' - Rita Chattopadhyay As she continues to use the drawing in her lecture",
        "'Answers will be correct if you do the problem correctly, that might not be the case if you do it incorrectly' - Rita Chattopadhyay",
        "'Fork a child' -Evett",
        "'This is the worst software I've ever seen in this century' - Zhang  ",
        "'Canvas is the worst piece of garbage in the century' - Zhang",
        "'Grading Quizzes is so unproductive' -Zhang",
        "'From now on 4 consecutive recursion quizzes on Wednesday' - Zhang",
        "'I'll probably blame Java.  Because recursion is unmanageable' - Zhang",
        "“Your mind is not correct” - Zhang",
        "'Zhang probably eats recursion in all 3 meals and I wont be surprised.' - Faizan A.",
        "'I didn't pay much attention probably' - Zhang ",
        "'Zhang complaining about canvas ............. drinking game anyone?' - Andreaka Jump",
        "'I have high expectations for this quiz this Wednesday, some of you... Will do just fine' - Zhang",
        "'Its so SIMPLE!  Just get it done!' -Zhang",
        "'Poor thing is dead, IS DEAD!' - Zhang when his SML compiler wouldn't work",
        "'When they invented 'tough,' they had Michigan people in mind. We wrestle bears and write code in Java.' - William Sverdlik",
        "'Maybe you can go home after listening to this part' - maniccam",
        "'Parent may terminate execution of children'  -Evett",
        "'I have already cussed at zhang in 4 different languages. I am livid.' - Faizan A. about Zhangs quizzes",
        "“I don’t know how the complier is so dumb” - zhang",
        "'The next time I ask, 'what's wrong with you guys?,' you can just respond: 'we're vitamin D deficient.'' - Sverdlik",
        "'that's a you problem' - @Ryan Kim",
        "'It's not like you are married to this person for 20 years. You can override it' - Maniccam",
        "'I don't even know what discord is. I don't want to know.' - Maniccam",
        "'Computer science students have a license to bullshit' - Maniccam",
        "'Poor thing is dead, IS DEAD!' - Zhang when his SML compiler wouldn't work",
        "'Mmm, this is good. This is good. I'm so smart.' - Zhang",
        "'The next time I ask, 'what's wrong with you guys?,' you can just respond: 'we're vitamin D deficient.'' - Sverdlik",
        "'That's the only fun in my life, watching other people lose money.' -Maniccam",
        "'You and me are going to agree, well, I'm going to force you to agree' - Maniccam",
        "'Never tell an accountant to write a for loop, he'll likely respond 'What the hell is this?'' - Maniccam",
    ]
    var index = getRandomInt(quotes2.length - 1);
    message.channel.send(quotes2[index]);
}

//Function that makes people laugh
function makemelaugh(message) 
{
    var quotes = 
    [
		"'I am actually fighting a king sized chicken nugget' - Lobo Justice League Action",
		"'Oh nothing I'm just talking to a disembodied professor that lives in my head' - Firestorm Justice League Action",
		"'Nope. No times no divided by no to the power of oh hell no' - Diblo How Not To Summon a Demon Lord",
		"'It's a beautiful day outside. Birds are singing, flowers are blooming. On days like this, kids like you should be burning in hell' - Discord Sings......Except Everyone Starts Singing Random Songs for Some Reason Part 3",
		"'Oh good my dog found the chainsaw' - Lilo and Stitch",
		"'Guard, fetch a stable boy quickly I've encountered a giant pile of bull droppings' - The Dragon Prince season 1 episode 5",
		"Breaks down door by taking it off with bear hands and eyes glowing red, 'Could you fetch your manager? I have a few complaints that need to be address personally' - Overlord season 2 episode 9",
		"'Does death count as trouble?' Overlord season 3 episode 7'What kind of fresh hell is this?' - Persona 4 Season 2 episode 7",
		"'Did you really think I'd die just because I was killed?' - Misfit of Demon King Academy",
		"'He's busy being a fool' 'What kind of fool?' 'The everything is now on fire kind' - HELLUVA BOSS - Loo Loo Land // S1: Episode 2",
		"'You still can't get out of bed in the morning?' 'No it holds me hostage' - The Asterisk War Season 1 episode 2",
		"'And how much crime am I gonna want to commit if there is even the slightest possible chance a naked dude will be running at me at Mach 3?' - Quirk Questions 6 (My Hero Academia Animation)",
		"'Oh yo homeboy looks like shark week I ain't messing with that' - Best of Nagisa (50% OFF)",
		"'Yo I said 8 hours minimum. If I don't get my beauty sleep I get real ugly real fast' - Best of Nagisa Part 2 Octopimp",
		"“Cornbread knows my sins, Henry. Cornbread knows what I have done, and he is here to make me atone' - Red, White, and Royal Blue by Casey McQuiston",
		"'Hey Yun, what's up?' 'What's up is my blood pressure' - Yona of the Dawn episode 10",
		"'This isn't war, it's pest control' - Doctor Who Tenth Doctor series",
		"''Arthur you keep chasing them on foot. I'll let you know where their shots come from' 'Well if you use tricky words like left or north I'm not gonna know what you're saying, so make sure you point okay?' 'It's like he's proud of how dumb he is' - Fire Force Season 1 episode 13",
		"'Sorry, it's egg time' - HoriMiya season 1 episode 1",
		"'There out there fighting for their lives and we're in here doing drugs' - Phasmophobia But It's Extremely Hard",
		"What mistake? Pink! - Sherlock A Study in Pink",
    ]
    var index = getRandomInt(quotes.length - 1);
    message.channel.send(quotes[index]);
}


function getRandomInt(max) 
{
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = {motivateme, ce, quote, makemelaugh};