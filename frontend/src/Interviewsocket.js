import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };

    console.log("Init Socket Started");

    // Use process.env for CRA
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    return io(backendUrl, options);
};
