'use client'

import { useEffect } from 'react'

export function ChatbotWidget() {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'module'
    script.innerHTML = `
      import { Chatbot } from 'https://unpkg.com/mimin-chatbot-widget-react@latest/dist/chat-widget.js'

      Chatbot.init({
        credentials: {
          apiKey: 'n51I1W5ZNIbyjb9Db35iBRFup',
          username: 'ujiuploadfileexcel',
        },
        theme: {
          button: {
            backgroundColor: '#1b9f1e',
            textColor: '#ffffff',
            iconSrc: 'https://mimin-images.s3.ap-southeast-1.amazonaws.com/testmimin66/account/widget_icon',
            tooltip: 'Ask Mimin',
          },
          chatWindow: {
            isActiveCall: true,
            needAuthentication: false,
            enableRegister: false,
            enableGreating: true,
            header: {
              backgroundColor: '#1b9f1e',
              color: '#ffffff',
              title: 'Ask Mimin',
              description: 'Ngobrol langsung dengan AI, cepat & mudah.',
              avatarSrc: 'https://mimin-images.s3.ap-southeast-1.amazonaws.com/testmimin66/account/widget_avatar_chatbot',
            },
            botMessage: {
              backgroundColor: '#ffffff',
              borderColor: '#4b9d35',
              textColor: '#4b9d35',
            },
            userMessage: {
              backgroundColor: '#4b9d35',
              borderColor: '#ffffff',
              textColor: '#ffffff',
            },
            greating: {
              title: 'Hello',
              description: 'World',
              avatar: 'https://mimin-images.s3.ap-southeast-1.amazonaws.com/testmimin66/account/widget_greeting_avatar',
              color: '#1b9f1e',
            },
            textInput: {
              title: 'Hello',
              borderColor: '#1b9f1e',
              placeholder: 'Enter your message here...',
              backgroundColor: '#1b9f1e',
              sendButtonColor: '#1b9f1e',
              footerText: 'Ada yang bisa saya bantu?',
              footerTextColor: '#fafff9',
            },
          },
        },
      })
    `
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return null
}
