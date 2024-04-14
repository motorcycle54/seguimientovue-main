let portSendMessage = null;
export class IframeChannelService {  

  listenMessage = async() => {
    return new Promise((resolve, reject) => {
      window.addEventListener('message', (event)=>{
        portSendMessage = event.ports.length > 0 ? event.ports[0] : portSendMessage;
        resolve({"message": event.data});      
      })
    })
        
  }
  sendMessage = (message) => {
    if(!portSendMessage){
      return false;
    }
    portSendMessage.postMessage(message);
    return true;
  }
}

