import { XStream } from "@ant-design/x";
import { baseURL } from "@/configs";
import Store from "@/stores/chat-store";
import { getQueryParams } from  "@/utils/common"

export interface EventResult {
  isBack: boolean;
  result: string;
  sessionId: string;
  thoughts_result?: string;
  thoughts_status?: number; // 0未思考 1思考中 2思考结束
  cot: Array<string>;
}

// 缓存Token解析函数，避免重复创建
const getToken = () => {
  let cachedToken: string | null = null;
  return () => {
    if (cachedToken !== null) return cachedToken;
    try {
      const token = getQueryParams("Token");
      cachedToken = typeof token === 'string' ? decodeURIComponent(token) : '';
      return cachedToken;
    } catch (error) {
      console.error('Token解析失败:', error);
      return '';
    }
  };
};

// 创建一个单例Token获取器
const tokenGetter = getToken();

// 使用 WeakMap 缓存解析结果
const chunkCache = new WeakMap();

async function Request(
  prompt: string | undefined,
  onProgress: (data: EventResult) => void,
  singal: AbortSignal
) {
  const session_id = Store.activeChatSessionId || '';
  const body = {
    inputs: {},
    query: prompt,
    response_mode: "streaming",
    conversation_id: session_id,
    user: getQueryParams('Uid'),
    files: [],
    parameters: {
      incremental_output: true,
      has_thoughts: true,
    },
  };
 
  const response = await fetch(baseURL, {
    method: "POST",
    signal: singal,
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      Authorization: `Bearer ${tokenGetter()}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.body) {
    return;
  }

  const finalResult: EventResult = {
    result: "",
    sessionId: "",
    thoughts_result: "",
    thoughts_status: 0,
    isBack: false,
    cot: []
  };

  for await (const chunk of XStream({
    readableStream: response.body || new ReadableStream(),
  })) {
    if (singal.aborted) break;
    if (!chunk?.data) continue;
    
    try {
      // 使用缓存避免重复解析相同的chunk
      let parsedData = chunkCache.get(chunk);
      if (!parsedData) {
        parsedData = JSON.parse(chunk.data);
        chunkCache.set(chunk, parsedData);
      }
      
      const { event, conversation_id: sessionId, answer: text = '', metadata } = parsedData;
      
      if (event == "message_end") {
        if (finalResult.thoughts_status == 1) {
          finalResult.thoughts_status = 2;
        }
      }

      if (metadata?.node_type == "knowledge-retrieval") {
        if (event == "node_finished") {
          metadata.inputs?.query && finalResult.cot.push("检索:" + metadata.inputs.query);
        }
      }

      if (event != "message") continue;
      
      finalResult.isBack = true;
      let result = text;
      
      if (finalResult.thoughts_status == 0 && text?.startsWith('<think>\n')) {
        finalResult.thoughts_status = 1;
        result = text.slice(8); // trim prefix
      }
      
      if (finalResult.thoughts_status == 1 && text?.includes('\n</think>')) {
        finalResult.thoughts_status = 2;
        const parts = text.split('\n</think>');
        finalResult.thoughts_result += parts[0];
        result = parts.length > 1 ? parts[1] : '';
      }

      if (finalResult.thoughts_status == 1) {
        finalResult.thoughts_result += result;
      } else {
        finalResult.result += result;
      }

      if (sessionId && sessionId != finalResult.sessionId) {
        finalResult.sessionId = sessionId;
        Store.setActiveChatSessionId(finalResult.sessionId);
      }

      onProgress({ ...finalResult });
      
    } catch (e) {
      console.warn("解析失败 " + chunk, e);
    }
  }

  return finalResult;
}

// 导出缓存版本的请求函数
export default Request;
