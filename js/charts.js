// ===== CHART INITIALIZATION AND UPDATES =====

class ProgressCharts {
    constructor() {
        this.hoursChart = null;
        this.pieChart = null;
        this.trendChart = null;
        this.initializeCharts();
    }

    initializeCharts() {
        this.initHoursChart();
        this.initPieChart();
        this.initTrendChart();
        this.setupPeriodFilters();
    }

    initHoursChart() {
        const ctx = document.getElementById('hoursChart')?.getContext('2d');
        if (!ctx) return;

        // Get data from completed topics
        const hoursData = this.getHoursPerCourse();

        this.hoursChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['CPE203', 'STT201', 'SEN205', 'SEN203', 'CSE201'],
                datasets: [{
                    label: 'Hours Studied',
                    data: hoursData,
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(139, 92, 246, 0.8)',
                        'rgba(239, 68, 68, 0.8)'
                    ],
                    borderColor: [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#8b5cf6',
                        '#ef4444'
                    ],
                    borderWidth: 1,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        title: { display: true, text: 'Hours' }
                    }
                }
            }
        });
    }

    initPieChart() {
        const ctx = document.getElementById('topicsPieChart')?.getContext('2d');
        if (!ctx) return;

        const topicsData = this.getTopicsCompletedPerCourse();

        this.pieChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['CPE203', 'STT201', 'SEN205', 'SEN203', 'CSE201'],
                datasets: [{
                    data: topicsData,
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(139, 92, 246, 0.8)',
                        'rgba(239, 68, 68, 0.8)'
                    ],
                    borderColor: 'white',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a,b) => a + b, 0);
                                const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                                return `${label}: ${value} topics (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    initTrendChart() {
        const ctx = document.getElementById('progressTrendChart')?.getContext('2d');
        if (!ctx) return;

        const trendData = this.getProgressTrend();

        this.trendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: trendData.labels,
                datasets: [{
                    label: 'Daily Progress (%)',
                    data: trendData.values,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#3b82f6',
                    pointBorderColor: 'white',
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => `Progress: ${context.raw}%`
                        }
                    }
                }
            }
        });
    }

    setupPeriodFilters() {
        document.querySelectorAll('.filter-btn[data-period]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update charts based on period
                const period = btn.dataset.period;
                this.updateChartsForPeriod(period);
            });
        });
    }

    getHoursPerCourse() {
        // Calculate actual hours studied from completed topics
        const hours = [0, 0, 0, 0, 0];
        const courses = ['CPE203', 'STT201', 'SEN205', 'SEN203', 'CSE201'];

        if (!window.appState?.completedTopics) return [12, 8, 6, 4, 2]; // Default demo values

        STUDY_PLAN.forEach(day => {
            day.topics.forEach(topic => {
                const courseIndex = courses.indexOf(topic.course);
                if (courseIndex >= 0) {
                    const completed = window.appState.completedTopics[`d${day.day}t${topic.topic}`];
                    if (completed) {
                        // Each topic block is 1.5 hours typically
                        hours[courseIndex] += 1.5;
                    }
                }
            });
        });

        return hours.map(h => Math.round(h * 10) / 10); // Round to 1 decimal
    }

    getTopicsCompletedPerCourse() {
        const topicsCount = [0, 0, 0, 0, 0];
        const courses = ['CPE203', 'STT201', 'SEN205', 'SEN203', 'CSE201'];

        if (!window.appState?.completedTopics) return [30, 20, 15, 10, 8]; // Default demo values

        STUDY_PLAN.forEach(day => {
            day.topics.forEach(topic => {
                const courseIndex = courses.indexOf(topic.course);
                if (courseIndex >= 0) {
                    const completed = window.appState.completedTopics[`d${day.day}t${topic.topic}`];
                    if (completed) {
                        topicsCount[courseIndex]++;
                    }
                }
            });
        });

        return topicsCount;
    }

    getProgressTrend() {
        const labels = [];
        const values = [];
        
        // Get last 7 days
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            labels.push(date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
            
            // Calculate progress for that day
            const dayPlan = STUDY_PLAN.find(d => d.date === dateStr);
            if (dayPlan && window.appState?.completedTopics) {
                const completed = dayPlan.topics.filter(t => 
                    window.appState.completedTopics[`d${dayPlan.day}t${t.topic}`]
                ).length;
                const percentage = dayPlan.topics.length > 0 
                    ? Math.round((completed / dayPlan.topics.length) * 100) 
                    : 0;
                values.push(percentage);
            } else {
                values.push(0);
            }
        }
        
        return { labels, values };
    }

    updateChartsForPeriod(period) {
        // Update data based on selected period (daily/weekly/monthly)
        if (period === 'weekly') {
            this.updateChartsWithWeeklyData();
        } else if (period === 'monthly') {
            this.updateChartsWithMonthlyData();
        } else {
            this.updateChartsWithDailyData();
        }
    }

    updateChartsWithDailyData() {
        if (this.hoursChart) {
            this.hoursChart.data.datasets[0].data = this.getHoursPerCourse();
            this.hoursChart.update();
        }
        if (this.pieChart) {
            this.pieChart.data.datasets[0].data = this.getTopicsCompletedPerCourse();
            this.pieChart.update();
        }
        if (this.trendChart) {
            const trendData = this.getProgressTrend();
            this.trendChart.data.labels = trendData.labels;
            this.trendChart.data.datasets[0].data = trendData.values;
            this.trendChart.update();
        }
    }

    updateChartsWithWeeklyData() {
        // Aggregate weekly data
        const weeklyHours = [0, 0, 0, 0, 0];
        const weeklyTopics = [0, 0, 0, 0, 0];
        
        // Implementation would aggregate last 7 days
        // For demo, we'll use the same but with different labels
        if (this.trendChart) {
            this.trendChart.data.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            this.trendChart.data.datasets[0].data = [65, 70, 45, 80];
            this.trendChart.update();
        }
    }

    updateChartsWithMonthlyData() {
        if (this.trendChart) {
            this.trendChart.data.labels = ['Jan', 'Feb', 'Mar'];
            this.trendChart.data.datasets[0].data = [55, 68, 72];
            this.trendChart.update();
        }
    }

    refreshAllCharts() {
        if (this.hoursChart) {
            this.hoursChart.data.datasets[0].data = this.getHoursPerCourse();
            this.hoursChart.update();
        }
        if (this.pieChart) {
            this.pieChart.data.datasets[0].data = this.getTopicsCompletedPerCourse();
            this.pieChart.update();
        }
        if (this.trendChart) {
            const trendData = this.getProgressTrend();
            this.trendChart.data.labels = trendData.labels;
            this.trendChart.data.datasets[0].data = trendData.values;
            this.trendChart.update();
        }
    }
}

// Initialize charts
document.addEventListener('DOMContentLoaded', () => {
    window.progressCharts = new ProgressCharts();
});