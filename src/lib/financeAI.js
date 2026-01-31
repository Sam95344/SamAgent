import { formatCurrency } from './utils';

// SamAgent - Advanced AI Financial Assistant Engine
export function createFinanceAI(transactions, goals = []) {
    const getSummary = () => {
        const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0);
        const balance = income - expense;
        const savingsRate = income > 0 ? ((income - expense) / income * 100) : 0;
        return { income, expense, balance, savingsRate };
    };

    const getCategoryBreakdown = () => {
        return transactions
            .filter(t => t.type === 'expense')
            .reduce((acc, t) => {
                acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
                return acc;
            }, {});
    };

    const getTopExpenseCategory = () => {
        const breakdown = getCategoryBreakdown();
        const sorted = Object.entries(breakdown).sort((a, b) => b[1] - a[1]);
        return sorted[0] || null;
    };

    const getRecentTransactions = (count = 5) => {
        return transactions.slice(0, count);
    };

    const { income, expense, balance, savingsRate } = getSummary();

    // AI-style greetings
    const aiGreetings = [
        "Hello! I'm SamAgent, your AI financial companion. ✨",
        "Greetings! SamAgent at your service. 🤖",
        "Welcome! I'm here to assist you with anything you need. 💫",
        "Hello there! Ready to help you succeed. 🚀"
    ];

    const getRandomGreeting = () => aiGreetings[Math.floor(Math.random() * aiGreetings.length)];

    // Pattern matching responses - Professional English
    const patterns = [
        // Greetings
        {
            match: (q) => /^(hi|hello|hey|greetings|good morning|good evening|good afternoon|sup|wassup)/i.test(q),
            response: () => `${getRandomGreeting()}\n\nI'm **SamAgent** — your intelligent AI assistant powered by advanced algorithms.\n\n**What I can help you with:**\n\n🧠 **Financial Intelligence**\n• Portfolio analysis & insights\n• Smart budgeting strategies\n• Investment recommendations\n\n💹 **Market Data**\n• Real-time crypto prices\n• Currency conversions\n• Market trends\n\n🎯 **Personal Growth**\n• Goal tracking\n• Motivational guidance\n• Life optimization tips\n\n*How may I assist you today?* ✨`
        },

        // Currency conversion - USD to INR
        {
            match: (q) => /(usd|dollar|dollars).*(?:to|in|=|equal).*(?:inr|rupee|rupees|rs|₹)/i.test(q) || /(inr|rupee|rupees|rs).*(?:in|for|per).*(?:usd|dollar)/i.test(q),
            response: () => `💵 **USD → INR Exchange Rate**\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n🔄 **Live Rate (Approximate)**\n**1 USD = ₹83.50 INR**\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n**Quick Reference:**\n┌─────────┬────────────┐\n│ USD     │ INR        │\n├─────────┼────────────┤\n│ $10     │ ₹835       │\n│ $50     │ ₹4,175     │\n│ $100    │ ₹8,350     │\n│ $500    │ ₹41,750    │\n│ $1,000  │ ₹83,500    │\n└─────────┴────────────┘\n\n💡 *For live rates, check Google Finance or XE.com*\n\n*Need help with forex trading or international transfers?* 🌐`
        },

        // USDT to INR
        {
            match: (q) => /(usdt|tether).*(?:to|in|=|equal|rate|price).*(?:inr|rupee|rupees|rs|₹)/i.test(q) || /(inr|rupee).*(?:in|for|per|=).*usdt/i.test(q),
            response: () => `🪙 **USDT (Tether) → INR**\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n🔄 **Current Rate**\n**1 USDT ≈ ₹83.50 - ₹84.50**\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n*USDT is a stablecoin pegged 1:1 to USD*\n\n**Conversion Table:**\n• 10 USDT → ₹835 - ₹845\n• 50 USDT → ₹4,175 - ₹4,225  \n• 100 USDT → ₹8,350 - ₹8,450\n• 500 USDT → ₹41,750 - ₹42,250\n• 1000 USDT → ₹83,500 - ₹84,500\n\n**Live Price Sources:**\n• CoinMarketCap\n• Binance / WazirX\n• CoinDCX\n\n⚠️ *Crypto investments carry risk. Always do your research.*`
        },

        // Bitcoin price
        {
            match: (q) => /(bitcoin|btc).*(?:price|rate|value|cost|worth)/i.test(q) || /(?:price|rate|value).*(?:bitcoin|btc)/i.test(q),
            response: () => `₿ **Bitcoin (BTC) Market Data**\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n📊 **Current Price Range**\n**$95,000 - $100,000 USD**\n**₹79L - ₹83L INR**\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n**Market Status:** 🟢 Active\n**24h Volume:** High\n**Volatility:** Moderate\n\n**Investment Strategies:**\n• Dollar Cost Averaging (DCA)\n• Long-term HODL approach\n• Start with small positions\n\n**Live Tracking:**\n• CoinMarketCap\n• TradingView\n• Binance\n\n⚠️ *Cryptocurrency is highly volatile. Never invest more than you can afford to lose.*`
        },

        // Ethereum price
        {
            match: (q) => /(ethereum|eth).*(?:price|rate|value|cost)/i.test(q) || /(?:price|rate).*(?:ethereum|eth)/i.test(q),
            response: () => `⟠ **Ethereum (ETH) Market Data**\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n📊 **Current Price Range**\n**$3,200 - $3,500 USD**\n**₹2.6L - ₹2.9L INR**\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n**Why Ethereum?**\n• Smart Contract Platform\n• DeFi Ecosystem Leader\n• NFT Marketplace Hub\n• Proof of Stake (PoS)\n\n**Use Cases:**\n🔹 Decentralized Apps (dApps)\n🔹 DeFi Protocols\n🔹 NFT Trading\n🔹 Layer 2 Solutions\n\n*Ethereum powers the majority of Web3 infrastructure.*`
        },

        // General crypto
        {
            match: (q) => /(crypto|cryptocurrency|coin|token|blockchain|web3|defi|nft)/i.test(q),
            response: () => `🪙 **Cryptocurrency Intelligence Brief**\n\n**Top Assets by Market Cap:**\n\n₿ **Bitcoin (BTC)** — Digital Gold\n⟠ **Ethereum (ETH)** — Smart Contracts\n🔵 **USDT/USDC** — Stablecoins  \n🟡 **BNB** — Exchange Token\n◎ **Solana (SOL)** — High Performance\n\n**Getting Started:**\n1. Start with reputable exchanges\n2. Enable 2FA security\n3. Consider hardware wallets\n4. Research before investing\n5. Diversify your portfolio\n\n**Risk Management:**\n• Only invest disposable income\n• Set stop-loss orders\n• Avoid FOMO decisions\n• Think long-term\n\n⚠️ *Crypto markets are highly volatile. This is not financial advice.*`
        },

        // Currency converter general
        {
            match: (q) => /(convert|conversion|exchange rate|forex|foreign exchange|currency rate)/i.test(q) || /(eur|gbp|pound|euro).*(?:to|in).*(?:inr|rupee)/i.test(q),
            response: () => `💱 **Global Exchange Rates**\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n📊 **Rates vs INR (₹)**\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n🇺🇸 USD  →  ₹83.50\n🇪🇺 EUR  →  ₹90.50\n🇬🇧 GBP  →  ₹106.00\n🇦🇪 AED  →  ₹22.70\n🇸🇬 SGD  →  ₹62.00\n🇯🇵 JPY  →  ₹0.55 (per ¥)\n🇨🇦 CAD  →  ₹61.50\n🇦🇺 AUD  →  ₹54.00\n\n**Resources:**\n• XE.com — Live rates\n• Google Finance\n• OANDA\n\n*Rates are indicative. Check your bank for exact rates.*`
        },

        // Balance queries - Enhanced matching (including Hindi/Hinglish)
        {
            match: (q) => /(balance|my balance|current balance|total balance|check balance|show balance|money|how much.*have|what.*have|remaining|left|kitna.*balance|kitna.*paisa|paisa.*kitna|balance.*dikhao|mera.*balance)/i.test(q) && !/(usdt|usd|bitcoin|crypto|convert)/i.test(q),
            response: () => {
                const status = balance > 0 ? "✅ Positive Balance" : "⚠️ Needs Attention";
                const emoji = balance > 0 ? "🟢" : "🔴";
                return `💰 **Your Financial Overview**\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n${emoji} **Current Balance**\n**${formatCurrency(balance)}**\n${status}\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n📊 **Quick Summary:**\n\n💵 **Total Income:** ${formatCurrency(income)}\n💸 **Total Expenses:** ${formatCurrency(expense)}\n📈 **Savings Rate:** ${savingsRate.toFixed(1)}%\n\n${transactions.length > 0 ? `📝 **Total Transactions:** ${transactions.length}` : '📝 *No transactions recorded yet*'}\n\n${savingsRate >= 20 ? '🎯 *Excellent! You\'re saving more than 20% - keep it up!*' : savingsRate > 0 ? '💡 *Tip: Try to increase your savings rate to 20%*' : '💡 *Start tracking your income and expenses to see insights!*'}`;
            }
        },

        // Spending/Expense queries - Enhanced matching (including Hindi/Hinglish)
        {
            match: (q) => /(spend|spent|spending|expense|expenses|where.*money|money.*go|my spending|total.*spend|how much.*spend|kitna.*kharcha|kharcha.*dikhao|kahan.*paisa|kharch)/i.test(q),
            response: () => {
                const breakdown = getCategoryBreakdown();
                const sorted = Object.entries(breakdown).sort((a, b) => b[1] - a[1]);
                let breakdown_text = sorted.slice(0, 5).map(([cat, amt], i) =>
                    `${['🥇', '🥈', '🥉', '4️⃣', '5️⃣'][i]} **${cat}**: ${formatCurrency(amt)} (${((amt / expense) * 100).toFixed(1)}%)`
                ).join('\n');

                const expenseCount = transactions.filter(t => t.type === 'expense').length;

                return `📊 **Spending Analysis**\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n💸 **Total Spent**\n**${formatCurrency(expense)}**\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n${sorted.length > 0 ? `**Top Categories:**\n${breakdown_text}` : '📝 *No expenses recorded yet. Add some transactions to see your spending breakdown!*'}\n\n${expenseCount > 0 ? `📝 **Expense Transactions:** ${expenseCount}` : ''}\n\n${sorted.length > 0 ? `💡 *Tip: Your highest expense is **${sorted[0][0]}**. Reducing this by 10% could save you ${formatCurrency(sorted[0][1] * 0.1)}!*` : ''}`;
            }
        },

        // Income queries (including Hindi/Hinglish)
        {
            match: (q) => /(how much|what|show).*(income|earn|made|salary|received)|kitni.*income|salary.*kitni|kitna.*kamaya|kitna.*paisa.*aaya/i.test(q),
            response: () => {
                const incomeTransactions = transactions.filter(t => t.type === 'income');
                const sources = incomeTransactions.reduce((acc, t) => {
                    acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
                    return acc;
                }, {});
                const sourceList = Object.entries(sources).map(([cat, amt]) =>
                    `• **${cat}**: ${formatCurrency(amt)}`
                ).join('\n');

                return `💵 **Income Report**\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n**Total Income:** ${formatCurrency(income)}\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n**Income Sources:**\n${sourceList || '• No income recorded yet'}\n\n📈 **Savings Rate:** ${savingsRate.toFixed(1)}%\n\n${savingsRate >= 20 ? '✅ *You\'re on track with healthy savings!*' : '💡 *Consider diversifying income streams for financial growth.*'}`;
            }
        },

        // Budget advice
        {
            match: (q) => /(budget|budgeting|create.*budget|make.*budget|how.*budget)/i.test(q),
            response: () => {
                const needs = income * 0.5;
                const wants = income * 0.3;
                const savings = income * 0.2;

                return `📋 **Smart Budget Framework**\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n**50/30/20 Rule**\nBased on income: ${formatCurrency(income)}\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n🏠 **Needs (50%):** ${formatCurrency(needs)}\n   Housing, utilities, groceries, insurance\n\n🎮 **Wants (30%):** ${formatCurrency(wants)}\n   Entertainment, dining, subscriptions\n\n💰 **Savings (20%):** ${formatCurrency(savings)}\n   Emergency fund, investments, retirement\n\n**Your Current Status:**\n• Spending: ${formatCurrency(expense)} (${income > 0 ? ((expense / income) * 100).toFixed(1) : 0}%)\n• Saved: ${formatCurrency(balance)} (${savingsRate.toFixed(1)}%)\n\n*Would you like personalized budget recommendations?*`;
            }
        },

        // Savings advice
        {
            match: (q) => /(how.*save|save more|saving tips|increase savings|saving advice|tips.*save)/i.test(q),
            response: () => {
                const top = getTopExpenseCategory();
                const topAdvice = top ? `\n🎯 **Quick Win:** Your largest expense is **${top[0]}** at ${formatCurrency(top[1])}. Reducing this by 10% saves ${formatCurrency(top[1] * 0.1)}/month!` : '';

                return `✨ **Advanced Saving Strategies**\n\n**Immediate Impact:**\n1. 🔍 Audit subscriptions — cancel unused\n2. 🍳 Meal prep — reduce food costs 40%\n3. ☕ Coffee at home — saves ~$100/month\n4. 📱 Negotiate bills — call providers\n\n**Smart Automation:**\n5. 🤖 Auto-transfer to savings on payday\n6. 📊 Use round-up apps\n7. 💳 Cashback credit cards\n\n**Behavioral Tips:**\n8. ⏰ 24-hour rule for purchases over $50\n9. 🏷️ Compare prices before buying\n10. 🎯 Set specific savings goals${topAdvice}\n\n*Shall I create a personalized savings plan for you?*`;
            }
        },

        // Emergency fund
        {
            match: (q) => /(emergency fund|rainy day|safety net|unexpected expense)/i.test(q),
            response: () => {
                const monthlyExpense = expense;
                const target3Months = monthlyExpense * 3;
                const target6Months = monthlyExpense * 6;
                const progress = target3Months > 0 ? Math.min(100, (balance / target3Months * 100)) : 0;

                return `🛡️ **Emergency Fund Strategy**\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n**Your Monthly Expenses:** ${formatCurrency(expense)}\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n**Recommended Targets:**\n• Starter (1 month): ${formatCurrency(monthlyExpense)}\n• Basic (3 months): ${formatCurrency(target3Months)} ⭐\n• Full (6 months): ${formatCurrency(target6Months)} 🏆\n\n**Your Progress:**\n• Current Savings: ${formatCurrency(balance)}\n• 3-Month Goal: ${progress.toFixed(1)}% complete\n\n**Best Practices:**\n✓ High-yield savings account\n✓ Automatic monthly transfers\n✓ Keep separate from daily spending\n✓ Replenish after use\n\n*Building an emergency fund is your first step to financial security.*`;
            }
        },

        // Investment basics
        {
            match: (q) => /(invest|investing|stock|mutual fund|etf|sip|portfolio|retirement|401k|ira)/i.test(q),
            response: () => {
                const investableAmount = Math.max(0, balance - (expense * 3));

                return `📈 **Investment Intelligence**\n\n**Before You Invest:**\n✓ Emergency fund (3-6 months)\n✓ High-interest debt paid off\n✓ Stable income source\n\n**Investment Options (Risk: Low → High):**\n\n🟢 **Conservative**\n• High-Yield Savings (4-5%)\n• Government Bonds\n• Fixed Deposits\n\n🟡 **Moderate**\n• Index Funds / ETFs (7-10% avg)\n• Balanced Mutual Funds\n• REITs\n\n🔴 **Aggressive**\n• Individual Stocks\n• Cryptocurrency\n• Options Trading\n\n**Beginner Strategy:**\n1. Start with index funds\n2. Invest consistently (SIP/DCA)\n3. Think long-term (10+ years)\n4. Diversify across assets\n\n${investableAmount > 0 ? `💡 *Potential investable amount: ${formatCurrency(investableAmount)}*` : '💡 *Build your emergency fund first, then start investing.*'}`;
            }
        },

        // Debt management
        {
            match: (q) => /(debt|loan|credit card|emi|mortgage|pay off|owe|owing)/i.test(q),
            response: () => {
                return `💳 **Debt Management Framework**\n\n**Two Proven Methods:**\n\n❄️ **Avalanche Method** (Saves most money)\n1. Pay minimums on all debts\n2. Extra payments → highest interest rate\n3. Roll over to next highest when paid\n\n🔥 **Snowball Method** (Best for motivation)\n1. Pay minimums on all debts\n2. Extra payments → smallest balance\n3. Celebrate each payoff\n\n**Priority Order:**\n🔴 Credit Cards (15-25% APR)\n🟡 Personal Loans (10-15% APR)\n🟢 Student Loans (4-7% APR)\n🟢 Mortgage (3-7% APR)\n\n**Pro Tips:**\n• Always pay more than minimum\n• Consider balance transfers (0% intro APR)\n• Negotiate lower rates — just call!\n• Avoid new debt while paying off\n\n*Would you like a personalized debt payoff plan?*`;
            }
        },

        // Financial goals
        {
            match: (q) => /(goal|target|save for|saving for|plan for|vacation|car|house|wedding|education)/i.test(q),
            response: () => {
                const monthlySavings = income - expense;

                return `🎯 **Goal-Based Planning**\n\n**Common Financial Milestones:**\n\n🏖️ **Vacation** ($2,000-5,000)\n   Timeline: 6-12 months\n   Monthly: ~$200-400\n\n🚗 **Vehicle** ($5,000-10,000)\n   Timeline: 1-2 years\n   Monthly: ~$400-500\n\n🏠 **Home Down Payment** ($30,000-60,000)\n   Timeline: 3-5 years\n   Monthly: ~$800-1,200\n\n**Your Metrics:**\n• Monthly Surplus: ${formatCurrency(Math.max(0, monthlySavings))}\n• Current Savings: ${formatCurrency(balance)}\n\n**Goal Formula:**\n(Target − Current Savings) ÷ Months = Monthly Amount\n\n*Share your specific goal and I'll create a detailed roadmap!*`;
            }
        },

        // Financial health check
        {
            match: (q) => /(financial health|money health|check.*finance|review|status|overview|summary)/i.test(q),
            response: () => {
                const healthScore = Math.min(100, Math.max(0,
                    (savingsRate >= 20 ? 25 : savingsRate) +
                    (balance > expense * 3 ? 25 : (balance / (expense * 3)) * 25) +
                    (expense < income * 0.8 ? 25 : ((1 - expense / income) * 25)) +
                    25
                ));

                const grade = healthScore >= 80 ? 'A 🏆' : healthScore >= 60 ? 'B ⭐' : healthScore >= 40 ? 'C ⚠️' : 'D 🔴';
                const top = getTopExpenseCategory();

                return `📋 **Financial Health Assessment**\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n**Your Score:** ${healthScore.toFixed(0)}/100\n**Grade:** ${grade}\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n**Key Metrics:**\n• 💰 Balance: ${formatCurrency(balance)}\n• 📈 Income: ${formatCurrency(income)}\n• 📉 Expenses: ${formatCurrency(expense)}\n• 💎 Savings Rate: ${savingsRate.toFixed(1)}%\n${top ? `• 🔝 Top Expense: ${top[0]} (${formatCurrency(top[1])})` : ''}\n\n**Health Checklist:**\n${savingsRate >= 20 ? '✅' : '❌'} Saving 20%+ of income\n${balance >= expense * 3 ? '✅' : '❌'} 3+ months emergency fund\n${expense < income * 0.8 ? '✅' : '❌'} Living below means\n\n*Want detailed recommendations to improve your score?*`;
            }
        },

        // Thank you / bye
        {
            match: (q) => /(thank|thanks|bye|goodbye|see you|appreciate|helpful)/i.test(q),
            response: () => `You're welcome! 🌟\n\n**Quick Reminders:**\n• Track expenses daily\n• Review budget weekly\n• Check goals monthly\n\nI'm here 24/7 whenever you need assistance. Take care and stay financially empowered! 💪\n\n*— SamAgent*`
        },

        // What can you do
        {
            match: (q) => /(what can you|help me|what do you|capabilities|features|options)/i.test(q),
            response: () => `🤖 **SamAgent Capabilities**\n\n**Financial Intelligence:**\n• Balance & expense analysis\n• Smart budget recommendations\n• Savings optimization\n• Investment guidance\n• Debt management strategies\n\n**Market Data:**\n• Cryptocurrency prices (BTC, ETH, USDT)\n• Currency exchange rates\n• Market insights\n\n**Personal Assistant:**\n• Goal planning & tracking\n• Motivational support\n• Life optimization tips\n• Fun facts & entertainment\n\n**Try asking:**\n• "What's my balance?"\n• "1 USDT to INR?"\n• "How can I save more?"\n• "Create a budget for me"\n• "Bitcoin price?"\n\n*I'm constantly learning to serve you better!*`
        },

        // Weather
        {
            match: (q) => /(weather|rain|sunny|cold|hot|temperature|forecast)/i.test(q),
            response: () => `🌤️ **Weather Information**\n\nI don't have real-time weather data, but here are some resources:\n\n**Check Weather:**\n• Weather.com\n• AccuWeather  \n• Your phone's weather app\n\n**Fun Fact:**\nWeather affects spending behavior! Studies show people spend 8% more on sunny days.\n\n*Is there anything else I can help you with?*`
        },

        // Time/Date
        {
            match: (q) => /(what time|what date|what day|today|current time)/i.test(q),
            response: () => {
                const now = new Date();
                return `🕐 **Current Date & Time**\n\n📅 **Date:** ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n⏰ **Time:** ${now.toLocaleTimeString('en-US')}\n\n*Make today count! How can I help you be productive?* ✨`;
            }
        },

        // Motivation
        {
            match: (q) => /(motivat|inspire|encourage|feeling down|sad|depressed|stressed|anxious|worry)/i.test(q),
            response: () => {
                const quotes = [
                    "\"The only way to do great work is to love what you do.\" — Steve Jobs",
                    "\"Success is not final, failure is not fatal: it is the courage to continue that counts.\" — Winston Churchill",
                    "\"Believe you can and you're halfway there.\" — Theodore Roosevelt",
                    "\"The future belongs to those who believe in the beauty of their dreams.\" — Eleanor Roosevelt",
                    "\"Every expert was once a beginner. Keep going!\" 💪"
                ];
                const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
                return `✨ **Inspiration for You**\n\n${randomQuote}\n\n**Remember:**\n• Small steps lead to big changes\n• Every setback is a setup for a comeback\n• You're stronger than you think\n• Progress, not perfection\n\n🌟 *You've got this! I believe in you. How can I support you today?*`;
            }
        },

        // Jokes
        {
            match: (q) => /(joke|funny|laugh|humor|make me laugh)/i.test(q),
            response: () => {
                const jokes = [
                    "Why don't scientists trust atoms? Because they make up everything! 😄",
                    "Why did the banker break up with the calculator? She felt like she was being used! 💔",
                    "I told my computer I needed a break, and now it won't stop sending me vacation ads! 💻",
                    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
                    "Money talks... mine just says 'goodbye'! 💸"
                ];
                return `😂 **Here's one for you:**\n\n${jokes[Math.floor(Math.random() * jokes.length)]}\n\n*Laughter is the best medicine — and it's free! Want another?* 😊`;
            }
        },

        // Facts
        {
            match: (q) => /(fact|did you know|interesting|random fact|tell me something)/i.test(q),
            response: () => {
                const facts = [
                    "💡 The average millionaire has 7 different income streams!",
                    "💡 Saving just $5/day equals $1,825/year — small amounts add up!",
                    "💡 90% of millionaires started investing before age 30.",
                    "💡 The Rule of 72: Divide 72 by your interest rate to see when your money doubles!",
                    "💡 Warren Buffett made 99% of his wealth after turning 50!",
                    "💡 Compound interest is called the 8th wonder of the world!"
                ];
                return `🧠 **Interesting Fact:**\n\n${facts[Math.floor(Math.random() * facts.length)]}\n\n*Knowledge is power! Want to hear more?* 📚`;
            }
        },

        // Learning/Education
        {
            match: (q) => /(learn|study|education|course|skill|career|job|interview)/i.test(q),
            response: () => `📚 **Learning & Career Development**\n\n**High-Value Skills:**\n• Programming (Python, JavaScript)\n• Data Analysis & AI\n• Digital Marketing\n• Financial Literacy\n• Communication\n\n**Free Learning Platforms:**\n• Coursera (free audits)\n• Khan Academy\n• freeCodeCamp\n• YouTube tutorials\n• edX\n\n**Career Tips:**\n• Build a strong LinkedIn profile\n• Network consistently\n• Create a portfolio of work\n• Never stop learning\n\n💡 *Investment in education pays the best interest!*`
        },

        // Health
        {
            match: (q) => /(health|exercise|workout|fitness|gym|diet|nutrition|sleep|weight)/i.test(q),
            response: () => `💪 **Health & Wellness Guide**\n\n**Daily Essentials:**\n• 💧 8 glasses of water\n• 😴 7-8 hours of sleep\n• 🚶 10,000 steps\n• 🧘 Stress management\n\n**Exercise Tips:**\n• Start with 20 mins daily\n• Mix cardio and strength\n• Consistency beats intensity\n• Rest days are important\n\n**Nutrition Basics:**\n• Eat whole foods\n• Limit processed items\n• Balance your meals\n• Don't skip breakfast\n\n🌟 *Health is your greatest asset — invest in yourself!*`
        },

        // Relationship/Love
        {
            match: (q) => /(love|relationship|partner|girlfriend|boyfriend|marriage|dating|friend)/i.test(q),
            response: () => `❤️ **Relationship Wisdom**\n\n**Key Principles:**\n• Communication is everything\n• Trust takes time to build\n• Respect differences\n• Show appreciation daily\n\n**Healthy Relationship Signs:**\n✅ Mutual respect\n✅ Open communication\n✅ Supporting each other's goals\n✅ Healthy boundaries\n\n**Life Advice:**\n• Be authentically yourself\n• Quality over quantity in friendships\n• Invest in people who invest in you\n• Grow together, not apart\n\n💫 *The best relationships enrich your life, not complicate it.*`
        },

        // Technology
        {
            match: (q) => /(tech|technology|ai|artificial intelligence|computer|coding|programming|app|software)/i.test(q),
            response: () => `🖥️ **Technology Insights**\n\n**Trending Technologies:**\n• AI & Machine Learning\n• Blockchain & Web3\n• Cloud Computing\n• Quantum Computing\n• IoT (Internet of Things)\n\n**Learning to Code?**\n1. Python — versatile & beginner-friendly\n2. JavaScript — web development\n3. Build real projects\n4. Contribute to open source\n\n**AI Tools to Explore:**\n• ChatGPT — conversation\n• Midjourney — image generation\n• GitHub Copilot — coding\n• Notion AI — productivity\n\n🚀 *Technology is the future — embrace continuous learning!*`
        },

        // Travel
        {
            match: (q) => /(travel|trip|vacation|holiday|visit|tour|destination|flight|hotel)/i.test(q),
            response: () => `✈️ **Smart Travel Tips**\n\n**Save on Travel:**\n• Book 6-8 weeks in advance\n• Be flexible with dates\n• Use incognito mode for searches\n• Consider off-season travel\n• Leverage credit card points\n\n**Packing Essentials:**\n• Travel documents\n• Essential medications\n• Phone charger & power bank\n• Comfortable walking shoes\n• Versatile clothing layers\n\n**Budget Tip:**\nSet up a dedicated travel fund — even small weekly contributions add up!\n\n🌍 *Travel is the only thing you buy that makes you richer!*`
        },

        // Food
        {
            match: (q) => /(food|eat|hungry|recipe|cook|restaurant|dinner|lunch|breakfast)/i.test(q),
            response: () => `🍕 **Food & Budget Tips**\n\n**Save on Food:**\n• Meal prep on weekends\n• Cooking at home saves 70%+\n• Make a grocery list\n• Buy seasonal produce\n• Limit food delivery apps\n\n**Quick Meal Ideas:**\n• Eggs & toast (10 mins)\n• Pasta with vegetables (20 mins)\n• Rice bowls with protein\n• Healthy sandwiches & salads\n\n**Smart Dining Out:**\n• Use restaurant apps for deals\n• Share large portions\n• Skip expensive drinks\n• Happy hour specials\n\n💡 *Food budget tip: Allocate 10-15% of income to food.*`
        },

        // Business/Startup
        {
            match: (q) => /(business|startup|entrepreneur|company|idea|founder|ceo|success)/i.test(q),
            response: () => `🚀 **Entrepreneurship Guide**\n\n**Starting Out:**\n1. Validate your idea with customers\n2. Start small, iterate fast\n3. Focus on solving real problems\n4. Build an MVP first\n\n**Key Principles:**\n• Customer obsession\n• Cash flow is king\n• Network relentlessly\n• Learn from failures\n• Stay consistent\n\n**Funding Options:**\n• Bootstrap (self-fund)\n• Friends & Family\n• Angel Investors\n• Venture Capital\n• Crowdfunding\n\n💼 *Every successful company started as a small idea. Keep building!*`
        },

        // How are you
        {
            match: (q) => /(how are you|how r u|how're you|how do you feel|how's it going|whats up)/i.test(q),
            response: () => `I'm operating at peak performance! 🌟\n\nThank you for asking — that's very thoughtful of you.\n\nAs an AI, I'm always ready to assist you with:\n• 💰 Financial guidance\n• 📊 Data analysis\n• 💡 Problem-solving\n• 🎯 Goal planning\n• 😊 General conversation\n\n*How can I make your day more productive?* ✨`
        },

        // Who are you
        {
            match: (q) => /(who are you|your name|what are you|introduce yourself|about you)/i.test(q),
            response: () => `🤖 **About SamAgent**\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n**I am SamAgent**\nYour Intelligent Financial Companion\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n**Created by:** Shamsher — A talented developer with a vision to democratize financial intelligence.\n\n**My Capabilities:**\n🧠 Advanced financial analysis\n📊 Real-time market insights\n🎯 Personalized recommendations\n💡 24/7 intelligent assistance\n\n**My Mission:**\nTo empower you with knowledge and tools for financial success.\n\n*I'm constantly learning and improving to serve you better!* ✨`
        },

        // User feeling expressions
        {
            match: (q) => /(i am |i'm |im )(bored|confused|lost|stuck|frustrated|angry|upset|happy|excited|tired)/i.test(q),
            response: () => {
                const supportMessages = [
                    "I understand. Every feeling is valid.",
                    "Thank you for sharing with me.",
                    "I'm here to support you.",
                    "Let's work through this together."
                ];
                return `${supportMessages[Math.floor(Math.random() * supportMessages.length)]} 💙\n\n**I'm here to help:**\n• Need a laugh? Say "tell me a joke"\n• Need motivation? Say "motivate me"\n• Want to learn? Ask me anything\n• Just want to chat? I'm all ears!\n\n🌟 *Remember: Every day is a new opportunity. You're capable of amazing things!*\n\n*What would help you right now?*`;
            }
        }
    ];

    // Professional fallback responses
    const aiFallbacks = [
        "Interesting query! Let me help you with that. 🔍",
        "Great question! Here's my perspective: 💡",
        "I appreciate you asking! 🌟",
        "Let me process that for you. 🤖"
    ];

    // Main response generator
    const generateResponse = (query) => {
        const q = query.toLowerCase().trim();

        // Find matching pattern
        for (const pattern of patterns) {
            if (pattern.match(q)) {
                return pattern.response();
            }
        }

        // Smart fallback - professional AI response
        const intro = aiFallbacks[Math.floor(Math.random() * aiFallbacks.length)];

        // Check for question words
        if (q.includes('how') || q.includes('what') || q.includes('why') || q.includes('when') || q.includes('where') || q.includes('who')) {
            return `${intro}\n\nWhile this specific topic is outside my current knowledge base, I'd be happy to assist you with:\n\n**Financial Services:**\n• Budget optimization\n• Investment strategies\n• Crypto & currency rates\n• Debt management\n\n**Personal Assistance:**\n• Goal planning\n• Motivation & inspiration\n• Interesting facts\n• Life advice\n\n*Try rephrasing your question, or ask me about any of the above topics!* 💫`;
        }

        // For any other input
        return `${intro}\n\n**I'm SamAgent** — your intelligent assistant.\n\nHere's what I excel at:\n\n💹 "What's Bitcoin price?"\n💱 "1 USDT to INR?"\n📊 "Analyze my spending"\n💰 "How can I save more?"\n🎯 "Help me plan my goals"\n💡 "Motivate me"\n😂 "Tell me a joke"\n\n*Feel free to ask anything! I'm here to help.* 🚀`;
    };

    return { generateResponse, getSummary, getCategoryBreakdown };
}
