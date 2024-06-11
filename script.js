
document.addEventListener("DOMContentLoaded", function() {
    const config = {
        type: 'line',
        data: {
            labels: [],
            datasets: [
            {
                label: 'Lobbies',
                data: [],
                backgroundColor: 'rgba(87, 221, 111, 0.3)',
                borderColor: '#57ff88',
                borderWidth: 2,
                fill: 'origin',
                lineTension: 0.3,
            },
            {
                label: 'Players',
                data: [],
                backgroundColor: 'rgba(87, 111, 221, 0.3)',
                borderColor: '#5788ff',
                borderWidth: 2,
                fill: 'origin',
                lineTension: 0.3,
            },
            ]
        },
        options: {
            scales: {
                x: { grid: { color: 'rgba(0, 0, 0, 0)' } },
                y: { grid: { color: '#2e3746' } }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Hourly',
                    font: { size: '24px', weight: 'bold', }
                },
            },
        },
    };

    const chart = new Chart(document.getElementById('myChart').getContext('2d'), config);

    function get_data(filename, title) {
        fetch(filename)
            .then(response => response.json())
            .then(data => {
                chart.data.datasets[0].data = data['lobbies'];
                chart.data.datasets[1].data = data['players'];
                
                const maxLength = Math.max(data['lobbies'].length, data['players'].length);
                chart.data.labels = []
                for (let i = 0; i < maxLength; i++) {
                    chart.data.labels.push(i - maxLength);
                }

                chart.options.plugins.title.text = title

                chart.update();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    get_data('hourly.json', 'Top Concurrent Hourly');
    
    const hourlyBtn = document.getElementById('hourly-btn');
    hourlyBtn.addEventListener('click', () => {
        get_data('hourly.json', 'Top Concurrent Hourly');
    });

    const dailyBtn = document.getElementById('daily-btn');
    dailyBtn.addEventListener('click', () => {
        get_data('daily.json', 'Top Concurrent Daily');
    });

    const weeklyBtn = document.getElementById('weekly-btn');
    weeklyBtn.addEventListener('click', () => {
        get_data('weekly.json', 'Top Concurrent Weekly');
    });

    const currentP = document.getElementById("current-stats");
    fetch('current.json')
        .then(response => response.json())
        .then(data => {
            currentP.innerText = "Current Lobbies: " + data['lobbies'] + ", Players: " + data['players'];
        })
        .catch(error => {
            console.error('Error:', error);
        });
});