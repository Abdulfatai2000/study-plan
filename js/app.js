// ===== MAIN APPLICATION =====

class StudyMasterApp {
    constructor() {
        this.state = this.loadState();
        this.currentCourse = 'all';
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.updateUI();
        this.startAutoSave();
        this.checkDailyStreak();
        this.updateMotivationalQuote();
        this.renderDailyPlan();
        this.updateDashboard();
        this.setupFileUpload();
        this.initializePomodoro();
    }

    loadState() {
        const defaultState = {
            theme: 'light',
            dailyGoal: 8,
            weeklyGoal: 40,
            pomodoroWork: 25,
            pomodoroBreak: 5,
            completedTopics: {},
            notes: [],
            streak: 0,
            lastActive: new Date().toDateString(),
            uploadedDocuments: [],
            studySessions: [],
            settings: {
                notifications: true,
                breakReminders: true,
                compactView: false
            }
        };

        const saved = localStorage.getItem('studyMasterState');
        return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState;
    }

    saveState() {
        localStorage.setItem('studyMasterState', JSON.stringify(this.state));
    }

    startAutoSave() {
        // Auto-save every 30 seconds
        setInterval(() => this.saveState(), 30000);
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => this.switchSection(e));
        });

        // Course tabs
        document.querySelectorAll('.course-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchCourse(e));
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());

        // Settings
        document.getElementById('dailyGoal').addEventListener('change', (e) => {
            this.state.dailyGoal = parseInt(e.target.value);
            this.saveState();
        });

        document.getElementById('resetDataBtn').addEventListener('click', () => this.resetAllData());

        // Dark mode toggle in settings
        document.getElementById('darkModeToggle').addEventListener('change', (e) => {
            this.state.theme = e.target.checked ? 'dark' : 'light';
            this.applyTheme();
            this.saveState();
        });

        // Expand/collapse all days
        document.getElementById('expandAllDays')?.addEventListener('click', () => this.toggleAllDays(true));
        document.getElementById('collapseAllDays')?.addEventListener('click', () => this.toggleAllDays(false));

        // Study session button
        document.getElementById('startStudySession')?.addEventListener('click', () => this.startStudySession());

        // Export/Import data
        document.getElementById('exportDataBtn')?.addEventListener('click', () => this.exportData());
        document.getElementById('importDataBtn')?.addEventListener('click', () => this.importData());
    }

    switchSection(event) {
        const target = event.currentTarget;
        const sectionId = target.dataset.section;

        // Update active nav
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        target.classList.add('active');

        // Show selected section
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active-section'));
        document.getElementById(sectionId).classList.add('active-section');

        // Refresh charts if progress section
        if (sectionId === 'progress' && window.progressCharts) {
            window.progressCharts.refreshAllCharts();
        }
    }

    switchCourse(event) {
        const target = event.currentTarget;
        const course = target.dataset.course;

        // Update active course tab
        document.querySelectorAll('.course-tab').forEach(t => t.classList.remove('active'));
        target.classList.add('active');

        this.currentCourse = course;

        // Filter content based on course
        this.filterContentByCourse(course);
    }

    filterContentByCourse(course) {
        // Filter daily plan topics
        if (course === 'all') {
            document.querySelectorAll('.topic-row').forEach(row => row.style.display = 'flex');
        } else {
            document.querySelectorAll('.topic-row').forEach(row => {
                const courseSpan = row.querySelector('.topic-course');
                if (courseSpan && courseSpan.textContent.trim() === course.toUpperCase()) {
                    row.style.display = 'flex';
                } else {
                    row.style.display = 'none';
                }
            });
        }
    }

    toggleTheme() {
        this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        this.saveState();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.state.theme);
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.innerHTML = this.state.theme === 'dark' ? 
                '<i class="fas fa-sun"></i>' : 
                '<i class="fas fa-moon"></i>';
        }
        
        // Update dark mode checkbox in settings
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.checked = this.state.theme === 'dark';
        }
    }

    updateUI() {
        this.applyTheme();
        this.updateGreeting();
        this.updateDate();
        this.updateCountdowns();
        this.renderNotes();
        this.updateStreakDisplay();
    }

    updateGreeting() {
        const hour = new Date().getHours();
        let greeting = 'Good evening';
        
        if (hour < 12) greeting = 'Good morning';
        else if (hour < 17) greeting = 'Good afternoon';
        
        document.getElementById('greeting').textContent = greeting;
    }

    updateDate() {
        const date = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('currentDate').textContent = date.toLocaleDateString('en-US', options);
    }

    updateCountdowns() {
        const exams = {
            CPE203: '2025-02-25',
            STT201: '2025-03-04',
            SEN205: '2025-03-07',
            SEN203: '2025-03-10',
            CSE201: '2025-03-13'
        };

        const grid = document.getElementById('countdownGrid');
        if (!grid) return;

        let html = '';
        for (const [course, dateStr] of Object.entries(exams)) {
            const daysLeft = this.daysUntil(dateStr);
            const isUrgent = daysLeft <= 3;
            
            html += `
                <div class="countdown-item ${isUrgent ? 'urgent' : ''}">
                    <span class="countdown-value">${daysLeft}d</span>
                    <span class="countdown-label">${course}</span>
                </div>
            `;
        }
        grid.innerHTML = html;
    }

    daysUntil(dateStr) {
        const target = new Date(dateStr);
        const today = new Date();
        const diff = target - today;
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    renderDailyPlan() {
        const container = document.getElementById('dailyPlanContainer');
        if (!container) return;

        const today = new Date().toISOString().split('T')[0];
        
        let html = '';
        STUDY_PLAN.forEach(day => {
            const isToday = day.date === today;
            const completedCount = day.topics.filter(t => 
                this.state.completedTopics[`d${day.day}t${t.topic}`]
            ).length;
            const totalCount = day.topics.length;
            const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

            html += `
                <div class="day-card" data-day="${day.day}">
                    <div class="day-header">
                        <div class="day-title">
                            <span><strong>Day ${day.day}</strong> (${this.formatDate(day.date)})</span>
                            ${isToday ? '<span class="current-day-badge">TODAY</span>' : ''}
                        </div>
                        <div class="day-progress">
                            <span class="badge ${progressPercent === 100 ? 'success' : 'warning'}">
                                ${completedCount}/${totalCount}
                            </span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                    </div>
                    <div class="day-content ${isToday ? 'expanded' : ''}">
            `;

            day.topics.forEach(topic => {
                const completed = this.state.completedTopics[`d${day.day}t${topic.topic}`];
                html += this.renderTopicRow(day.day, topic, completed);
            });

            html += `
                        <div class="day-summary">
                            <small>Total hours: ${day.totalHours} | 
                            Completed: ${this.calculateCompletedHours(day)} hrs</small>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        this.attachTopicListeners();
    }

    renderTopicRow(day, topic, completed) {
        return `
            <div class="topic-row ${completed ? 'completed-topic' : 'pending-topic'}">
                <span class="topic-time">${topic.time}</span>
                <span class="topic-course ${topic.course.toLowerCase()}">${topic.course}</span>
                <div class="topic-details">
                    <div class="topic-name">${topic.topic}</div>
                    <div class="topic-sub">${topic.subtopics.join(' • ')}</div>
                </div>
                <div class="topic-priority">
                    ${'⭐'.repeat(topic.priority)}
                </div>
                <div class="topic-actions">
                    <input type="checkbox" 
                           data-day="${day}" 
                           data-topic="${topic.topic}"
                           ${completed ? 'checked' : ''}>
                    <i class="fas fa-info-circle" title="${topic.activities}"></i>
                </div>
            </div>
        `;
    }

    attachTopicListeners() {
        document.querySelectorAll('.topic-actions input[type=checkbox]').forEach(cb => {
            cb.addEventListener('change', (e) => {
                const day = e.target.dataset.day;
                const topic = e.target.dataset.topic;
                const key = `d${day}t${topic}`;
                
                if (e.target.checked) {
                    this.state.completedTopics[key] = true;
                    this.showNotification('✅ Topic completed!', 'success');
                } else {
                    delete this.state.completedTopics[key];
                }
                
                this.saveState();
                this.updateDashboard();
                
                // Update row styling
                const row = e.target.closest('.topic-row');
                if (row) {
                    row.classList.toggle('completed-topic', e.target.checked);
                    row.classList.toggle('pending-topic', !e.target.checked);
                }
            });
        });

        // Info icon tooltips
        document.querySelectorAll('.fa-info-circle').forEach(icon => {
            icon.addEventListener('mouseenter', (e) => {
                // Show tooltip
            });
        });
    }

    updateDashboard() {
        this.updateTodayProgress();
        this.updateOverallProgress();
        this.renderTodaySchedule();
    }

    updateTodayProgress() {
        const today = new Date().toISOString().split('T')[0];
        const todayPlan = STUDY_PLAN.find(d => d.date === today);
        
        if (!todayPlan) return;

        const completedCount = todayPlan.topics.filter(t => 
            this.state.completedTopics[`d${todayPlan.day}t${t.topic}`]
        ).length;
        
        const totalCount = todayPlan.topics.length;
        const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
        
        const completedHours = this.calculateCompletedHours(todayPlan);
        
        document.getElementById('todayHours').textContent = 
            `${completedHours}/${todayPlan.totalHours} hrs`;
        document.getElementById('todayProgressFill').style.width = `${progressPercent}%`;
        document.getElementById('todayTasks').textContent = 
            `${completedCount}/${totalCount} tasks`;
    }

    calculateCompletedHours(day) {
        let hours = 0;
        day.topics.forEach(topic => {
            if (this.state.completedTopics[`d${day.day}t${topic.topic}`]) {
                // Each topic block is approximately 1.5 hours
                hours += 1.5;
            }
        });
        return hours;
    }

    updateOverallProgress() {
        let totalTopics = 0;
        let completedTopics = 0;

        STUDY_PLAN.forEach(day => {
            day.topics.forEach(topic => {
                totalTopics++;
                if (this.state.completedTopics[`d${day.day}t${topic.topic}`]) {
                    completedTopics++;
                }
            });
        });

        const percent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
        
        document.getElementById('overallProgress').textContent = `${percent}%`;
        document.getElementById('completedTopics').textContent = completedTopics;
        document.getElementById('totalTopics').textContent = totalTopics;

        // Update course progress badges
        this.updateCourseProgress();
    }

    updateCourseProgress() {
        const courses = ['CPE203', 'STT201', 'SEN205', 'SEN203', 'CSE201'];
        
        courses.forEach(course => {
            let courseTotal = 0;
            let courseCompleted = 0;
            
            STUDY_PLAN.forEach(day => {
                day.topics.forEach(topic => {
                    if (topic.course === course) {
                        courseTotal++;
                        if (this.state.completedTopics[`d${day.day}t${topic.topic}`]) {
                            courseCompleted++;
                        }
                    }
                });
            });
            
            const percent = courseTotal > 0 ? Math.round((courseCompleted / courseTotal) * 100) : 0;
            const badge = document.getElementById(`${course.toLowerCase()}Progress`);
            if (badge) {
                badge.textContent = `${percent}%`;
            }
        });

        // All courses progress
        const allProgress = document.getElementById('allProgress');
        if (allProgress) {
            const overall = document.getElementById('overallProgress').textContent;
            allProgress.textContent = overall;
        }
    }

    renderTodaySchedule() {
        const today = new Date().toISOString().split('T')[0];
        const todayPlan = STUDY_PLAN.find(d => d.date === today);
        const container = document.getElementById('todaySchedule');
        
        if (!container || !todayPlan) return;

        let html = '';
        todayPlan.topics.forEach(topic => {
            const completed = this.state.completedTopics[`d${todayPlan.day}t${topic.topic}`];
            html += `
                <div class="schedule-item ${completed ? 'completed-topic' : ''}">
                    <span class="schedule-time">${topic.time}</span>
                    <span class="schedule-course ${topic.course.toLowerCase()}">${topic.course}</span>
                    <div class="schedule-details">
                        <div class="schedule-topic">${topic.topic}</div>
                        <div class="schedule-subtopic">${topic.subtopics[0]}</div>
                    </div>
                    <span class="schedule-priority">${'⭐'.repeat(topic.priority)}</span>
                    <input type="checkbox" class="schedule-check" 
                           data-day="${todayPlan.day}" 
                           data-topic="${topic.topic}"
                           ${completed ? 'checked' : ''}>
                </div>
            `;
        });

        container.innerHTML = html;

        // Attach listeners to schedule checkboxes
        container.querySelectorAll('.schedule-check').forEach(cb => {
            cb.addEventListener('change', (e) => {
                const day = e.target.dataset.day;
                const topic = e.target.dataset.topic;
                const key = `d${day}t${topic}`;
                
                if (e.target.checked) {
                    this.state.completedTopics[key] = true;
                } else {
                    delete this.state.completedTopics[key];
                }
                
                this.saveState();
                this.updateDashboard();
                this.renderDailyPlan();
            });
        });
    }

    updateStreakDisplay() {
        const streak = this.state.streak || 0;
        document.getElementById('streakCount').textContent = streak;

        // Show badges based on streak
        const badgesContainer = document.getElementById('streakBadges');
        if (!badgesContainer) return;

        let badges = '';
        if (streak >= 3) {
            badges += '<span class="badge warning">🔥 3-Day Streak</span>';
        }
        if (streak >= 7) {
            badges += '<span class="badge primary">⚡ 7-Day Streak</span>';
        }
        if (streak >= 14) {
            badges += '<span class="badge success">🏆 14-Day Streak</span>';
        }
        badgesContainer.innerHTML = badges;
    }

    checkDailyStreak() {
        const today = new Date().toDateString();
        
        if (this.state.lastActive === today) {
            // Already checked today
            return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (this.state.lastActive === yesterday.toDateString()) {
            // Studied yesterday, increment streak
            this.state.streak = (this.state.streak || 0) + 1;
            this.showNotification(`🔥 ${this.state.streak}-day streak! Keep going!`, 'success');
        } else {
            // Missed a day, reset streak
            this.state.streak = 1;
        }

        this.state.lastActive = today;
        this.saveState();
        this.updateStreakDisplay();
    }

    updateMotivationalQuote() {
        const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
        document.getElementById('motivationalQuote').textContent = MOTIVATIONAL_QUOTES[randomIndex];
        
        // Rotate quote every 24 hours
        setInterval(() => {
            const newIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
            document.getElementById('motivationalQuote').textContent = MOTIVATIONAL_QUOTES[newIndex];
        }, 24 * 60 * 60 * 1000);
    }

    setupFileUpload() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const uploadBtn = document.getElementById('uploadBtn');

        if (!uploadArea || !fileInput || !uploadBtn) return;

        uploadArea.addEventListener('click', () => fileInput.click());

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--accent-primary)';
            uploadArea.style.background = 'var(--bg-tertiary)';
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = 'var(--border-medium)';
            uploadArea.style.background = 'var(--bg-secondary)';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--border-medium)';
            uploadArea.style.background = 'var(--bg-secondary)';
            
            const files = e.dataTransfer.files;
            this.handleFiles(files);
        });

        uploadBtn.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });
    }

    handleFiles(files) {
        Array.from(files).forEach(file => {
            if (file.type === 'application/pdf' || 
                file.type.includes('text') || 
                file.type.includes('document')) {
                
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    // Add to uploaded documents
                    this.state.uploadedDocuments = this.state.uploadedDocuments || [];
                    this.state.uploadedDocuments.push({
                        id: Date.now(),
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        content: e.target.result.substring(0, 1000), // Store preview
                        date: new Date().toISOString()
                    });
                    
                    this.saveState();
                    this.renderUploadedFiles();
                    
                    // Also add to AI assistant
                    if (window.aiAssistant) {
                        window.aiAssistant.addDocument(file, e.target.result);
                    }
                    
                    this.showNotification(`📄 ${file.name} uploaded successfully!`, 'success');
                };
                
                reader.readAsText(file);
            } else {
                this.showNotification(`❌ ${file.name} not supported. Please upload PDF or text files.`, 'error');
            }
        });
    }

    renderUploadedFiles() {
        const container = document.getElementById('uploadedFiles');
        if (!container) return;

        const docs = this.state.uploadedDocuments || [];
        
        if (docs.length === 0) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = docs.map(doc => `
            <div class="file-item">
                <div>
                    <i class="fas fa-file-pdf" style="color: var(--accent-danger)"></i>
                    ${doc.name}
                    <small>(${Math.round(doc.size / 1024)} KB)</small>
                </div>
                <i class="fas fa-trash" onclick="app.deleteDocument(${doc.id})" style="cursor: pointer;"></i>
            </div>
        `).join('');
    }

    deleteDocument(id) {
        this.state.uploadedDocuments = this.state.uploadedDocuments.filter(d => d.id !== id);
        this.saveState();
        this.renderUploadedFiles();
        this.showNotification('Document removed', 'info');
    }

    renderNotes() {
        const container = document.getElementById('notesList');
        if (!container) return;

        const notes = this.state.notes || [];
        const filter = document.querySelector('.chip.active')?.dataset.filter || 'all';
        const searchTerm = document.getElementById('searchNotes')?.value.toLowerCase() || '';

        let filteredNotes = notes;
        
        if (filter !== 'all') {
            filteredNotes = filteredNotes.filter(n => n.course === filter);
        }
        
        if (searchTerm) {
            filteredNotes = filteredNotes.filter(n => 
                n.text.toLowerCase().includes(searchTerm) || 
                n.topic.toLowerCase().includes(searchTerm)
            );
        }

        container.innerHTML = filteredNotes.map(note => `
            <div class="note-card">
                <div class="note-card-header">
                    <span class="note-course">${note.course}</span>
                    <span class="note-delete" onclick="app.deleteNote(${note.id})">
                        <i class="fas fa-times"></i>
                    </span>
                </div>
                <h4>${note.topic}</h4>
                <p>${note.text.substring(0, 100)}${note.text.length > 100 ? '...' : ''}</p>
                <small>${new Date(note.date).toLocaleDateString()}</small>
            </div>
        `).join('') || '<p class="text-muted">No notes yet</p>';

        // Update filter chips
        document.querySelectorAll('.chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                this.renderNotes();
            });
        });

        // Search
        document.getElementById('searchNotes')?.addEventListener('input', () => {
            this.renderNotes();
        });
    }

    saveNote() {
        const course = document.getElementById('noteCourse').value;
        const topic = document.getElementById('noteTopic').value;
        const content = document.getElementById('noteContent').value;

        if (!topic || !content) {
            this.showNotification('Please enter both topic and content', 'warning');
            return;
        }

        this.state.notes = this.state.notes || [];
        this.state.notes.push({
            id: Date.now(),
            course,
            topic,
            text: content,
            date: new Date().toISOString()
        });

        this.saveState();
        this.renderNotes();
        
        document.getElementById('noteTopic').value = '';
        document.getElementById('noteContent').value = '';
        
        this.showNotification('Note saved!', 'success');
    }

    deleteNote(id) {
        this.state.notes = this.state.notes.filter(n => n.id !== id);
        this.saveState();
        this.renderNotes();
        this.showNotification('Note deleted', 'info');
    }

    initializePomodoro() {
        this.pomodoro = {
            workTime: this.state.pomodoroWork * 60,
            breakTime: this.state.pomodoroBreak * 60,
            currentTime: this.state.pomodoroWork * 60,
            isRunning: false,
            isWorkMode: true,
            interval: null
        };

        this.updatePomodoroDisplay();

        // Timer controls
        document.getElementById('startPomodoro')?.addEventListener('click', () => this.startPomodoro());
        document.getElementById('pausePomodoro')?.addEventListener('click', () => this.pausePomodoro());
        document.getElementById('resetPomodoro')?.addEventListener('click', () => this.resetPomodoro());

        // Timer presets
        document.querySelectorAll('.timer-preset').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const minutes = parseInt(e.target.dataset.minutes);
                this.setPomodoroTime(minutes);
                
                document.querySelectorAll('.timer-preset').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    startPomodoro() {
        if (this.pomodoro.isRunning) return;

        this.pomodoro.isRunning = true;
        this.pomodoro.interval = setInterval(() => {
            if (this.pomodoro.currentTime <= 0) {
                this.switchPomodoroMode();
            } else {
                this.pomodoro.currentTime--;
                this.updatePomodoroDisplay();
            }
        }, 1000);

        this.showNotification('Pomodoro started! Focus!', 'info');
    }

    pausePomodoro() {
        this.pomodoro.isRunning = false;
        clearInterval(this.pomodoro.interval);
    }

    resetPomodoro() {
        this.pausePomodoro();
        this.pomodoro.currentTime = this.pomodoro.isWorkMode ? 
            this.pomodoro.workTime : this.pomodoro.breakTime;
        this.updatePomodoroDisplay();
    }

    setPomodoroTime(minutes) {
        this.pomodoro.workTime = minutes * 60;
        this.pomodoro.currentTime = minutes * 60;
        this.state.pomodoroWork = minutes;
        this.saveState();
        this.updatePomodoroDisplay();
    }

    switchPomodoroMode() {
        this.pomodoro.isWorkMode = !this.pomodoro.isWorkMode;
        this.pomodoro.currentTime = this.pomodoro.isWorkMode ? 
            this.pomodoro.workTime : this.pomodoro.breakTime;
        
        const message = this.pomodoro.isWorkMode ? 
            'Break time is over! Back to work!' : 
            'Good job! Time for a break!';
        
        this.showNotification(message, 'success');
        this.updatePomodoroDisplay();
    }

    updatePomodoroDisplay() {
        const display = document.getElementById('pomodoroDisplay');
        if (!display) return;

        const mins = Math.floor(this.pomodoro.currentTime / 60);
        const secs = this.pomodoro.currentTime % 60;
        display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    startStudySession() {
        // Start a study session with the next incomplete topic
        const today = new Date().toISOString().split('T')[0];
        const todayPlan = STUDY_PLAN.find(d => d.date === today);
        
        if (!todayPlan) {
            this.showNotification('No study plan for today', 'warning');
            return;
        }

        const nextTopic = todayPlan.topics.find(t => 
            !this.state.completedTopics[`d${todayPlan.day}t${t.topic}`]
        );

        if (!nextTopic) {
            this.showNotification('All topics completed for today! Great job! 🎉', 'success');
            return;
        }

        // Scroll to the topic in daily plan
        document.querySelector('.nav-item[data-section="dailyplan"]').click();
        
        // Find and highlight the topic
        setTimeout(() => {
            const topicElements = document.querySelectorAll('.topic-row');
            for (const el of topicElements) {
                if (el.querySelector('.topic-name')?.textContent.includes(nextTopic.topic)) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    el.style.animation = 'pulse 1s';
                    break;
                }
            }
        }, 300);

        this.showNotification(`Next: ${nextTopic.topic}`, 'info');
    }

    toggleAllDays(expand) {
        document.querySelectorAll('.day-content').forEach(content => {
            content.classList.toggle('expanded', expand);
        });
    }

    formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    showNotification(message, type = 'info') {
        // Simple alert for now - could be enhanced with toast notifications
        if (type === 'success') {
            console.log('✅', message);
        } else if (type === 'error') {
            console.error('❌', message);
        } else if (type === 'warning') {
            console.warn('⚠️', message);
        } else {
            console.log('📌', message);
        }

        // Update notification badge
        const badge = document.getElementById('notificationBadge');
        if (badge) {
            const count = parseInt(badge.textContent) || 0;
            badge.textContent = count + 1;
        }

        // You could implement a proper toast notification system here
    }

    resetAllData() {
        if (confirm('Are you sure? This will erase all your progress, notes, and settings.')) {
            localStorage.clear();
            location.reload();
        }
    }

    exportData() {
        const dataStr = JSON.stringify(this.state, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `studymaster-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('Data exported successfully!', 'success');
    }

    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = (event) => {
                try {
                    const importedState = JSON.parse(event.target.result);
                    this.state = importedState;
                    this.saveState();
                    location.reload();
                    this.showNotification('Data imported successfully!', 'success');
                } catch (error) {
                    this.showNotification('Invalid backup file', 'error');
                }
            };
            
            reader.readAsText(file);
        };
        
        input.click();
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new StudyMasterApp();
    
    // Save note button
    document.getElementById('saveNoteBtn')?.addEventListener('click', () => app.saveNote());
});