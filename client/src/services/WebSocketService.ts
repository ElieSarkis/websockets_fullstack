import { Socket, io, ManagerOptions } from 'socket.io-client';
import { EventEmitter } from 'events';

class WebSocketService extends EventEmitter {
  private socket: Socket | null = null;
  private connectionDeferred: boolean = false;

  constructor() {
    super();
  }

  private initializeSocket(): void {
    if (!this.socket) {
      const managerOptions: Partial<ManagerOptions> = {
        autoConnect: false,
      };
      this.socket = io('http://localhost:3001', managerOptions);
      this.socket.on('connect', () => {
        console.log('WebSocket connection established');
      });
      this.socket.on('disconnect', () => {
        console.log('WebSocket connection closed');
      });

      this.socket.on('newBooking', (data) => {
        this.emit('newBooking', data);
      });
    }
  }

  connect(): void {
    this.initializeSocket();
    if (this.socket) {
      this.socket.connect();
    } else {
      this.connectionDeferred = true;
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  on(eventName: string, callback: (...args: any[]) => void): this {
    this.initializeSocket();
    super.on(eventName, callback);
    return this;
  }

  off(eventName: string, callback?: (...args: any[]) => void): this {
    this.initializeSocket();
    if (callback) {
      super.off(eventName, callback);
    } else {
      this.removeAllListeners(eventName);
    }
    return this;
  }

  isConnectionDeferred(): boolean {
    return this.connectionDeferred;
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
