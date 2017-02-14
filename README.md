## Telnet Resume

The idea for this thing came about after I saw the results of the [Stupid Hackathon Sweden 2017](https://www.stupidhackathon.se/) posted on [Hacker News](https://news.ycombinator.com) yesterday.

The [results](https://docs.google.com/presentation/d/1u-8FGxV2eU5j_SkV61pb9y_lLI-Kh63hwRBxKrHQGCc/edit#slide=id.p) were interesting but I particularly liked the [Teletext Telnet](https://github.com/bonny/text-tv-telnet-server) project on [Slide 23](https://docs.google.com/presentation/d/1u-8FGxV2eU5j_SkV61pb9y_lLI-Kh63hwRBxKrHQGCc/edit#slide=id.g1cd4b357f9_0_435). Thankfully, it's open source and surprisingly, there's very little code.

It does pull from an API but there's very little that actually happens since it's all just text and reading user inputs.

I realised, wow, that's the perfect idea for a resume that no one will ever want to read. On the flipside, maybe it'll be so hard to read that a potential employer would like it but overall, it's just a dumb, fun excuse to mess around with telnet pretty much.

Also, the telnet2 library has 0 documentation so I basically just ES6-ified the Teletext project and started fiddling from there.

## GREAT, HOW DO I USE IT

It's just placeholder stuff at the moment. I should probably be writing job applications instead...

Why are you yelling? Just like any Node project, run `npm start` or `node app.js` and it'll be running.

In order to connect, you'll need to enter the following into your terminal of choice: `telnet localhost 2300`.

### Ummm actually, you're like wrong because like telnet is tooootally Port 23 it says so on Wikipedia

By default, telnet operates on Port 23 but all Unix ports below (and including) 1024 require admin rights to bind stuff to 'em.

A better solution, and what I'll likely end up doing, is redirecting all traffic from Port 23 to Port 2300 and I assume that's what the author of the library intended (because he never documented it!)

I haven't gotten as far as deploying the thing yet but you'll probably want to use something like [forever](https://github.com/foreverjs/forever) or [pm2](http://pm2.keymetrics.io/) since it's designed to run all the time like, well, a server y'know?

## How do I geT TELNET I DON'T HAVE IT

Pffffffbuhhhh uhhhhh let's see if I remember

### Windows users

I think if you're on Windows XP or earlier, chances are you just have telnet if you type the above telnet command into command prompt

If you're running Windows Vista and above, telnet is disabled by default but you can enable it by opening 'Windows Features' which you can find using the Start Menu search.

There should be a checkbox for telnet which you can tick, restart and use command prompt as normal

### macOS users

I feel like I used brew to install it but I'm pretty sure it just ships with telnet out of the box as you'd expect.

For anyone on a super old version of OS X (like 10.1), [this article](https://support.apple.com/kb/TA20443?locale=en_NZ) mentions that at some point, telnet was disabled by default

### Linux users

Pfft, get outta here. I'd be highly surprised if you don't have it outta the box. I double checked my Lubuntu install on my media server and yup, it's there.

### Something something uhhhhh

Yeah well, you can probably just contact me on [Twitter](https://twitter.com/sentreh) but it's just a dumb thing. I don't even know why I write READMEs this long hahah.

At least I can prove I document stuff alright?
