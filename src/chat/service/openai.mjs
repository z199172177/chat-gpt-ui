import { createParser } from "eventsource-parser";
import { setAbortController } from "./abortController.mjs";

export async function* streamAsyncIterable(stream) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

export const fetchBaseUrl = (baseUrl, currentChat) => {
  let api;
  if (currentChat === 0) {
    api = "/wiki/conversation";
  } else if (currentChat === 1) {
    api = "/wiki/chat";
  } else if (currentChat === 2) {
    api = "/wiki/generatorPost";
  } else if (currentChat === 3) {
    api = "/wiki/recommend";
  }
  return baseUrl + api;
};


export const fetchHeaders = (options = {}) => {
  const { organizationId, apiKey } = options;
  return {
    Authorization: "Bearer " + apiKey,
    "Content-Type": "application/json",
    ...(organizationId && { "OpenAI-Organization": organizationId }),
  };
};

export const throwError = async (response) => {
  if (!response.ok) {
    let errorPayload = null;
    try {
      errorPayload = await response.json();
      console.log(errorPayload);
    } catch (e) {
      // ignore
    }
  }
};

export const fetchBody = ({ options = {}, messages = [], currentChat }) => {
  const { top_p, n, max_tokens, temperature, model, stream } = options;
  return {
    currentChat,
    messages,
    stream,
    n: 1,
    ...(model && { model }),
    ...(temperature && { temperature }),
    ...(max_tokens && { max_tokens }),
    ...(top_p && { top_p }),
    ...(n && { n }),
  };
};

export const fetchAction = async ({
  method = "POST",
  messages = [],
  options = {},
  signal,
  currentChat
}) => {
  const { baseUrl, ...rest } = options;
  const url = fetchBaseUrl(baseUrl, currentChat);
  const headers = fetchHeaders({ ...rest });
  const body = JSON.stringify(fetchBody({ messages, options, currentChat }));
  const response = await fetch(url, {
    method,
    headers,
    body,
    signal,
  });
  return response;
};

export const fetchStream = async ({
  options,
  messages,
  currentChat,
  onMessage,
  onEnd,
  onError,
  onStar,
}) => {
  let answer = "";
  const {controller, signal} = setAbortController();
  console.log("signal:", signal);
  console.log("controller:", controller);
  console.log("currentChat:", currentChat);
  const result = await fetchAction({ options, messages, signal, currentChat }).catch(
    (error) => {
      onError && onError(error, controller);
    }
  );
  if (!result) return;
  if (!result.ok) {
    const error = await result.json();
    onError && onError(error);
    return;
  }

  const parser = createParser((event) => {
    if (event.type === "event") {
      if (event.data === "[DONE]") {
        onEnd();
        return;
      }
      let data;
      try {
        data = JSON.parse(event.data);
      } catch (error) {
        return;
      }
      if ("content" in data.choices[0].delta) {
        answer += data.choices[0].delta.content;
        onMessage && onMessage(answer, controller);
      }
    }
  });
  let hasStarted = false;
  for await (const chunk of streamAsyncIterable(result.body)) {
    const str = new TextDecoder().decode(chunk);
    parser.feed(str);
    if (!hasStarted) {
      hasStarted = true;
      onStar && onStar(str, controller);
    }
  }
  await onEnd();
};
