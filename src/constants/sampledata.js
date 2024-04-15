export const samplechats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John will",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "will jack",
    _id: "2",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "will jack",
    _id: "3",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "will jack",
    _id: "4",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "will jack",
    _id: "5",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "will jack",
    _id: "6",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "will jack",
    _id: "7",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "will jack",
    _id: "8",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "will jack",
    _id: "9",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "will jack",
    _id: "10",
    groupChat: true,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    name: "John will",
    _id: "1",
  },
  {
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    name: "will jack",
    _id: "2",
  },
];

export const sampleNotofication = [
  {
    sender: {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "John will",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "will jack",
    },
    _id: "2",
  },
];

export const sampleMessage = [
  {
    attachments: [
      {
        public_id: "asdsad",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    // content:"L*uda ka Message hai",
    _id: "qwerty",
    sender: {
      _id: "user._id",
      name: "Chaman",
    },
    chat: "chatId",
    createdAt: "2024-03-12T10:41:30.630Z",
  },
  {
    attachments: [],
    content: "L*uda ka Message hai 2",
    _id: "qwerty 2",
    sender: {
      _id: "saassdssa",
      name: "Chaman 2",
    },
    chat: "chatId",
    createdAt: "2024-03-12T10:41:30.630Z",
  },
];

export const dashboardData = {
  users: [
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "will jack",
      _id: "1",
      username: "will_jack@",
      friends: 20,
      groups: 5,
    },
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "william tack",
      _id: "2",
      username: "willlian tacj_1",
      friends: 22,
      groups: 15,
    },
  ],
  chats: [
    {
      name: "LabadBhass group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: 1,
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalmembers: 2,
      totalmessages: 30,
      creator: {
        name: "John doe",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
    {
      name: "rcb group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: 2,
      groupChat: true,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalmembers: 2,
      totalmessages: 30,
      creator: {
        name: "Virat kohli",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
  ],
  messages:[
    {
      attachments:[],
      content:"Laude ka msg gandu",
      _id:"qwerty",
      sender:{
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name:"Chaman"
      },
      chat: "chatId",groupsChat:false,
    createdAt: "2024-03-12T10:41:30.630Z",
    },
    {
      attachments: [{
        public_id: "asdsad",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      }],
      content: "L*uda ka Message hai 2",
      _id: "qwerty 2",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Chaman 2",
      },
      chat: "chatId",groupsChat:true,
      createdAt: "2024-03-12T10:41:30.630Z",
    },
  ]
};
