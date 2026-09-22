export type BaristaRecommendation = {
  label: string;
  menuItemId?: string;
  name?: string;
  price?: number;
};

export type BaristaReply = {
  userMessage: string;
  reply: string;
  recommendations?: BaristaRecommendation[];
};

function rec(
  name: string,
  price: number,
  menuItemId: string,
): BaristaRecommendation {
  return {
    name,
    price,
    menuItemId,
    label: `View ${name} · ${price} ETB`,
  };
}

export const MOOD_REPLIES: Record<string, BaristaReply> = {
  Tired: {
    userMessage: "I'm feeling tired what should I order?",
    reply:
      "When you're tired, a bold **Espresso** for 250 ETB can give you a quick lift. You could also try a **Latte (Hot)** for 500 ETB for something smooth and comforting.",
    recommendations: [
      rec("espresso", 250, "menu-item-bc-espresso"),
      rec("latte (hot)", 500, "menu-item-mc-latte-hot"),
    ],
  },
  Stressed: {
    userMessage: "I'm feeling stressed what should I order?",
    reply:
      "Take a breather with something refreshing. A **Classic Mojito** for 600 ETB or **Iced Americano** for 300 ETB might help you reset.",
    recommendations: [
      rec("classic mojito", 600, "menu-item-ref-mojito-classic"),
      rec("iced americano", 300, "menu-item-bc-iced-americano"),
    ],
  },
  Happy: {
    userMessage: "I'm feeling happy what should I order?",
    reply:
      "I'm glad to hear that! How about trying our refreshing **Mango Cream Smoothie** for 550 ETB? It's a delightful treat that can enhance your happy mood. Pair it with a **Cheese Omelette Croissant** for a satisfying snack at 750 ETB.",
    recommendations: [
      rec("mango cream smoothie", 550, "menu-item-6d8fde98-3f09-4ab1-8975-80bc9e5d4108"),
      rec(
        "cheese omelette croissant",
        750,
        "menu-item-4d907f6d-f316-48c8-b67b-0bd94e839b62",
      ),
    ],
  },
  "A bit down": {
    userMessage: "I'm feeling a bit down what should I order?",
    reply:
      "Something warm and gentle can help. Try a **Cappuccino** for 550 ETB or **Honey Cake** for 570 ETB — small comforts go a long way.",
    recommendations: [
      rec("cappuccino", 550, "menu-item-mc-cappuccino"),
      rec("honey cake", 570, "menu-item-pa-honey"),
    ],
  },
  "Need focus": {
    userMessage: "I need focus what should I order?",
    reply:
      "For focus, go for a clean caffeine hit. An **Espresso** for 250 ETB or an **Americano** for 250 ETB keeps things simple and sharp.",
    recommendations: [
      rec("espresso", 250, "menu-item-bc-espresso"),
      rec("americano", 250, "menu-item-bc-americano"),
    ],
  },
};

export const QUICK_QUESTION_REPLIES: Record<string, BaristaReply> = {
  Hours: {
    userMessage: "What are your opening hours?",
    reply:
      "Adorsi Coffee is open daily from 07:00 to 21:00. We look forward to welcoming you!",
  },
  Location: {
    userMessage: "Where is Adorsi Coffee located?",
    reply:
      "Adorsi Coffee is located in Addis Ababa, Ethiopia. If you have any more questions or need help with our menu, feel free to ask!",
  },
  Contact: {
    userMessage: "How can I reach you by phone or social media?",
    reply:
      "You can reach us by phone at +251 945428888. For updates and to connect with us, follow us on Instagram at [Adorsi Coffee](https://www.instagram.com/adorsicoffee?igsh=cTlkazQ0ZWVja2Rv). We look forward to hearing from you!",
  },
  Events: {
    userMessage: "Do you have any upcoming events I can attend?",
    reply:
      "You can check out our upcoming events by visiting the Events page on our website at adorsispecialtycoffee.com/events. We look forward to seeing you there!",
  },
  Fasting: {
    userMessage: "What fasting options do you have?",
    reply:
      "You can enjoy several fasting options, including the Fasting Macchiato for 510 ETB, Fasting Piccolo for 510 ETB, or the Fasting Flat White for 700 ETB. These drinks are made with oat, almond, or coconut milk, aligning perfectly with fasting requirements.",
    recommendations: [
      rec("Fasting Macchiato", 510, "menu-item-f-macchiato"),
      rec("Fasting Piccolo", 510, "menu-item-f-piccolo"),
      rec("Fasting Flat White", 700, "menu-item-f-flatwhite"),
    ],
  },
  Ceremony: {
    userMessage: "Tell me about your Ethiopian coffee ceremony.",
    reply:
      "At Adorsi Coffee, we celebrate the traditional Ethiopian coffee ceremony, a beautiful ritual that honors coffee's rich heritage. This involves roasting green coffee beans, grinding them, and brewing freshly made coffee in a special pot known as a \"jebena.\" It's a communal experience, often accompanied by the sharing of stories, and the aroma of the freshly brewed coffee fills the air, creating a warm atmosphere. If you're interested in experiencing this, please check our Events page for details on upcoming ceremonies!",
  },
};

const UNRECOGNIZED_TEXT_REPLY =
  "It seems there was a typo in your message. How can I assist you today? If you have questions about our drinks or menu items, just let me know!";

export function replyFromFreeText(text: string): BaristaReply {
  const lower = text.toLowerCase();

  if (lower.includes("tired")) {
    return {
      userMessage: text,
      reply: MOOD_REPLIES.Tired.reply,
      recommendations: MOOD_REPLIES.Tired.recommendations,
    };
  }
  if (lower.includes("focus")) {
    return {
      userMessage: text,
      reply: MOOD_REPLIES["Need focus"].reply,
      recommendations: MOOD_REPLIES["Need focus"].recommendations,
    };
  }
  if (lower.includes("happy")) {
    return {
      userMessage: text,
      reply: MOOD_REPLIES.Happy.reply,
      recommendations: MOOD_REPLIES.Happy.recommendations,
    };
  }
  if (lower.includes("stress")) {
    return {
      userMessage: text,
      reply: MOOD_REPLIES.Stressed.reply,
      recommendations: MOOD_REPLIES.Stressed.recommendations,
    };
  }
  if (lower.includes("fasting")) {
    return {
      userMessage: text,
      reply: QUICK_QUESTION_REPLIES.Fasting.reply,
      recommendations: QUICK_QUESTION_REPLIES.Fasting.recommendations,
    };
  }
  if (lower.includes("hour") || lower.includes("open")) {
    return {
      userMessage: text,
      reply: QUICK_QUESTION_REPLIES.Hours.reply,
    };
  }
  if (lower.includes("location") || lower.includes("where")) {
    return {
      userMessage: text,
      reply: QUICK_QUESTION_REPLIES.Location.reply,
    };
  }
  if (
    lower.includes("contact") ||
    lower.includes("phone") ||
    lower.includes("instagram")
  ) {
    return {
      userMessage: text,
      reply: QUICK_QUESTION_REPLIES.Contact.reply,
    };
  }
  if (lower.includes("event")) {
    return {
      userMessage: text,
      reply: QUICK_QUESTION_REPLIES.Events.reply,
    };
  }
  if (lower.includes("ceremony") || lower.includes("jebena")) {
    return {
      userMessage: text,
      reply: QUICK_QUESTION_REPLIES.Ceremony.reply,
    };
  }
  if (lower.includes("cold") || lower.includes("iced")) {
    return {
      userMessage: text,
      reply:
        "For something cold, try an **Iced Latte** for 500 ETB or a **Mango Cloud** for 750 ETB — both are refreshing picks.",
      recommendations: [
        rec("latte (iced)", 500, "menu-item-mc-latte-iced"),
        rec("mango cloud (iced)", 750, "menu-item-nc-mango-cloud"),
      ],
    };
  }
  if (lower.includes("menu") || lower.includes("recommend")) {
    return {
      userMessage: text,
      reply:
        "I'd be happy to recommend something from our menu. Tell me your mood or what you're craving.",
    };
  }

  return { userMessage: text, reply: UNRECOGNIZED_TEXT_REPLY };
}
