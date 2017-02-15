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
                    updateScreen(mainmenu)
                    break
                default:
                    console.log('Do nothing because that\'s not a valid option!')
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
        width: '75%',
        height: '75%',
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

References available upon request
`

let bio = `${resume.basics.summary}

Press 6 to go back!
`

let skills = `${resume.skills[0].level} ${resume.skills[0].name}

Press 6 to go back!
`

let work = `${resume.work[0].company}

${resume.work[0].summary}

Press 6 to go back!
`

let education = `${resume.education[0].institution}

Press 6 to go back!
`

let publications = `${resume.publications[0].summary}

Press 6 to go back!
`
