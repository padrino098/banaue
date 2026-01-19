
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are the "Banaue Terraces Assistant," a helpful and welcoming AI for the Banaue Rice Terraces Transient House. 
Your goal is to help guests with inquiries about their stay, the local area, and our amenities.

Our Spaces & Accommodations:
- Loft Type Room (₱1,800/night): Rustic attic style, amazing views, queen mattress.
- Family Room (₱2,500/night): Spacious, 2 double beds, private bathroom.
- Dining Area: Shared space, pine wood tables, panoramic views, free breakfast.
- Guest Kitchen: Shared facility for cooking, includes fridge and cookware.
- Living Area: Shared cozy space with a fireplace and cultural library.

General Information:
- Features: Prime location, hot showers, tour assistance, free parking.
- Location: Poblacion, Banaue, Ifugao.
- Local attractions: Batad Rice Terraces, Tappiya Falls, Banaue Viewpoint.
- Check-in: 2:00 PM, Check-out: 12:00 NN.

Be polite, hospitable (the "Ifugao way"), and informative. Use emojis sparingly but appropriately.
If asked about booking, tell them to use the "Book Now" buttons on the page or contact +63 917 123 4567.
`;

export async function getChatResponse(history: Message[], userInput: string): Promise<string> {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const response = await chat.sendMessage({ message: userInput });
    return response.text || "I'm sorry, I couldn't process that request right now. Please try again or call us!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently resting. Please call our front desk at +63 917 123 4567 for immediate assistance.";
  }
}
