import EventBus from '../../scripts/EventBus'
import { availableLangs } from '../../scripts/Lang'
import { TerminalDispatcher, TerminalState } from './terminalState'
import { getBrandString } from './terminalUtils'

export function handleCommand(state: TerminalState, dispatch: TerminalDispatcher, eventBus: EventBus) {
    const [command, ...args] = state.typingText.split(' ')

    dispatch({ type: 'TERMINAL_COMMAND_PREPROCESS' })

    onCommand(command, args, dispatch, eventBus)

    dispatch({ type: 'TERMINAL_PRINTLN', text: '# ' })
}

function onCommand(command: string, args: string[], dispatch: TerminalDispatcher, eventBus: EventBus) {
    function println(text?: string) {
        dispatch({ type: 'TERMINAL_PRINTLN', text: text || '' })
    }   

    switch(command) {
        case 'clear':
        case 'cls':
            dispatch({ type: 'TERMINAL_CLEAR' })
            return

        case 'print':
        case 'echo': {
            let text = args.join(' ')
            if(text.includes('<script>')) {
                   println('no xss here lol')
            }
            println(text)
            return
        }

        case 'reboot':
        case 'reload':
        case 'refresh':
            window.location.reload()
            return

        case 'exit':
        case 'quit':
        case 'close':
            dispatch({ type: 'TERMINAL_TOGGLE' })
            return

        case '':
            return

        case 'ver':
        case 'uname':
        case 'lsb_release':
            println()
            println(getBrandString())
            println()
            return

        case 'startx':
        case 'xserver':
            eventBus.post({id: 'GOTO', data: '/xserver'})
            return

        case 'testing':
            window.location.href = 'https://stuff.ppluss.de/hub.html'
            return

        case 'more':
            eventBus.post({id: 'GOTO', data: '/more'})
            return

        case 'home':
            eventBus.post({id: 'GOTO', data: '/'})
            return

        case 'lang':
        case 'langs':
            if(args[0]) {
                if(availableLangs.includes(args[0])) {
                    eventBus.post({id: 'LANG', data: args[0]})
                } else {
                    println('Invalid language')
                }
            } else {
                println('Available languages: ' + availableLangs.join(', '))
                println('Please note that the terminal will always be in English')
            }
            return

        case 'emptytest':
            println()
            println()
            println()
            println('Working?')
            println()
            println()
            println()
            return

        case 'longtest':
            println('oi3450m3i4c9mji2390cn4329jcmr4i9mji2390cn4329jcmr4i9mji2390cn4329jcmr4iin234rj23i4nrji329im4jvrnj34tcho34htvinhtWorking?')
            return

        case 'socials':
            eventBus.post({id: 'GOTO', data: '/socials'})
            return

        case 'help':
        case 'commands':
            println('==============')
            println('   Commands   ')
            println('==============')
            println()
            println('home, socials, more: Directly jump to a page')
            //println("startx: Start the X-Server");
            println('echo: Just a normal echo command')
            println('ver: Version information')
            println('help: Show this message')
            println('clear: Clear the console')
            println('reload: Refresh the page')
            println('lang: Change the page language')
            println('exit: Close the console')
            return

        case 'host': {
            if(args.length !== 1) {
                println('host <ppluss | vercel | local>')
                return
            }

            let path = window.location.pathname + window.location.search + '#term'

            switch(args[0]) {
                case 'ppluss':
                    window.location.href = 'https://ppluss.de' + path
                    return
                case 'vercel':
                    window.location.href = 'https://vercel.ppluss.de' + path
                    return
                case 'local':
                    window.location.href = 'http://localhost:3000' + path
                    return
                default:
                    println('Error: Unknown host')
                    return
            }
        }

        case 'adri':
            println('ly <3')
            return

        case 'lowercase':
            eventBus.post({id: 'LOWERCASE_TOGGLE'})
            println('UwU')
            return

        case 'command-not-found':
        default:
            println(command + ': command not found')
            return
    }
}
