import { NextResponse } from 'next/server'
import { Server } from 'socket.io'

// export async function GET(_, { params }) {
//   const classId = params.class_id
//   return NextResponse.json({ test: classId })
// }

const SocketHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log('Initializing Socket.IO server...')
    const io = new Server(res.socket.server)

    io.on('connection', (socket) => {
      socket.on('send-message', (obj) => {
        io.emit('receive-message', obj)
      })
    })

    res.socket.server.io = io
  } else {
    console.log('Socket.IO server already initialized.')
  }
  res.end()
}

export default function handler(req, res) {
  try {
    SocketHandler(req, res)
  } catch (error) {
    console.error('Socket.IO error:', error)
    res.status(500).end()
  }
}
