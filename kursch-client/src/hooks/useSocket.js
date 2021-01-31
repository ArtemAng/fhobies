import { useState, useCallback } from 'react';

export const useHttp = () => {
    const [socket, setSocketIo] = useState(null);

    const setSocket = (value) => setSocketIo(value);

    return { socket, setSocket }
}