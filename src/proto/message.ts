// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               v5.29.3
// source: src/proto/message.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "proto";

export enum MessageType {
  UNKNOWN = 0,
  ERROR = 1,
  CHAT = 2,
  STATUS = 3,
  CHECK_STATUS = 4,
  EXPIRED = 5,
  CURRENT = 6,
  MOVIES = 7,
  VIEWER_COUNT = 8,
  SYNC = 9,
  MY_STATUS = 10,
  WEBRTC_OFFER = 11,
  WEBRTC_ANSWER = 12,
  WEBRTC_ICE_CANDIDATE = 13,
  WEBRTC_JOIN = 14,
  WEBRTC_LEAVE = 15,
  UNRECOGNIZED = -1,
}

export function messageTypeFromJSON(object: any): MessageType {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return MessageType.UNKNOWN;
    case 1:
    case "ERROR":
      return MessageType.ERROR;
    case 2:
    case "CHAT":
      return MessageType.CHAT;
    case 3:
    case "STATUS":
      return MessageType.STATUS;
    case 4:
    case "CHECK_STATUS":
      return MessageType.CHECK_STATUS;
    case 5:
    case "EXPIRED":
      return MessageType.EXPIRED;
    case 6:
    case "CURRENT":
      return MessageType.CURRENT;
    case 7:
    case "MOVIES":
      return MessageType.MOVIES;
    case 8:
    case "VIEWER_COUNT":
      return MessageType.VIEWER_COUNT;
    case 9:
    case "SYNC":
      return MessageType.SYNC;
    case 10:
    case "MY_STATUS":
      return MessageType.MY_STATUS;
    case 11:
    case "WEBRTC_OFFER":
      return MessageType.WEBRTC_OFFER;
    case 12:
    case "WEBRTC_ANSWER":
      return MessageType.WEBRTC_ANSWER;
    case 13:
    case "WEBRTC_ICE_CANDIDATE":
      return MessageType.WEBRTC_ICE_CANDIDATE;
    case 14:
    case "WEBRTC_JOIN":
      return MessageType.WEBRTC_JOIN;
    case 15:
    case "WEBRTC_LEAVE":
      return MessageType.WEBRTC_LEAVE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MessageType.UNRECOGNIZED;
  }
}

export function messageTypeToJSON(object: MessageType): string {
  switch (object) {
    case MessageType.UNKNOWN:
      return "UNKNOWN";
    case MessageType.ERROR:
      return "ERROR";
    case MessageType.CHAT:
      return "CHAT";
    case MessageType.STATUS:
      return "STATUS";
    case MessageType.CHECK_STATUS:
      return "CHECK_STATUS";
    case MessageType.EXPIRED:
      return "EXPIRED";
    case MessageType.CURRENT:
      return "CURRENT";
    case MessageType.MOVIES:
      return "MOVIES";
    case MessageType.VIEWER_COUNT:
      return "VIEWER_COUNT";
    case MessageType.SYNC:
      return "SYNC";
    case MessageType.MY_STATUS:
      return "MY_STATUS";
    case MessageType.WEBRTC_OFFER:
      return "WEBRTC_OFFER";
    case MessageType.WEBRTC_ANSWER:
      return "WEBRTC_ANSWER";
    case MessageType.WEBRTC_ICE_CANDIDATE:
      return "WEBRTC_ICE_CANDIDATE";
    case MessageType.WEBRTC_JOIN:
      return "WEBRTC_JOIN";
    case MessageType.WEBRTC_LEAVE:
      return "WEBRTC_LEAVE";
    case MessageType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Sender {
  userId: string;
  username: string;
}

export interface Status {
  isPlaying: boolean;
  currentTime: number;
  playbackRate: number;
}

export interface WebRTCData {
  data: string;
  to: string;
  from: string;
}

export interface Message {
  type: MessageType;
  timestamp: number;
  sender?: Sender | undefined;
  errorMessage?: string | undefined;
  chatContent?: string | undefined;
  playbackStatus?: Status | undefined;
  expirationId?: number | undefined;
  viewerCount?: number | undefined;
  webrtcData?: WebRTCData | undefined;
}

function createBaseSender(): Sender {
  return { userId: "", username: "" };
}

export const Sender: MessageFns<Sender> = {
  encode(message: Sender, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.username !== "") {
      writer.uint32(18).string(message.username);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Sender {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSender();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.username = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Sender {
    return {
      userId: isSet(object.userId) ? globalThis.String(object.userId) : "",
      username: isSet(object.username) ? globalThis.String(object.username) : "",
    };
  },

  toJSON(message: Sender): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Sender>, I>>(base?: I): Sender {
    return Sender.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Sender>, I>>(object: I): Sender {
    const message = createBaseSender();
    message.userId = object.userId ?? "";
    message.username = object.username ?? "";
    return message;
  },
};

function createBaseStatus(): Status {
  return { isPlaying: false, currentTime: 0, playbackRate: 0 };
}

export const Status: MessageFns<Status> = {
  encode(message: Status, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.isPlaying !== false) {
      writer.uint32(8).bool(message.isPlaying);
    }
    if (message.currentTime !== 0) {
      writer.uint32(17).double(message.currentTime);
    }
    if (message.playbackRate !== 0) {
      writer.uint32(25).double(message.playbackRate);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Status {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.isPlaying = reader.bool();
          continue;
        }
        case 2: {
          if (tag !== 17) {
            break;
          }

          message.currentTime = reader.double();
          continue;
        }
        case 3: {
          if (tag !== 25) {
            break;
          }

          message.playbackRate = reader.double();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Status {
    return {
      isPlaying: isSet(object.isPlaying) ? globalThis.Boolean(object.isPlaying) : false,
      currentTime: isSet(object.currentTime) ? globalThis.Number(object.currentTime) : 0,
      playbackRate: isSet(object.playbackRate) ? globalThis.Number(object.playbackRate) : 0,
    };
  },

  toJSON(message: Status): unknown {
    const obj: any = {};
    if (message.isPlaying !== false) {
      obj.isPlaying = message.isPlaying;
    }
    if (message.currentTime !== 0) {
      obj.currentTime = message.currentTime;
    }
    if (message.playbackRate !== 0) {
      obj.playbackRate = message.playbackRate;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Status>, I>>(base?: I): Status {
    return Status.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Status>, I>>(object: I): Status {
    const message = createBaseStatus();
    message.isPlaying = object.isPlaying ?? false;
    message.currentTime = object.currentTime ?? 0;
    message.playbackRate = object.playbackRate ?? 0;
    return message;
  },
};

function createBaseWebRTCData(): WebRTCData {
  return { data: "", to: "", from: "" };
}

export const WebRTCData: MessageFns<WebRTCData> = {
  encode(message: WebRTCData, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.data !== "") {
      writer.uint32(10).string(message.data);
    }
    if (message.to !== "") {
      writer.uint32(18).string(message.to);
    }
    if (message.from !== "") {
      writer.uint32(26).string(message.from);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): WebRTCData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWebRTCData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.data = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.to = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.from = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WebRTCData {
    return {
      data: isSet(object.data) ? globalThis.String(object.data) : "",
      to: isSet(object.to) ? globalThis.String(object.to) : "",
      from: isSet(object.from) ? globalThis.String(object.from) : "",
    };
  },

  toJSON(message: WebRTCData): unknown {
    const obj: any = {};
    if (message.data !== "") {
      obj.data = message.data;
    }
    if (message.to !== "") {
      obj.to = message.to;
    }
    if (message.from !== "") {
      obj.from = message.from;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WebRTCData>, I>>(base?: I): WebRTCData {
    return WebRTCData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WebRTCData>, I>>(object: I): WebRTCData {
    const message = createBaseWebRTCData();
    message.data = object.data ?? "";
    message.to = object.to ?? "";
    message.from = object.from ?? "";
    return message;
  },
};

function createBaseMessage(): Message {
  return {
    type: 0,
    timestamp: 0,
    sender: undefined,
    errorMessage: undefined,
    chatContent: undefined,
    playbackStatus: undefined,
    expirationId: undefined,
    viewerCount: undefined,
    webrtcData: undefined,
  };
}

export const Message: MessageFns<Message> = {
  encode(message: Message, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.timestamp !== 0) {
      writer.uint32(17).sfixed64(message.timestamp);
    }
    if (message.sender !== undefined) {
      Sender.encode(message.sender, writer.uint32(26).fork()).join();
    }
    if (message.errorMessage !== undefined) {
      writer.uint32(34).string(message.errorMessage);
    }
    if (message.chatContent !== undefined) {
      writer.uint32(42).string(message.chatContent);
    }
    if (message.playbackStatus !== undefined) {
      Status.encode(message.playbackStatus, writer.uint32(50).fork()).join();
    }
    if (message.expirationId !== undefined) {
      writer.uint32(57).fixed64(message.expirationId);
    }
    if (message.viewerCount !== undefined) {
      writer.uint32(64).int64(message.viewerCount);
    }
    if (message.webrtcData !== undefined) {
      WebRTCData.encode(message.webrtcData, writer.uint32(74).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Message {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        }
        case 2: {
          if (tag !== 17) {
            break;
          }

          message.timestamp = longToNumber(reader.sfixed64());
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.sender = Sender.decode(reader, reader.uint32());
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.errorMessage = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }

          message.chatContent = reader.string();
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }

          message.playbackStatus = Status.decode(reader, reader.uint32());
          continue;
        }
        case 7: {
          if (tag !== 57) {
            break;
          }

          message.expirationId = longToNumber(reader.fixed64());
          continue;
        }
        case 8: {
          if (tag !== 64) {
            break;
          }

          message.viewerCount = longToNumber(reader.int64());
          continue;
        }
        case 9: {
          if (tag !== 74) {
            break;
          }

          message.webrtcData = WebRTCData.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Message {
    return {
      type: isSet(object.type) ? messageTypeFromJSON(object.type) : 0,
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0,
      sender: isSet(object.sender) ? Sender.fromJSON(object.sender) : undefined,
      errorMessage: isSet(object.errorMessage) ? globalThis.String(object.errorMessage) : undefined,
      chatContent: isSet(object.chatContent) ? globalThis.String(object.chatContent) : undefined,
      playbackStatus: isSet(object.playbackStatus) ? Status.fromJSON(object.playbackStatus) : undefined,
      expirationId: isSet(object.expirationId) ? globalThis.Number(object.expirationId) : undefined,
      viewerCount: isSet(object.viewerCount) ? globalThis.Number(object.viewerCount) : undefined,
      webrtcData: isSet(object.webrtcData) ? WebRTCData.fromJSON(object.webrtcData) : undefined,
    };
  },

  toJSON(message: Message): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = messageTypeToJSON(message.type);
    }
    if (message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    if (message.sender !== undefined) {
      obj.sender = Sender.toJSON(message.sender);
    }
    if (message.errorMessage !== undefined) {
      obj.errorMessage = message.errorMessage;
    }
    if (message.chatContent !== undefined) {
      obj.chatContent = message.chatContent;
    }
    if (message.playbackStatus !== undefined) {
      obj.playbackStatus = Status.toJSON(message.playbackStatus);
    }
    if (message.expirationId !== undefined) {
      obj.expirationId = Math.round(message.expirationId);
    }
    if (message.viewerCount !== undefined) {
      obj.viewerCount = Math.round(message.viewerCount);
    }
    if (message.webrtcData !== undefined) {
      obj.webrtcData = WebRTCData.toJSON(message.webrtcData);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Message>, I>>(base?: I): Message {
    return Message.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Message>, I>>(object: I): Message {
    const message = createBaseMessage();
    message.type = object.type ?? 0;
    message.timestamp = object.timestamp ?? 0;
    message.sender = (object.sender !== undefined && object.sender !== null)
      ? Sender.fromPartial(object.sender)
      : undefined;
    message.errorMessage = object.errorMessage ?? undefined;
    message.chatContent = object.chatContent ?? undefined;
    message.playbackStatus = (object.playbackStatus !== undefined && object.playbackStatus !== null)
      ? Status.fromPartial(object.playbackStatus)
      : undefined;
    message.expirationId = object.expirationId ?? undefined;
    message.viewerCount = object.viewerCount ?? undefined;
    message.webrtcData = (object.webrtcData !== undefined && object.webrtcData !== null)
      ? WebRTCData.fromPartial(object.webrtcData)
      : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(int64: { toString(): string }): number {
  const num = globalThis.Number(int64.toString());
  if (num > globalThis.Number.MAX_SAFE_INTEGER) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  if (num < globalThis.Number.MIN_SAFE_INTEGER) {
    throw new globalThis.Error("Value is smaller than Number.MIN_SAFE_INTEGER");
  }
  return num;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
