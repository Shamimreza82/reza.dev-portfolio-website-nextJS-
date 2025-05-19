import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import React, { useState, useRef } from 'react'
import AIChat from '../test-ai'

// Common transitions
const floatTransition = { duration: 4, repeat: Infinity, ease: 'easeInOut' }

// Animation variants
const bubbleVariants = {
  float: { y: [0, -15, 0], transition: floatTransition },
  hover: { scale: 1.1, transition: { type: 'spring', stiffness: 300 } },
}

const presenceVariants = {
  pulse: { scale: [1, 1.4, 1], opacity: [1, 0.6, 1], transition: { duration: 1.5, repeat: Infinity } },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const panelVariants = {
  hidden: { x: 200, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } },
}

const AiAssistant = () => {
  const [open, setOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you today?', sender: 'bot' }
  ])
  const [input, setInput] = useState('')
  const constraintsRef = useRef(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg = { text: input, sender: 'user' }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    // Simulated bot reply (replace with real API call)
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "I'm here to help!", sender: 'bot' }])
    }, 800)
  }

  return (
    <div ref={constraintsRef} className="fixed bottom-8 lg:right-8 right-4 z-50 flex flex-col items-end">
      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          // <motion.div
          //   className="mb-4 w-72 h-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col overflow-hidden"
          //   variants={panelVariants}
          //   initial="hidden"
          //   animate="visible"
          //   exit="hidden"
          // >
          //   {/* Messages */}
          //   <div className="flex-1 p-3 overflow-y-auto space-y-2">
          //     {messages.map((m, i) => (
          //       <div
          //         key={i}
          //         className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          //       >
          //         <span
          //           className={`inline-block px-3 py-2 rounded-lg max-w-xs whitespace-pre-wrap break-words
          //             ${m.sender === 'user'
          //               ? 'bg-blue-600 text-white'
          //               : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`
          //         }
          //         >
          //           {m.text}
          //         </span>
          //       </div>
          //     ))}
          //   </div>
          //   {/* Input */}
          //   <div className="flex p-2 border-t border-gray-200 dark:border-gray-700">
          //     <input
          //       type="text"
          //       value={input}
          //       onChange={e => setInput(e.target.value)}
          //       onKeyDown={e => e.key === 'Enter' && sendMessage()}
          //       placeholder="Type a message..."
          //       className="flex-1 rounded-full border px-3 py-2 focus:outline-none focus:ring"
          //     />
          //     <button
          //       onClick={sendMessage}
          //       className="ml-2 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full focus:outline-none"
          //     >
          //       Send
          //     </button>
          //   </div>
          // </motion.div>
          <AIChat/>
        )
        
        }
      </AnimatePresence>

      {/* Draggable Bubble */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.3}
        onClick={() => setOpen(prev => !prev)}
        variants={bubbleVariants}
        initial="float"
        animate="float"
        whileHover="hover"
        whileTap={{ scale: 0.9 }}
        className="relative cursor-pointer"
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
      >
        <motion.div
          className="h-20 w-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl"
          variants={bubbleVariants}
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-10 w-10 text-white" />
        </motion.div>
        <motion.span
          className="absolute top-1 right-1 h-3 w-3 bg-green-400 rounded-full"
          variants={presenceVariants}
          animate="pulse"
        />
      </motion.div>
    </div>
  )
}

export default AiAssistant
