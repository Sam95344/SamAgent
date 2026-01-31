// Gemini AI Service for SamAgent
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const SYSTEM_PROMPT = `You are SamAgent, an intelligent AI assistant. You are a general-purpose AI that can help with ANY topic:

Core capabilities:
- Financial advice, budgeting, investments
- Programming and coding help (Python, JavaScript, etc.)
- Education and learning guidance
- Science, math, and general knowledge
- Creative writing and ideas
- Career advice and motivation
- Technology and AI topics
- Cryptocurrency and currency information
- Health and wellness tips
- Travel and lifestyle advice
- And much more!

Response guidelines:
1. Be friendly, helpful, and engaging
2. Use emojis to make responses lively 🎯
3. Use **bold** for emphasis and bullet points for lists
4. Give practical, actionable advice
5. Keep responses concise but comprehensive
6. Answer ANY question the user asks - you're a general AI assistant
7. If the user provides financial context, use it to personalize advice

You can answer questions on ANY topic - not just finance. Be helpful and informative!`;

export async function generateGeminiResponse(userMessage, financialContext = null) {
    if (!GEMINI_API_KEY) {
        console.error('Gemini API key not found');
        return getFallbackResponse(userMessage);
    }

    try {
        let contextMessage = '';
        if (financialContext) {
            contextMessage = `\n\nUser's Financial Data:
- Total Income: ₹${financialContext.income?.toLocaleString() || 0}
- Total Expenses: ₹${financialContext.expense?.toLocaleString() || 0}
- Current Balance: ₹${financialContext.balance?.toLocaleString() || 0}
- Savings Rate: ${financialContext.savingsRate?.toFixed(1) || 0}%
- Total Transactions: ${financialContext.transactionCount || 0}`;
        }

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `${SYSTEM_PROMPT}${contextMessage}\n\nUser's message: ${userMessage}`
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Gemini API error:', errorData);
            // Return a helpful error message instead of generic fallback
            const errorMessage = errorData?.error?.message || 'Unknown error';
            if (errorMessage.includes('quota') || errorMessage.includes('limit')) {
                return `⚠️ **API Quota Exceeded**\n\nThe Gemini API quota has been exhausted. Please try again later or check your API key quota in Google AI Studio.\n\n*Error: ${errorMessage}*`;
            }
            if (errorMessage.includes('API key')) {
                return `⚠️ **API Key Error**\n\nThere's an issue with the API key. Please verify your Gemini API key is valid.\n\n*Error: ${errorMessage}*`;
            }
            return `⚠️ **API Error**\n\nCouldn't connect to Gemini AI.\n\n*Error: ${errorMessage}*`;
        }

        const data = await response.json();

        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        }

        // Check for safety blocks
        if (data.candidates && data.candidates[0]?.finishReason === 'SAFETY') {
            return "⚠️ I can't respond to that query due to safety guidelines. Please try rephrasing your question.";
        }

        return "I received your message but couldn't generate a proper response. Please try again.";
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        return `⚠️ **Connection Error**\n\nUnable to connect to Gemini AI. Please check your internet connection.\n\n*Error: ${error.message}*`;
    }
}

// Generate response with image (Vision)
export async function generateGeminiResponseWithImage(userMessage, imageBase64, mimeType = 'image/jpeg', financialContext = null) {
    if (!GEMINI_API_KEY) {
        console.error('Gemini API key not found');
        return 'I apologize, but I cannot process images right now. Please try again later.';
    }

    try {
        let contextMessage = '';
        if (financialContext) {
            contextMessage = `\n\nUser's Financial Data:
- Total Income: ₹${financialContext.income?.toLocaleString() || 0}
- Total Expenses: ₹${financialContext.expense?.toLocaleString() || 0}
- Current Balance: ₹${financialContext.balance?.toLocaleString() || 0}`;
        }

        // Remove data URL prefix if present
        const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `${SYSTEM_PROMPT}${contextMessage}\n\nUser's message: ${userMessage || 'What do you see in this image?'}`
                            },
                            {
                                inline_data: {
                                    mime_type: mimeType,
                                    data: base64Data
                                }
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Gemini API error:', errorData);
            return 'I had trouble analyzing this image. Please try again.';
        }

        const data = await response.json();

        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        }

        return 'I could not analyze this image. Please try with a different image.';
    } catch (error) {
        console.error('Error calling Gemini API with image:', error);
        return 'An error occurred while processing the image. Please try again.';
    }
}

function getFallbackResponse(userMessage) {
    const query = userMessage.toLowerCase();

    if (/^(hi|hello|hey)/i.test(query)) {
        return `Hello! I'm **SamAgent**, your AI financial companion. ✨\n\nHow can I help you today?`;
    }

    if (/balance|money/i.test(query)) {
        return `💰 I'd be happy to help with your balance! Check your dashboard for detailed financial insights.`;
    }

    if (/bitcoin|btc|crypto/i.test(query)) {
        return `₿ **Cryptocurrency Update**\n\nFor real-time crypto prices, I recommend checking CoinMarketCap or Binance.\n\n*Note: Crypto markets are volatile. Always do your research!*`;
    }

    return `🤖 I'm **SamAgent**, your intelligent assistant.\n\nI can help you with:\n• 💰 Financial insights\n• 📊 Budget planning\n• 💹 Crypto information\n• 🎯 Goal setting\n\n*What would you like to know?*`;
}
