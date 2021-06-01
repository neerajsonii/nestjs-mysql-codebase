/**
 * This file contains the code required
 * to define interfaces for Socket related operations.
 */
import socketio from "socket.io";

export interface Socket extends socketio.Socket {
    userIdentity?: any;
}
