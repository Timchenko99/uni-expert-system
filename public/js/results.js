document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelector('.modal');
    var instances = M.Modal.init(elems);
    M.Modal.getInstance(elems).open()
});


const wrapInDiv = (element) => {
    const div = document.createElement('div')
    div.className = 'col s12 m12 l12'
    div.appendChild(element)
    return div
}

const ageChartCanvas = document.createElement('canvas')
ageChartCanvas.id = 'ageChart'
ageChartCanvas.className = 'chart'

const illByAgeCanvas = document.createElement('canvas')
illByAgeCanvas.id = 'illByAgeChart'
ageChartCanvas.className = 'chart'

const ratioOfDataCanvas = document.createElement('canvas')
ratioOfDataCanvas.id = 'ratioOfDataChart'
ratioOfDataCanvas.className = 'chart'

const generalMaxHeartRateByAgeCanvas = document.createElement('canvas')
generalMaxHeartRateByAgeCanvas.id = 'generalMaxHeartRateByAgeChart'
generalMaxHeartRateByAgeCanvas.className = 'chart'

const maxHeartRateByAgeCanvas = document.createElement('canvas')
maxHeartRateByAgeCanvas.id = 'maxHeartRateByAgeChart'
maxHeartRateByAgeCanvas.className = 'chart'

const tscCanvas = document.createElement('canvas')
tscCanvas.id = 'tscChart'
tscCanvas.className = 'chart'

const charts = document.getElementById('charts')
charts.appendChild(wrapInDiv(ageChartCanvas))
charts.appendChild(wrapInDiv(ratioOfDataCanvas))
charts.appendChild(wrapInDiv(illByAgeCanvas))
charts.appendChild(wrapInDiv(generalMaxHeartRateByAgeCanvas))
charts.appendChild(wrapInDiv(maxHeartRateByAgeCanvas))
charts.appendChild(wrapInDiv(tscCanvas))

//const loadBtn = document.getElementById('loadChart')

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const response = JSON.parse(this.response)

        const targets = response.map(data => data['target'])

        const ages = response.map((data) => data['age'])
        const uniqueAges = ages.filter((x, i, a) => a.indexOf(x) == i).sort()

        const countAges = uniqueAges.map(uniqueAge => ages.filter(age => age == uniqueAge).length)

        const healthyByAge = uniqueAges.map(uniqueAge => response.filter(data => data['age'] == uniqueAge && data['target'] == 0).length)
        const notHealthyByAge = uniqueAges.map(uniqueAge => response.filter(data => data['age'] == uniqueAge && data['target'] == 1).length)

        const ageChart = new Chart(ageChartCanvas, {
            type: 'bar',
            data: {
                labels: uniqueAges,
                datasets: [{
                    label: '# of ages',
                    data: countAges,
                    backgroundColor: 'rgb(0,0,0)'
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: "Variation of Age"
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Ages'
                        }
                    }]
                }
            }
        });

        const illByAgeChart = new Chart(illByAgeCanvas, {
            type: 'bar',
            data: {
                labels: uniqueAges,
                datasets: [{
                    label: 'not suffering from heart disease',
                    data: healthyByAge,
                    backgroundColor: 'rgb(0,0,0)'
                }, {
                    label: 'suffering from heart disease',
                    data: notHealthyByAge,
                    backgroundColor: 'rgb(255,0,0)'
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: "Variation of Age for each target class"
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Ages'
                        }
                    }]
                }
            }
        })

        const ratioOfDataChart = new Chart(ratioOfDataCanvas, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [
                        targets.filter(target => target == 0).length,
                        targets.filter(target => target == 1).length
                    ],
                    backgroundColor: ['rgb(0,0,0)', 'rgb(255,0,0)']
                }],
                labels: ['Healthy', 'Suffering']
            },
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Healthy/Suffering ratio'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        })

        const generalMaxHeartRateByAgeChart = Chart.Scatter(generalMaxHeartRateByAgeCanvas, {
            data: {
                datasets: [{
                    borderColor: 'rgba(0,0,0,0.7)',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    label: 'Max heart rate',
                    data: response.map(data => {                            //maxHeartRateAchivedByAge
                        return { x: data['age'], y: data['thalach'] };
                    })
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Maximum heart rate achived by age'
                },
                scales: {
                    xAxes: [{
                        position: 'bottom',
                        scaleLabel: {
                            labelString: 'Age',
                            display: true,
                        }
                    }],
                    yAxes: [{
                        type: 'linear',
                        scaleLabel: {
                            labelString: 'Rate',
                            display: true
                        }
                    }]
                }
            }
        });

        const maxHeartRateByAgeChart = Chart.Scatter(maxHeartRateByAgeCanvas, {
            data: {
                datasets: [{
                    borderColor: 'rgba(0,0,0,0.7)',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    label: 'Healthy',
                    data: response.filter(data => data['target'] == 0).map(data => {        //Max Heart Rate of healthy people achived by age
                        return { x: data['age'], y: data['thalach'] };
                    })
                }, {
                    borderColor: 'rgba(255,0,0,0.7)',
                    backgroundColor: 'rgba(255,0,0,0.5)',
                    label: 'Suffering',
                    data: response.filter(data => data['target'] == 1).map(data => {       //Max Heart Rate of suffering people achived by age
                        return { x: data['age'], y: data['thalach'] };
                    })
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Maximum heart rate achived by age healthy/suffering'
                },
                scales: {
                    xAxes: [{
                        position: 'bottom',
                        scaleLabel: {
                            labelString: 'Age',
                            display: true,
                        }
                    }],
                    yAxes: [{
                        type: 'linear',
                        scaleLabel: {
                            labelString: 'Rate',
                            display: true
                        }
                    }]
                }
            }
        });

        const tscChart = Chart.Scatter(tscCanvas, {
            data: {
                datasets: [{
                    borderColor: 'rgba(0,0,0,0.7)',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    label: 'Healthy',
                    data: response.filter(data => data['target'] == 0).map(data => {        //Serum cholestoral of healthy people achived by age
                        return { x: data['age'], y: data['chol'] };
                    })
                }, {
                    borderColor: 'rgba(255,0,0,0.7)',
                    backgroundColor: 'rgba(255,0,0,0.5)',
                    label: 'Suffering',
                    data: response.filter(data => data['target'] == 1).map(data => {       //Serum cholestoral of suffering people achived by age
                        return { x: data['age'], y: data['chol'] };
                    })
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Serum Cholestrol (mg/dl)'
                },
                scales: {
                    xAxes: [{
                        position: 'bottom',
                        scaleLabel: {
                            labelString: 'Age',
                            display: true,
                        }
                    }],
                    yAxes: [{
                        type: 'linear',
                        scaleLabel: {
                            labelString: 'Serum Cholestrol',
                            display: true
                        }
                    }]
                }
            }
        });
    }
};
xhttp.open("GET", "/data", true);
xhttp.send();