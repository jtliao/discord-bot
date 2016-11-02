import discord
import asyncio
import nltk
import pyowm
from datetime import datetime


client = discord.Client()

@client.event
@asyncio.coroutine
def on_ready():
    print("logged in")


message_map = {"!commands": "Memes: \n!feelsbadman \n!sneakyW \n!sneakyGasm \n!feelsbadmangun \n\n"
                             "Messages: \n!justin \navu \n!top \n!meteos",
               "!feelsbadman": "https://openclipart.org/image/2400px/svg_to_png/222252/feels.png",
               "!sneakyW": "http://66.media.tumblr.com/avatar_a3d04f399583_128.png",
               "!sneakyw": "http://66.media.tumblr.com/avatar_a3d04f399583_128.png",
               "!sneakyGasm": "https://pbs.twimg.com/profile_images/738553087812632576/3IAFLww8.jpg",
               "!sneakygasm": "https://pbs.twimg.com/profile_images/738553087812632576/3IAFLww8.jpg",
               "!feelsbadmangun": "http://memesvault.com/wp-content/uploads/Feels-Bad-Man-Frog-Tumblr-21.jpg",
               "!justin": "top kek m8",
               "!top": "die",
               "!meteos": "Fucking superstar jungler for cloud nine. Yeah 12.7 kda in the s3 summer split."
               }


@client.event
@asyncio.coroutine
def on_message(message):
    if message.content in message_map:
        yield from client.sent_message(message.channel, message_map[message.content])
    if message.content == "!hello":
        time = datetime.now()
        #time_of_day = ""
        if time.hour > 18 or time.hour < 3:
            time_of_day = "evening"
        elif time.hour < 12:
            time_of_day = "morning"
        else:
            time_of_day = "afternoon"
        print(time)
        yield from client.send_message(message.channel, "How's it going " + str(message.author.name) +
                                       "? What a wonderful " + time_of_day + "!")
    if "weather" in message.content:
        if message.content.startswith("what is") or message.content.startswith("whats") or \
                message.content.startswith("what's") or message.content.startswith("how is") or \
                message.content.startswith("hows") or message.content.startswith("how's"):
            temp = get_weather(message.content)
            yield from client.send_message(message.channel, "Looks like there's a low of " + str(temp["temp_min"]) +
                                           " and a high of " + str(temp["temp_max"]) + "!")


def get_weather(msg):
    tokens = nltk.word_tokenize(msg)
    pos_tagged = nltk.pos_tag(tokens)
    ner_tagged = nltk.ne_chunk(pos_tagged, binary=False)

    for tag in ner_tagged:
        try:
            print(tag.label())
            location = tag.label()
        except AttributeError:
            continue

    owm = pyowm.OWM("b0f7f84b2ae844d192ca825d5517245c")
    obs = owm.weather_at_place(location)
    w = obs.get_weather()
    temp = w.get_temperature('fahrenheit')
    return temp


client.run("MjI1MTA2NTE4MTI1NTc2MjE0.CrkOhw.3vZXgSkx7X40tecfaIGrZUPOH5w")
