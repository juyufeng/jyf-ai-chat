import { observable } from "mobx";
import { AbortType } from '@/enums/abort-type';

const $store = observable({
  chatting: false,
  abortController: null as AbortController | null,
  setChatting(chatting: boolean) {
    this.chatting = chatting;
  },

  onRequestError: null as ((chatId: string, type: AbortType) => void) | null,

  setOnRequestError(callback: (chatId: string, type: AbortType) => void) {
    this.onRequestError = callback;
  },

  async abortCurrentRequest(chatId: string, type: AbortType) {
    this.abortController?.abort();
    this.abortController = null;
    this.onRequestError?.(chatId, type);
  },

  createAbortController() {
    this.abortController?.abort();
    this.abortController = new AbortController();
    return this.abortController;
  },
  
  get currentAbortController() {
    return this.abortController;
  }
});

export default $store;

