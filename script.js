document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://api.climateclock.world/v2/clock.json';
    const clockContainer = document.getElementById('climate-clock');
    const lastUpdatedEl = document.getElementById('last-updated');

    let countdownInterval;

    // シンプルな表示に変更
    const timeUnits = [
        { id: 'years', label: '年' },
        { id: 'days', label: '日' },
        { id: 'hours', label: '時間', max: 24 },
        { id: 'minutes', label: '分', max: 60 },
        { id: 'seconds', label: '秒', max: 60 },
    ];

    function createClockHTML() {
        let html = '';
        timeUnits.forEach(unit => {
            // 時間、分、秒のみプログレスサークルを表示
            if (unit.max) {
                html += `
                    <div class="progress-circle">
                        <svg>
                            <circle class="progress-bg" cx="60" cy="60" r="54"></circle>
                            <circle id="progress-${unit.id}" class="progress-bar" cx="60" cy="60" r="54"></circle>
                        </svg>
                        <div class="time-unit">
                            <span id="${unit.id}">--</span>
                            <div>${unit.label}</div>
                        </div>
                    </div>
                `;
            } else {
                // 年と日は数値のみ表示
                html += `
                    <div class="static-unit">
                        <span id="${unit.id}">--</span>
                        <div>${unit.label}</div>
                    </div>
                `;
            }
        });
        clockContainer.innerHTML = html;
    }

    async function fetchClimateData() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const deadlineModule = data.data.modules.carbon_deadline_1;
            if (!deadlineModule) {
                throw new Error('Deadline data not found in API response');
            }

            const deadlineTimestamp = new Date(deadlineModule.timestamp).getTime();
            lastUpdatedEl.textContent = new Date().toLocaleString('ja-JP');

            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
            startCountdown(deadlineTimestamp);

        } catch (error) {
            console.error('Error fetching or processing climate data:', error);
            displayError();
        }
    }

    function startCountdown(deadline) {
        countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = deadline - now;

            if (distance < 0) {
                clearInterval(countdownInterval);
                displayDeadlineReached();
                return;
            }

            const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365.25));
            const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const values = { years, days, hours, minutes, seconds };

            timeUnits.forEach(unit => {
                document.getElementById(unit.id).textContent = String(values[unit.id]).padStart(2, '0');
                if (unit.max) {
                    const progressBar = document.getElementById(`progress-${unit.id}`);
                    const radius = progressBar.r.baseVal.value;
                    const circumference = 2 * Math.PI * radius;
                    const progress = values[unit.id] / unit.max;
                    const offset = circumference * (1 - progress);
                    progressBar.style.strokeDasharray = circumference;
                    progressBar.style.strokeDashoffset = offset;
                }
            });

        }, 1000);
    }

    function displayError() {
        clockContainer.innerHTML = '<p style="color: red;">データの取得に失敗しました。</p>';
        lastUpdatedEl.textContent = 'エラー';
    }

    function displayDeadlineReached() {
        clockContainer.innerHTML = '<p style="color: yellow; font-size: 1.5rem;">タイムリミットに到達しました。</p>';
    }

    // 初期化
    createClockHTML();
    fetchClimateData();
    setInterval(fetchClimateData, 3600000); // 1 hour
});
