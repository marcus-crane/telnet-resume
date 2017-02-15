const blessed = require('blessed')
const telnet = require('telnet2')

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
                    // Just have a render function for each category
                    updateScreen(bio)
                    screen.render()
                    break
                case 2:
                    updateScreen(skills)
                    screen.render()
                    break
                case 3:
                    updateScreen(work)
                    screen.render()
                    break
                case 4:
                    updateScreen(education)
                    screen.render()
                    break
                case 5:
                    updateScreen(publications)
                    screen.render()
                    break
                // Change this to be return probably
                case 6:
                    updateScreen(mainmenu)
                    screen.render()
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

// I could probably just parse the JSON resume I have instead of hardcoding text
let mainmenu = `Marcus Crane
Web Developer / Hobbyist Programmer
Wellington, NZ

Press 1 for Bio
Press 2 for Skills
Press 3 for Work Experience
Press 4 for Education
Press 5 for Publications

References available upon request
`

let bio = `My bio would go here when this is finished.

Press 6 to go back!
`

let skills = `My skills would go here when this is finished.

Press 6 to go back!
`

let work = `My work experience would go here when this is finished.

Press 6 to go back!
`

let education = `My education would go here when this is finished.

Press 6 to go back!
`

let publications = `My publications would go here when this is finished.

Press 6 to go back!
`
