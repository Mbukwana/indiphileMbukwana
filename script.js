document.addEventListener('DOMContentLoaded', function() {
    const chatbotBtn = document.getElementById('chatbot-btn');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('close-btn');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatContent = document.getElementById('chat-content');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});


    const responses = {
        'hello': 'Hi there! I\'m excited to help you learn more about **Indiphile**!',
        'hi': 'Hello! Welcome to **Indiphile\'s Portfolio**. What would you like to know?',
        'about': "**Indiphile** is a passionate IT graduate with expertise in **software development**, **network administration**, and **cybersecurity**. Would you like to know more about his specific skills or education?",
        'contact': 'You can reach **Indiphile** at:\n**Email:** indiphilembukwane@gmail.com\n**Phone:** 0655176820\n**Connect:** LinkedIn',
        'skills': '**Technical Skills:**\n• **Python**, **Java**, **C++**\n• **Web Development**\n• **Database Management**\n• **Network Administration**\n• **Cybersecurity**',
        'education': '**Educational Background:**\n• **Diploma in Information Technology** - Walter Sisulu University (2019-2021)\n• **First-Class Graduate**\n• Specialized in **Software Development**',
        'experience': '**Indiphile** has hands-on experience in **software development** projects and **system analysis**. Would you like specific project details?',
        'default': "I'd be happy to tell you about **Indiphile's** **skills**, **education**, **experience**  or provide **contact** information. What interests you most?"
    };

    function formatMessage(message) {
        // Convert markdown-style bold to HTML
        message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return message.split('\n').join('<br>');
    }


    function getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = formatMessage(message);
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = getCurrentTime();
        
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(timeDiv);
        chatContent.appendChild(messageDiv);
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    function getBotResponse(input) {
        const lowercaseInput = input.toLowerCase();
        for (let key in responses) {
            if (lowercaseInput.includes(key)) {
                return responses[key];
            }
        }
        return responses.default;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        chatContent.appendChild(typingDiv);
        chatContent.scrollTop = chatContent.scrollHeight;
        return typingDiv;
    }

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            
            const typingIndicator = showTypingIndicator();
            
            setTimeout(() => {
                typingIndicator.remove();
                const response = getBotResponse(message);
                addMessage(response);
            }, 1500);
        }
    }

    // Event Listeners
    chatbotBtn.addEventListener('click', () => {
        chatbotWindow.style.display = 'flex';
        chatbotBtn.style.display = 'none';
    });

    closeBtn.addEventListener('click', () => {
        chatbotWindow.style.display = 'none';
        chatbotBtn.style.display = 'flex';
    });

    sendBtn.addEventListener('click', sendMessage);
    
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            userInput.value = chip.textContent;
            sendMessage();
        });
    });

    // Initial greeting
    setTimeout(() => {
        addMessage("Hello! I'm your portfolio assistant. How can I help you today?");
    }, 500);
});
