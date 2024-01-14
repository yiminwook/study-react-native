import { useCallback } from 'react';
import { Socket, io } from 'socket.io-client';
import { API_URL } from '../consts';

/** 전역변수 */
let socket: Socket | undefined;

const useSocket = (): [Socket | undefined, () => void] => {
  const disConnect = useCallback(() => {
    if (socket) {
      socket = undefined;
    }
  }, []);

  if (!socket) {
    socket = io(`${API_URL}`, {
      transports: ['websocket'],
    });
  }

  return [socket, disConnect];
};

export default useSocket;
