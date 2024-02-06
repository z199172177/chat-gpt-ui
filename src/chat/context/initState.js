export const initState = {
  conversation: [],
  current: 0,
  chat: [
    {
      title: "原生 ChatGPT",
      id: 1000000,
      ct: "2023-12-12",
      messages: [
        {
          id: 10000001,
          role: "user",
          sentTime: "1682827639323",
          content: "你好，我是原生的ChatGPT，你可以问我任何问题，我会用流式会话的方式响应",
        },
      ],
    },
    {
      title: "家装百科问答",
      ct: "2023-12-12",
      id: 2000000,
      messages: [
        {
          id: 20000001,
          role: "user",
          sentTime: "1682827639313",
          content: "你好，我是一个关于家装百科只是的AI程序，你可以问我关于家居家装相关的问题，我会根据本地资料库的内容回答你的提问题。回答过程需要一点时间，请耐心等待。",
        }
      ],
    },
    {
      title: "家装文章生成",
      ct: "2032-12-23",
      id: 3000000,
      messages: [
        {
          id: 30000001,
          role: "user",
          sentTime: "1682827639313",
          content: "你好，我可以生成装修方面的文章，请告诉你对文章的要求，包括文章标题、内容关键字、文章简介说明等。",
        }
      ],
    },
    {
      title: "家装产品推荐",
      ct: "2032-12-23",
      id: 4000000,
      messages: [
        {
          id: 40000001,
          role: "user",
          sentTime: "1682827639313",
          content: "你好，我可以根据你的商品购买记录，为你提供家装产品或服务，请输入推荐信息的关键字。例如：卧室、装修、小电器。",
        }
      ],
    },
  ],
  currentChat: 0,
  options: {
    account: {
      name: "CHAT——AI",
      avatar: "",
    },
    general: {
      language: "English",
      theme: "light",
      command: "COMMAND_ENTER",
      size: "normal",
    },
    openai: {
      baseUrl: "http://11.142.39.76",
      // baseUrl: "http://localhost:8087",
      organizationId: "",
      temperature: 1,
      model: "gpt-3.5-turbo",
      apiKey: "sk-",
      max_tokens: 2048,
      n: 1,
      stream: true,
    },
  },
  is: {
    typeing: false,
    config: false,
    fullScreen: true,
    sidebar: true,
    inputing: false,
    thinking: false,
  },
  typeingMessage: {},
  version: "0.1.0",
  cotent: "",
};
