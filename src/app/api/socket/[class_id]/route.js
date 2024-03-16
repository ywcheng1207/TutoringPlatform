import { NextResponse } from 'next/server'
import { Server } from 'socket.io'

// export async function GET(_, { params }) {
//   const classId = params.class_id
//   return NextResponse.json({ test: classId })
// }

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log('Already set up')
    res.end()
    return
  }

  const io = new Server(res.socket.server)
  res.socket.server.io = io

  io.on('connection', (socket) => {
    socket.on('send-message', (obj) => {
      io.emit('receive-message', obj)
    })
  })

  console.log('Setting up socket')
  res.end()
}
