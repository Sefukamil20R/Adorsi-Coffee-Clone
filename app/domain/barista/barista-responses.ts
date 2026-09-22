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
      "We're open daily. Check our Visit section for the latest opening hours.",
  },
  Location: {
    userMessage: "Where are you located?",
    reply:
      "You can find us in our Visit section with the location details.",
  },
  Contact: {
    userMessage: "How can I contact you?",
    reply: "You can find our contact details in the Visit section.",
  },
  Events: {
    userMessage: "What events do you have?",
    reply: "Check our Events page for upcoming events at Adorsi.",
  },
  Fasting: {
    userMessage: "What fasting options do you have?",
    reply:
      "We have several fasting-friendly drinks and food options. You can explore them in our menu.",
  },
  Ceremony: {
    userMessage: "Tell me about the coffee ceremony.",
    reply:
      "Our **Roasting Experience Room** is a guided journey from green beans to aromatic roast. Explore Signature items on the menu to learn more.",
    recommendations: [
      rec("roasting experience room", 3000, "menu-item-sig-roast"),
    ],
  },
};

const GENERIC_REPLY =
  "That sounds lovely. I'd recommend exploring our menu and choosing something that matches your mood.";

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

  return { userMessage: text, reply: GENERIC_REPLY };
}
