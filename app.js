const blessed = require('blessed')
const telnet = require('telnet2')
const fs = require('fs')

const resume = JSON.parse(fs.readFileSync('./resume.json', 'utf-8'))

console.log('Listening on Port 2300')

telnet({ tty: true }, (client) => {
    client.on('term', (terminal) => {
        screen.terminal = terminal
        screen.render()
    })

    client.on('size', (width, height) => {
        client.columns = width
        client.rows = height
        client.emit('resize')
    })

    client.on('data', (input) => {
        let command = input.toString('utf8')
        // buffer 0d is return
        console.log(command)

        if (!isNaN(command)) {
            switch(parseInt(command)) {
                case 1:
                    updateScreen(bio)
                    break
                case 2:
                    updateScreen(skills)
                    break
                case 3:
                    updateScreen(work)
                    break
                case 4:
                    updateScreen(education)
                    break
                case 5:
                    updateScreen(publications)
                    break
                // Change this to be return probably
                case 6:
                    updateScreen(contacts)
                    break
                case 7:
                case 8:
                case 9:
                case 0:
                    break
                default:
                    updateScreen(mainmenu)
                    break
            }
        }

    })

    const screen = blessed.screen({
        smartCSR: true,
        input: client,
        output: client,
        terminal: 'xterm-256color',
        fullUnicode: true
    })

    client.on('close', () => {
        if (!screen.destroyed) {
            screen.destroy()
        }
    })

    screen.key(['C-c', 'q'], (ch, key) => {
        screen.destroy()
    })

    screen.on('destroy', () => {
        if (client.writable) {
            client.destroy()
        }
    })

    screen.data.main = blessed.box({
        parent: screen,
        left: 'center',
        top: 'center',
        width: '95%',
        height: '95%',
        border: 'line',
        content: mainmenu
    })

    const updateScreen = (content) => {
        screen.data.main.setContent(content)
        screen.render()
    }

    screen.render()
}).listen(2300)

let mainmenu = `${resume.basics.name}

${resume.basics.label}
${resume.basics.location.city}, ${resume.basics.location.countryCode}

Press 1 for Bio
Press 2 for Skills
Press 3 for Work Experience
Press 4 for Education
Press 5 for Publications
Press 6 for Contact Details

References available upon request
`

let bio = `Personal Bio
============

${resume.basics.summary}

Press Return to go back
`

let skills = `Skills
======

${resume.skills[0].name} - ${resume.skills[0].level}
${resume.skills[0].keywords}

${resume.skills[1].name} - ${resume.skills[1].level}
${resume.skills[1].keywords}

${resume.skills[2].name} - ${resume.skills[2].level}
${resume.skills[2].keywords}

${resume.skills[3].name} - ${resume.skills[3].level}
${resume.skills[3].keywords}

Press Return to go back
`

let work = `Work Experience
===============

${resume.work[0].position} @ ${resume.work[0].company}
${resume.work[0].startDate} - ${resume.work[0].endDate}

${resume.work[0].summary}

${resume.work[1].position} @ ${resume.work[1].company}
${resume.work[1].startDate} - ${resume.work[1].endDate}

${resume.work[1].summary}

Press Return to go back
`

let education = `Education
=========

Studied ${resume.education[0].area} at ${resume.education[0].institution}
${resume.education[0].startDate} - ${resume.education[0].endDate}

${resume.education[0].courses}

Press Return to go back
`

let publications = `Publications
============

${resume.publications[0].name} published by ${resume.publications[0].publisher}

${resume.publications[0].summary}

Available at ${resume.publications[0].website}

Press Return to go back
`

let contacts = `Contact Details
===============

Email: ${resume.basics.email}
Phone: ${resume.basics.phone}

Profiles
========
${resume.basics.profiles[0].network}: ${resume.basics.profiles[0].username}
${resume.basics.profiles[1].network}: ${resume.basics.profiles[1].username}
${resume.basics.profiles[2].network}: ${resume.basics.profiles[2].username}

Press Return to go back
`
