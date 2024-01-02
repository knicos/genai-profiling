// server/src/index.ts
import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { generateRandomCode } from './generateRandomCode';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

// Enable CORS for all routes

io.on('connection', (socket: Socket) => {
    console.log('A user connected');

    socket.on('join', (room: string) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    socket.on('createConnection', () => {
        // Generate a new class code and broadcast it to all clients
        const newClassCode = generateRandomCode();
        io.emit('connectionCreated', newClassCode);
    });

    socket.on('message', (data: { room: string; message?: string; candidate?: RTCIceCandidateInit }) => {
        if (data.message) {
            io.to(data.room).emit('message', data.message);
        } else if (data.candidate) {
            io.to(data.room).emit('message', { candidate: data.candidate });
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
