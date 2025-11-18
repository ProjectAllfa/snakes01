// Map bot names to image filenames
function getBotImagePath(botName) {
    const imageMap = {
        'ViperCore': 'vipercore.png',
        'CoilSentinel': 'coilsentinal.png',
        'IronFang': 'ironfang.png',
        'MechaSeraph': 'mechaseraph.png'
    };
    return imageMap[botName] || null;
}

// Load bot names, images, and wallets
async function loadBotNames() {
    try {
        const [botNamesResponse, walletsResponse] = await Promise.all([
            fetch('bot_names.json'),
            fetch('public_wallets.json')
        ]);
        
        const botNames = await botNamesResponse.json();
        const wallets = await walletsResponse.json();
        
        // Bot 1
        const bot1Name = botNames.bot1 || 'Bot 1';
        document.getElementById('bot1Name').textContent = bot1Name;
        const bot1Image = getBotImagePath(bot1Name);
        if (bot1Image) {
            document.getElementById('bot1Image').src = `/assets/full/${bot1Image}`;
        }
        if (wallets.bot1 && wallets.bot1.public) {
            document.getElementById('bot1Wallet').textContent = wallets.bot1.public;
        }
        
        // Bot 2
        const bot2Name = botNames.bot2 || 'Bot 2';
        document.getElementById('bot2Name').textContent = bot2Name;
        const bot2Image = getBotImagePath(bot2Name);
        if (bot2Image) {
            document.getElementById('bot2Image').src = `/assets/full/${bot2Image}`;
        }
        if (wallets.bot2 && wallets.bot2.public) {
            document.getElementById('bot2Wallet').textContent = wallets.bot2.public;
        }
        
        // Bot 3
        const bot3Name = botNames.bot3 || 'Bot 3';
        document.getElementById('bot3Name').textContent = bot3Name;
        const bot3Image = getBotImagePath(bot3Name);
        if (bot3Image) {
            document.getElementById('bot3Image').src = `/assets/full/${bot3Image}`;
        }
        if (wallets.bot3 && wallets.bot3.public) {
            document.getElementById('bot3Wallet').textContent = wallets.bot3.public;
        }
        
        // Bot 4
        const bot4Name = botNames.bot4 || 'Bot 4';
        document.getElementById('bot4Name').textContent = bot4Name;
        const bot4Image = getBotImagePath(bot4Name);
        if (bot4Image) {
            document.getElementById('bot4Image').src = `/assets/full/${bot4Image}`;
        }
        if (wallets.bot4 && wallets.bot4.public) {
            document.getElementById('bot4Wallet').textContent = wallets.bot4.public;
        }
    } catch (error) {
        console.error('Error loading bot names:', error);
        // Fallback names
        document.getElementById('bot1Name').textContent = 'Bot 1';
        document.getElementById('bot2Name').textContent = 'Bot 2';
        document.getElementById('bot3Name').textContent = 'Bot 3';
        document.getElementById('bot4Name').textContent = 'Bot 4';
    }
}

// Copy wallet address to clipboard
async function copyWalletAddress(botId) {
    const walletElement = document.getElementById(`${botId}Wallet`);
    const copyButton = document.querySelector(`[data-wallet="${botId}"]`);
    
    if (!walletElement || !copyButton) return;
    
    const walletAddress = walletElement.textContent;
    if (!walletAddress || walletAddress === '-') return;
    
    try {
        await navigator.clipboard.writeText(walletAddress);
        
        // Visual feedback
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        copyButton.classList.add('copied');
        
        setTimeout(() => {
            copyButton.textContent = originalText;
            copyButton.classList.remove('copied');
        }, 2000);
    } catch (error) {
        console.error('Failed to copy wallet address:', error);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = walletAddress;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            copyButton.textContent = 'Copied!';
            copyButton.classList.add('copied');
            setTimeout(() => {
                copyButton.textContent = 'Copy';
                copyButton.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Fallback copy failed:', err);
        }
        document.body.removeChild(textArea);
    }
}

// Initialize copy button event listeners
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const botId = button.getAttribute('data-wallet');
            copyWalletAddress(botId);
        });
    });
}

// How it works messages
const howItWorksMessages = [
    "1. Copy the wallet address of the bot you want to bet on",
    "2. Send any amount of SOL to that address to lock in your bet (no wallet connect required)",
    "3. The last bot that remains alive wins, and funds will be automatically sent to winners"
];

let currentMessageIndex = 0;
let messageInterval = null;

// Rotate how it works messages
function rotateHowItWorksMessage() {
    const messageElement = document.getElementById('howItWorksMessage');
    if (!messageElement) return;
    
    // Fade out
    messageElement.classList.add('fade-out');
    
    setTimeout(() => {
        // Update message
        currentMessageIndex = (currentMessageIndex + 1) % howItWorksMessages.length;
        messageElement.textContent = howItWorksMessages[currentMessageIndex];
        
        // Fade in
        messageElement.classList.remove('fade-out');
        messageElement.classList.add('fade-in');
        
        setTimeout(() => {
            messageElement.classList.remove('fade-in');
        }, 500);
    }, 500);
}

// Initialize how it works rotation
function initHowItWorks() {
    const messageElement = document.getElementById('howItWorksMessage');
    if (messageElement) {
        messageElement.textContent = howItWorksMessages[0];
        // Start rotating every 5 seconds
        messageInterval = setInterval(rotateHowItWorksMessage, 5000);
    }
}

// Initialize landing page
loadBotNames().then(() => {
    initCopyButtons();
});
initHowItWorks();


