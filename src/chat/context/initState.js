export const initState = {
  conversation: [],
  current: 0,
  chat: [
    {
      title: "ChatGPT",
      id: 1000000,
      ct: "2023-12-12",
      messages: [
        {
          id: 10000001,
          role: "user",
          sentTime: "1682827639323",
          content: "Hello, I'm ChatGPT! Ask me anything!",
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
          content: "你好，我是一个关于家装百科只是的AI程序",
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
          content: "你好，我可以生成装修方面的文章，请输入文章的简介",
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
          content: "你好，我可以根据你的商品购买记录，为你提供家装产品或服务，请输入你的个人信息。",
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
      baseUrl: "http://localhost:8087",
      organizationId: "",
      temperature: 1,
      model: "gpt-3.5-turbo",
      apiKey: "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",
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
