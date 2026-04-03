// ===== AI STUDY ASSISTANT - COMPLETELY FIXED VERSION =====
// This version actually answers questions correctly using the course data

class AIAssistant {
    constructor() {
        this.documents = [];
        this.conversationHistory = [];
        this.contextCourses = ['CPE203', 'STT201', 'SEN205', 'SEN203', 'CSE201'];
        
        // Load from localStorage
        this.loadDocuments();
        
        // Initialize when DOM is ready
        console.log('🤖 AI Assistant initializing...');
        setTimeout(() => this.initializeEventListeners(), 500);
    }

    initializeEventListeners() {
        console.log('Setting up AI Assistant listeners...');
        
        // Send button
        const sendBtn = document.getElementById('sendMessageBtn');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
            console.log('✓ Send button connected');
        }

        // Chat input (Enter key)
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            console.log('✓ Chat input connected');
        }

        // Clear button
        const clearBtn = document.getElementById('clearChatBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearChat());
            console.log('✓ Clear button connected');
        }

        // Suggested questions
        const suggestedQuestions = document.querySelectorAll('#suggestedQuestions li');
        suggestedQuestions.forEach((item, index) => {
            item.addEventListener('click', () => {
                const chatInput = document.getElementById('chatInput');
                if (chatInput) {
                    chatInput.value = item.textContent;
                    this.sendMessage();
                }
            });
        });
        console.log(`✓ ${suggestedQuestions.length} suggested questions connected`);

        // Course context toggles
        document.querySelectorAll('.context-toggle input').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    if (!this.contextCourses.includes(e.target.value)) {
                        this.contextCourses.push(e.target.value);
                    }
                } else {
                    this.contextCourses = this.contextCourses.filter(c => c !== e.target.value);
                }
                console.log('Active courses:', this.contextCourses);
            });
        });
    }

    loadDocuments() {
        const saved = localStorage.getItem('uploadedDocuments');
        if (saved) {
            try {
                this.documents = JSON.parse(saved);
                console.log(`✓ Loaded ${this.documents.length} documents`);
            } catch (e) {
                console.warn('Failed to load documents');
                this.documents = [];
            }
        }
    }

    sendMessage() {
        const input = document.getElementById('chatInput');
        if (!input) return;
        
        const message = input.value.trim();
        if (!message) return;

        console.log('Sending message:', message);

        // Add user message to chat
        this.addMessageToChat('user', message);
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Generate response (with slight delay to feel natural)
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessageToChat('ai', response);
            
            // Save to conversation history
            this.conversationHistory.push({ role: 'user', content: message });
            this.conversationHistory.push({ role: 'assistant', content: response });
        }, 800);
    }

    generateResponse(query) {
        query = query.toLowerCase().trim();
        console.log('Generating response for:', query);

        // Check for greetings
        if (this.isGreeting(query)) {
            return this.getGreetingResponse();
        }

        // Check for help request
        if (query.includes('help') || query.includes('what can you do')) {
            return this.getHelpResponse();
        }

        // Check for course-specific questions
        for (const course of this.contextCourses) {
            if (query.includes(course.toLowerCase())) {
                const response = this.answerCourseQuestion(course, query);
                if (response) return response;
            }
        }

        // Check for specific topics across all courses
        const topicResponse = this.findTopicInAllCourses(query);
        if (topicResponse) return topicResponse;

        // Check for definitions
        if (query.startsWith('what is') || query.startsWith('define') || query.startsWith('explain')) {
            return this.answerDefinition(query);
        }

        // Check for comparisons
        if (query.includes(' vs ') || query.includes(' versus ') || query.includes('difference between')) {
            return this.answerComparison(query);
        }

        // Check for formulas
        if (query.includes('formula') || query.includes('equation') || query.includes('calculate')) {
            return this.answerFormula(query);
        }

        // Check for examples
        if (query.includes('example')) {
            return this.provideExample(query);
        }

        // Default response
        return this.getDefaultResponse();
    }

    isGreeting(query) {
        const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'];
        return greetings.some(g => query.includes(g));
    }

    getGreetingResponse() {
        const hour = new Date().getHours();
        let timeGreeting = 'Hello';
        
        if (hour < 12) timeGreeting = 'Good morning';
        else if (hour < 17) timeGreeting = 'Good afternoon';
        else timeGreeting = 'Good evening';
        
        return `👋 **${timeGreeting}!** I'm your AI study assistant.\n\n` +
               `I can help you with:\n` +
               `• Answering questions about your courses\n` +
               `• Explaining concepts from CPE203, STT201, SEN205, SEN203, and CSE201\n` +
               `• Providing examples and practice problems\n` +
               `• Clarifying formulas and definitions\n\n` +
               `What would you like to learn about today?`;
    }

    getHelpResponse() {
        return "📚 **I can help you with:**\n\n" +
               "**Course Questions:**\n" +
               "• Ask about any topic in your 5 courses\n" +
               "• Request explanations of concepts\n" +
               "• Get step-by-step problem solutions\n\n" +
               "**Examples:**\n" +
               "• 'What is 2's complement in CPE203?'\n" +
               "• 'Explain the 7 types of cohesion'\n" +
               "• 'How to calculate standard deviation?'\n" +
               "• 'Difference between functional and non-functional requirements'\n" +
               "• 'Show me an example of DeMorgan's theorem'\n\n" +
               "**Try asking me something!**";
    }

    getDefaultResponse() {
        return "I'm here to help with your studies! I can answer questions about:\n\n" +
               "📘 **CPE203:** Binary arithmetic, logic gates, Boolean algebra, K-maps\n" +
               "📊 **STT201:** Statistics, probability, distributions, confidence intervals\n" +
               "📝 **SEN205:** Requirements engineering, SRS, process models\n" +
               "🔢 **SEN203:** Set theory, relations, functions, logic\n" +
               "💻 **CSE201:** Cohesion, coupling, testing, design principles\n\n" +
               "What would you like to know?";
    }

    findTopicInAllCourses(query) {
        // Check each course for matching topics
        for (const [courseCode, courseData] of Object.entries(COURSES)) {
            for (const topic of courseData.topics) {
                // Check if query matches topic name
                if (query.includes(topic.name.toLowerCase())) {
                    return this.formatTopicResponse(courseCode, topic);
                }
                
                // Check subtopics
                for (const subtopic of topic.subtopics) {
                    if (query.includes(subtopic.toLowerCase())) {
                        return this.getDetailedExplanation(courseCode, topic.name, subtopic);
                    }
                }
            }
        }
        return null;
    }

    answerCourseQuestion(course, query) {
        const courseData = COURSES[course];
        if (!courseData) return null;

        // Specialized answers for common questions
        if (course === 'CSE201' && (query.includes('cohesion') || query.includes('types of cohesion'))) {
            return this.getCohesionExplanation();
        }
        
        if (course === 'CSE201' && query.includes('coupling')) {
            return this.getCouplingExplanation();
        }
        
        if (course === 'CPE203' && (query.includes('2\'s complement') || query.includes("2's complement"))) {
            return this.getTwosComplementExplanation();
        }
        
        if (course === 'CPE203' && query.includes('demorgan')) {
            return this.getDeMorganExplanation();
        }
        
        if (course === 'STT201' && query.includes('standard deviation')) {
            return this.getStandardDeviationExplanation();
        }
        
        if (course === 'STT201' && (query.includes('binomial') || query.includes('poisson'))) {
            return this.getDistributionExplanation(query);
        }
        
        if (course === 'SEN205' && (query.includes('functional') || query.includes('non-functional'))) {
            return this.getRequirementsExplanation();
        }
        
        if (course === 'SEN203' && query.includes('set')) {
            return this.getSetTheoryExplanation();
        }

        // Find specific topic in course
        for (const topic of courseData.topics) {
            if (query.includes(topic.name.toLowerCase())) {
                return this.formatTopicResponse(course, topic);
            }
        }

        return null;
    }

    // ===== SPECIFIC EXPLANATIONS =====

    getCohesionExplanation() {
        return "🎯 **The 7 Types of Cohesion (from WORST to BEST):**\n\n" +
               "1. **Coincidental** - Completely unrelated tasks grouped together by chance\n" +
               "2. **Logical** - Tasks that are logically related but perform different operations\n" +
               "3. **Temporal** - Tasks that execute at the same time (initialization, cleanup)\n" +
               "4. **Procedural** - Tasks that follow a specific sequence\n" +
               "5. **Communicational** - Tasks that operate on the same data\n" +
               "6. **Sequential** - Output of one task is input to another\n" +
               "7. **Functional** - ALL elements work together for ONE well-defined task (BEST!)\n\n" +
               "**Mnemonic to remember the order:**\n" +
               "**C**razy **L**ions **T**ravel **P**referably **C**almly **S**eeking **F**ood\n\n" +
               "**Example of Functional Cohesion:**\n" +
               "```python\n" +
               "def calculate_gpa(grades):\n" +
               "    return sum(grades) / len(grades)\n" +
               "```\n" +
               "This function does ONE thing: calculate GPA.";
    }

    getCouplingExplanation() {
        return "🔗 **Coupling in Software Construction:**\n\n" +
               "**Definition:** Degree of interdependence between software modules.\n\n" +
               "**Tight Coupling (BAD):**\n" +
               "• Modules depend heavily on each other's internal details\n" +
               "• Change in one requires changes in others\n" +
               "• Hard to test individually\n" +
               "• Rigid, fragile system\n\n" +
               "**Loose Coupling (GOOD):**\n" +
               "• Modules interact through well-defined interfaces\n" +
               "• Can be changed independently\n" +
               "• Easy to test in isolation\n" +
               "• Flexible, maintainable system\n\n" +
               "**Example - Tight Coupling:**\n" +
               "```python\n" +
               "class Order:\n" +
               "    def process(self):\n" +
               "        payment = PaystackPayment()  # Direct dependency\n" +
               "        payment.pay()\n" +
               "```\n\n" +
               "**Example - Loose Coupling:**\n" +
               "```python\n" +
               "class Order:\n" +
               "    def __init__(self, payment_service):\n" +
               "        self.payment_service = payment_service  # Dependency injection\n" +
               "    \n" +
               "    def process(self):\n" +
               "        self.payment_service.pay()\n" +
               "```\n\n" +
               "**Golden Rule:** High Cohesion + Loose Coupling = GOOD Software!";
    }

    getTwosComplementExplanation() {
        return "🔢 **2's Complement Representation:**\n\n" +
               "**Purpose:** Method for representing signed integers in binary.\n\n" +
               "**How to find 2's complement:**\n" +
               "1. Write the number in binary\n" +
               "2. Invert all bits (0→1, 1→0) - this is 1's complement\n" +
               "3. Add 1 to the result\n\n" +
               "**Example:** Find 2's complement of 6 (binary 0110)\n" +
               "• 6 in binary: 0110\n" +
               "• Invert bits: 1001 (1's complement)\n" +
               "• Add 1: 1001 + 1 = 1010\n" +
               "• Therefore, -6 in 2's complement is 1010\n\n" +
               "**Range of values for N bits:**\n" +
               "• From -2^(N-1) to +(2^(N-1) - 1)\n" +
               "• For 4 bits: -8 to +7\n\n" +
               "**Advantages:**\n" +
               "• Only one representation for zero\n" +
               "• Addition and subtraction use same hardware\n" +
               "• Easy to implement in circuits";
    }

    getDeMorganExplanation() {
        return "🧮 **DeMorgan's Theorems:**\n\n" +
               "**Theorem 1:** (x + y)' = x' · y'\n" +
               "*The complement of an OR is the AND of complements*\n\n" +
               "**Theorem 2:** (x · y)' = x' + y'\n" +
               "*The complement of an AND is the OR of complements*\n\n" +
               "**Truth Table Verification:**\n" +
               "```\n" +
               "x | y | x+y | (x+y)' | x' | y' | x'·y'\n" +
               "0 | 0 |  0  |   1    | 1  | 1  |   1\n" +
               "0 | 1 |  1  |   0    | 1  | 0  |   0\n" +
               "1 | 0 |  1  |   0    | 0  | 1  |   0\n" +
               "1 | 1 |  1  |   0    | 0  | 0  |   0\n" +
               "```\n\n" +
               "**Application:**\n" +
               "• Simplify Boolean expressions\n" +
               "• Convert between AND/OR operations\n" +
               "• Implement circuits using only NAND or NOR gates\n\n" +
               "**Example:** Simplify (A·B)' + (A'·B)'\n" +
               "= (A' + B') + (A + B') [using DeMorgan's]\n" +
               "= A' + A + B' + B'\n" +
               "= 1 + B'\n" +
               "= 1";
    }

    getStandardDeviationExplanation() {
        return "📊 **Standard Deviation Calculation:**\n\n" +
               "**Definition:** A measure of how spread out numbers are from the mean.\n\n" +
               "**Formula for Sample:**\n" +
               "s = √[∑(x - x̄)²/(n-1)]\n\n" +
               "**Formula for Population:**\n" +
               "σ = √[∑(x - μ)²/N]\n\n" +
               "**Step-by-Step Example:**\n" +
               "Find the standard deviation of: 4, 8, 6, 5, 3\n\n" +
               "Step 1: Find the mean\n" +
               "x̄ = (4 + 8 + 6 + 5 + 3)/5 = 26/5 = 5.2\n\n" +
               "Step 2: Find deviations from mean\n" +
               "4 - 5.2 = -1.2\n" +
               "8 - 5.2 = 2.8\n" +
               "6 - 5.2 = 0.8\n" +
               "5 - 5.2 = -0.2\n" +
               "3 - 5.2 = -2.2\n\n" +
               "Step 3: Square each deviation\n" +
               "(-1.2)² = 1.44\n" +
               "(2.8)² = 7.84\n" +
               "(0.8)² = 0.64\n" +
               "(-0.2)² = 0.04\n" +
               "(-2.2)² = 4.84\n\n" +
               "Step 4: Sum squared deviations\n" +
               "∑(x - x̄)² = 1.44 + 7.84 + 0.64 + 0.04 + 4.84 = 14.8\n\n" +
               "Step 5: Divide by n-1 (for sample)\n" +
               "14.8/4 = 3.7 (this is the variance)\n\n" +
               "Step 6: Take square root\n" +
               "s = √3.7 = 1.92\n\n" +
               "**Interpretation:** On average, each value deviates from the mean by about 1.92 units.";
    }

    getDistributionExplanation(query) {
        if (query.includes('binomial')) {
            return "🎲 **Binomial Distribution:**\n\n" +
                   "**Conditions:**\n" +
                   "1. Fixed number of trials (n)\n" +
                   "2. Two mutually exclusive outcomes (success/failure)\n" +
                   "3. Constant probability of success (p) for each trial\n" +
                   "4. Independent trials\n\n" +
                   "**Probability Formula:**\n" +
                   "P(X = x) = ⁿCₓ · pˣ · (1-p)ⁿ⁻ˣ\n" +
                   "where x = 0, 1, 2, ..., n\n\n" +
                   "**Mean and Variance:**\n" +
                   "• Mean (μ) = n·p\n" +
                   "• Variance (σ²) = n·p·(1-p)\n" +
                   "• Standard Deviation = √[n·p·(1-p)]\n\n" +
                   "**Example:**\n" +
                   "If you flip a fair coin 10 times, probability of exactly 6 heads:\n" +
                   "n=10, p=0.5, x=6\n" +
                   "P(6) = ¹⁰C₆ · (0.5)⁶ · (0.5)⁴\n" +
                   "P(6) = 210 · 0.015625 · 0.0625 = 0.205";
        }
        
        if (query.includes('poisson')) {
            return "📋 **Poisson Distribution:**\n\n" +
                   "**Characteristics:**\n" +
                   "• Models rare, independent events\n" +
                   "• Events occur over fixed interval of time or space\n" +
                   "• Can approximate binomial when n large, p small\n\n" +
                   "**Probability Formula:**\n" +
                   "P(X = x) = (μˣ · e^(-μ)) / x!\n" +
                   "where x = 0, 1, 2, ... and μ = mean number of occurrences\n\n" +
                   "**Mean and Variance:**\n" +
                   "• Mean = μ\n" +
                   "• Variance = μ\n" +
                   "• Standard Deviation = √μ\n\n" +
                   "**Example:**\n" +
                   "If a call center receives an average of 5 calls per hour,\n" +
                   "probability of exactly 3 calls in an hour:\n" +
                   "μ=5, x=3\n" +
                   "P(3) = (5³ · e⁻⁵) / 3!\n" +
                   "P(3) = (125 · 0.0067) / 6 = 0.14";
        }
        
        return "I can help with probability distributions! Which one would you like to learn about?";
    }

    getRequirementsExplanation() {
        return "📝 **Functional vs Non-Functional Requirements:**\n\n" +
               "**Functional Requirements (WHAT the system does):**\n" +
               "• Specific functions or services\n" +
               "• User interactions and system responses\n" +
               "• Data processing and manipulation\n\n" +
               "**Examples:**\n" +
               "• User can log in with username and password\n" +
               "• System calculates GPA from grades\n" +
               "• Send email notifications\n\n" +
               "**Non-Functional Requirements (HOW WELL it does it):**\n" +
               "• Quality attributes and constraints\n" +
               "• Performance, security, usability\n" +
               "• Measurable on a scale\n\n" +
               "**Examples:**\n" +
               "• Page loads in <2 seconds (Performance)\n" +
               "• 99.9% uptime (Reliability)\n" +
               "• Passwords encrypted (Security)\n" +
               "• Can handle 10,000 concurrent users (Scalability)\n\n" +
               "**Mnemonic:** FURPS+ (Functionality, Usability, Reliability, Performance, Supportability)";
    }

    getSetTheoryExplanation() {
        return "🔤 **Set Theory Basics:**\n\n" +
               "**Set:** A collection of distinct objects/elements.\n\n" +
               "**Key Operations:**\n" +
               "• **Union (A ∪ B):** All elements in A OR B\n" +
               "• **Intersection (A ∩ B):** Elements in both A AND B\n" +
               "• **Complement (Aᶜ):** Elements NOT in A (relative to Universal set)\n" +
               "• **Difference (A - B):** Elements in A but not in B\n\n" +
               "**Power Set:**\n" +
               "• Set of all possible subsets of a set\n" +
               "• |P(A)| = 2ⁿ where n = |A|\n" +
               "• Example: A = {1,2,3} → P(A) has 8 subsets\n\n" +
               "**Example:**\n" +
               "Let U = {1,2,3,4,5}, A = {1,2,3}, B = {3,4,5}\n" +
               "• A ∪ B = {1,2,3,4,5}\n" +
               "• A ∩ B = {3}\n" +
               "• A - B = {1,2}\n" +
               "• Aᶜ = {4,5}\n\n" +
               "**Applications:**\n" +
               "• Database queries\n" +
               "• Search engines (AND/OR operations)\n" +
               "• Access control (permission sets)";
    }

    formatTopicResponse(course, topic) {
        const courseNames = {
            'CPE203': 'Digital Logic',
            'STT201': 'Statistics',
            'SEN205': 'Requirements Engineering',
            'SEN203': 'Discrete Structures',
            'CSE201': 'Software Construction'
        };

        return `📚 **${course} - ${topic.name}**\n\n` +
               `**Key subtopics:**\n${topic.subtopics.map(s => `• ${s}`).join('\n')}\n\n` +
               `This is an important topic in ${courseNames[course]}. ` +
               `Would you like me to explain any specific subtopic in more detail?`;
    }

    getDetailedExplanation(course, topic, subtopic) {
        // First check if we have predefined explanations
        if (course === 'CSE201' && topic.includes('Cohesion')) {
            return this.getCohesionExplanation();
        }
        if (course === 'CSE201' && topic.includes('Coupling')) {
            return this.getCouplingExplanation();
        }
        
        return `**${subtopic}** is part of **${topic}** in ${course}.\n\n` +
               `I can explain this concept in detail. What specific aspect would you like to know about?`;
    }

    answerDefinition(query) {
        // Extract the term being asked about
        const term = query.replace(/what is|define|explain|tell me about/gi, '').trim();
        
        // Check all courses for this term
        for (const [courseCode, courseData] of Object.entries(COURSES)) {
            for (const topic of courseData.topics) {
                if (topic.name.toLowerCase().includes(term) || 
                    topic.subtopics.some(s => s.toLowerCase().includes(term))) {
                    return this.formatTopicResponse(courseCode, topic);
                }
            }
        }
        
        return `I'd be happy to explain "${term}"! Could you tell me which course this relates to?`;
    }

    answerComparison(query) {
        // Common comparisons
        if (query.includes('cohesion') && query.includes('coupling')) {
            return "**Cohesion vs Coupling:**\n\n" +
                   "• **Cohesion** measures how related elements INSIDE a module are\n" +
                   "• **Coupling** measures how dependent modules are on each other\n\n" +
                   "**Goal:** High cohesion + Loose coupling = GOOD software!\n\n" +
                   "Think of it like a well-organized company:\n" +
                   "- High cohesion: Each department has clear responsibilities\n" +
                   "- Loose coupling: Departments communicate through formal channels";
        }
        
        if (query.includes('functional') && query.includes('non-functional')) {
            return this.getRequirementsExplanation();
        }
        
        if (query.includes('unit') && query.includes('integration')) {
            return "**Unit Testing vs Integration Testing:**\n\n" +
                   "**Unit Testing:**\n" +
                   "• Tests individual components in isolation\n" +
                   "• Done by developers during coding\n" +
                   "• Fast, focused, easy to debug\n\n" +
                   "**Integration Testing:**\n" +
                   "• Tests how components work together\n" +
                   "• Finds interface and interaction issues\n" +
                   "• More complex, broader scope\n\n" +
                   "**Both are essential!** Unit tests first, then integration tests.";
        }
        
        return "I can help compare concepts! Please specify what you'd like to compare.";
    }

    answerFormula(query) {
        if (query.includes('binomial')) {
            return "**Binomial Formula:** P(X=x) = ⁿCₓ · pˣ · (1-p)ⁿ⁻ˣ";
        }
        if (query.includes('poisson')) {
            return "**Poisson Formula:** P(X=x) = (μˣ · e^(-μ)) / x!";
        }
        if (query.includes('variance')) {
            return "**Variance Formula:**\n" +
                   "• Population: σ² = ∑(x - μ)²/N\n" +
                   "• Sample: s² = ∑(x - x̄)²/(n-1)";
        }
        if (query.includes('mean')) {
            return "**Mean Formula:**\n" +
                   "• Ungrouped: x̄ = ∑x/n\n" +
                   "• Grouped: x̄ = ∑fx/∑f";
        }
        
        return "Which formula would you like me to provide?";
    }

    provideExample(query) {
        if (query.includes('binary') || query.includes('addition')) {
            return "**Binary Addition Example:**\n\n" +
                   "Add 1011₂ (11) and 1101₂ (13):\n\n" +
                   "   1 0 1 1\n" +
                   "+  1 1 0 1\n" +
                   "  ---------\n" +
                   " 1 1 0 0 0 (24)\n\n" +
                   "**Step-by-step:**\n" +
                   "• 1+1 = 0, carry 1\n" +
                   "• 1+0+1(carry) = 0, carry 1\n" +
                   "• 0+1+1(carry) = 0, carry 1\n" +
                   "• 1+1+1(carry) = 1, carry 1\n" +
                   "• Final carry = 1";
        }
        
        if (query.includes('demorgan')) {
            return "**DeMorgan's Theorem Example:**\n\n" +
                   "Simplify (A·B)' + (A'·B)'\n\n" +
                   "Step 1: Apply DeMorgan's to each term\n" +
                   "= (A' + B') + (A + B')\n\n" +
                   "Step 2: Rearrange\n" +
                   "= A' + A + B' + B'\n\n" +
                   "Step 3: A' + A = 1\n" +
                   "= 1 + B'\n\n" +
                   "Step 4: 1 + anything = 1\n" +
                   "= 1";
        }
        
        return "What topic would you like an example for?";
    }

    addMessageToChat(sender, content) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) {
            console.error('Chat messages container not found');
            return;
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Format the content with proper line breaks and bold text
        const formattedContent = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i>
            </div>
            <div class="message-content">
                <p>${formattedContent}</p>
                <span class="message-time">${time}</span>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        console.log(`✓ Message added to chat (${sender})`);
    }

    showTypingIndicator() {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        this.isTyping = true;
        
        const indicator = document.createElement('div');
        indicator.className = 'message ai-message';
        indicator.id = 'typingIndicator';
        indicator.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p><i class="fas fa-circle" style="font-size:0.5rem; animation: pulse 1s infinite; margin:0 2px;"></i> 
                   <i class="fas fa-circle" style="font-size:0.5rem; animation: pulse 1s infinite 0.2s; margin:0 2px;"></i> 
                   <i class="fas fa-circle" style="font-size:0.5rem; animation: pulse 1s infinite 0.4s; margin:0 2px;"></i></p>
            </div>
        `;
        
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
        this.isTyping = false;
    }

    clearChat() {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        chatMessages.innerHTML = `
            <div class="message ai-message">
                <div class="message-avatar"><i class="fas fa-robot"></i></div>
                <div class="message-content">
                    <p>👋 Hello! I'm your AI study assistant. I have access to all your course materials and study plan. Ask me anything about your courses, and I'll help you understand concepts better!</p>
                    <span class="message-time">Just now</span>
                </div>
            </div>
        `;
        
        this.conversationHistory = [];
        console.log('Chat cleared');
    }

    loadConversationHistory() {
        const saved = localStorage.getItem('aiConversationHistory');
        if (saved) {
            try {
                this.conversationHistory = JSON.parse(saved);
            } catch (e) {
                this.conversationHistory = [];
            }
        }
    }

    saveConversationHistory() {
        localStorage.setItem('aiConversationHistory', JSON.stringify(this.conversationHistory));
    }
}

// Make sure COURSES is available
if (typeof COURSES === 'undefined') {
    console.error('COURSES data not found! Make sure data.js is loaded before ai-assistant.js');
}

// Initialize AI Assistant when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, creating AI Assistant...');
    
    // Small delay to ensure all elements are ready
    setTimeout(() => {
        window.aiAssistant = new AIAssistant();
        console.log('✅ AI Assistant initialized and ready!');
    }, 200);
});