import { useRef } from 'react';
import { useXAgent, useXChat } from "@ant-design/x";
import { baseURL } from "@/configs/index";
import Request from "@/requests/xrequest";
import ReqStore from "@/stores/req-store";
import { getCurrentSelectedChatId } from "@/dbs/table-chat-func";
import { AbortType } from '@/enums/abort-type';
import { useEffect } from 'react';

export const useAIChat = () => {
  const onCompleteRef = useRef<(chatId: string) => void>(() => {});
  const onErrorRef = useRef<(chatId: string, type: AbortType) => void>(() => {});

  useEffect(() => {
    ReqStore.setOnRequestError((chatId: string, type: AbortType) => {
      onErrorRef.current?.(chatId, type);
    });
  }, []);

  const [agent] = useXAgent({
    baseURL: baseURL,
    request: ({ message }, { onUpdate, onError }) => {
      const controller = ReqStore.createAbortController();

      return Request(
        message,
        (data: any) => {
          if (!controller.signal.aborted) {
            onUpdate(data);
            if (!!data.result) {
              // setShowToggleArrow(true);
            }
          }
        },
        controller.signal
      )
        .then(() => {
          console.log("请求完成");
          ReqStore.setChatting(false);
          getCurrentSelectedChatId().then((chatId) => {
            if (chatId) {
              onCompleteRef.current?.(chatId);
            }
          });
        })
        .catch((err) => {
          console.log("请求中断");
          if (err.name !== "AbortError") {
            console.log("请求中断-AbortError");
            onError(err);
          }
        });
    },
  });

  const { onRequest, parsedMessages, setMessages, messages } = useXChat({
    agent,
    parser: (res) => {
      return res;
    },
  });

  return {
    onRequest,
    parsedMessages,
    setMessages,
    messages,
    setOnComplete: (callback: (chatId: string) => void) => {
      onCompleteRef.current = callback;
    },
    setOnError: (callback: (chatId: string, type: AbortType) => void) => {
      onErrorRef.current = callback;
    },
  };
};