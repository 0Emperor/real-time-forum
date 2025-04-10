import { persoChat, userBubble } from "./components.js"
import { msg } from "./components.js"
import { sort } from "./sort.js"
export const wschat = () => {
    const socket = new WebSocket("/chat")
    let pChat = persoChat(socket)
    const chat = document.createElement('aside')
    chat.classList.add('leftsec')
    document.body.appendChild(chat)
    document.body.appendChild(pChat)
    window.addEventListener('logout', () => {
        socket.close()
    })
    socket.onmessage = (rm) => {
        let msg = JSON.parse(rm.data)
        HandelSocket(msg, pChat, chat)
    }
}
const HandelSocket = (msg, pChat, chat) => {
    switch (msg.type) {
        case "status":            
            HandleSts(msg,chat,pChat)
            break;
        case "signal":
            HandelSignals(msg)
            break
        case "message":
            HandleMsg(msg, pChat,chat)
            break
        case "clients":
            InitUsers(msg.data, chat,pChat)
            break
        case 'err':
            toast(msg)
            break
        default:
            throw new Error("unrecognized message type");
    }
}
export function toast({err, code}) {
    const toast = document.createElement('div');
    toast.className = `toast ${getCodeCategory(code)}`;
    toast.textContent = code !== 200 ? `Error ${code}: ${err}` : `Success! ${err} Code ${code}`;
    document.body.appendChild(toast);
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove());
    }, 3000);
}

function getCodeCategory(code) {
    if (!code) return 'neutral';
    const firstDigit = Math.floor(code / 100);
    switch (firstDigit) {
        case 2: return 'success';
        case 4: return 'client-error';
        case 5: return 'server-error';
        default: return 'neutral';
    }
}


const HandelSignals = (signal) => {
    let RegisteredSignals = ["typing"]
    if (!RegisteredSignals.includes(signal.content)) {
        throw new Error("unrecognized signal");
    }
    const target = document.body.querySelector(`#${signal.sender}`)
    if (target.classList.contains(signal.content)) {
        return
    }
    target.classList.add(signal.content)
    setTimeout(() => {
        target.classList.remove(signal.content)
    }, 999)
}

const InitUsers = (users, chat,pChat) => {
    console.log(users);
    
    users?.forEach(element => {
        console.log(element);
        
        chat.append(userBubble(element,pChat))
    });
}
const HandleSts = (sender, chat,Chat) => {
    const target = document.body.querySelector(`#${sender.name}`)
    if (!target) {
        target = userBubble(sender,Chat)
        chat.appendChild(target)
        sort()
    } else {
        target.classList.toggle("on")
    }
}
const HandleMsg = (mesg, pChat,chat) => {
    let target = document.querySelector(`#${mesg.sender}`)
    if (pChat.id === mesg.sender) {
       let msgB =msg(mesg,true)
       document.querySelector('.messages').append(msgB)
    }
    chat.prepend(target)
}