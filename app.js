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
                    screen.data.main.setContent('My bio would go here when this is finished. Press Return to go back!')
                    screen.render()
                    break
                case 2:
                    screen.data.main.setContent('My skills would go here when this is finished. Press Return to go back!')
                    screen.render()
                    break
                case 3:
                    screen.data.main.setContent('My work experience would go here when this is finished. Press Return to go back!')
                    screen.render()
                    break
                case 4:
                    screen.data.main.setContent('My education would go here when this is finished. Press Return to go back!')
                    screen.render()
                    break
                case 5:
                    screen.data.main.setContent('My publications would go here when this is finished. Press Return to go back!')
                    screen.render()
                    break
                // Change this to be return probably
                case 6:
                    screen.data.main.setContent(mainmenu)
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
