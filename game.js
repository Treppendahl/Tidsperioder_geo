const periods = [
    { name: 'Hadean', year: '4.6 to 4.0 billion years ago' },
    { name: 'Archean', year: '4.0 to 2.5 billion years ago' },
    { name: 'Proterozoic', year: '2.5 billion to 541 million years ago' },
    { name: 'Paleozoic', year: '541 to 252 million years ago' },
    { name: 'Mesozoic', year: '252 to 66 million years ago' },
    { name: 'Cenozoic', year: '66 million years ago to present' }
];

const periodsContainer = document.getElementById('periods');
const yearsContainer = document.getElementById('years');
const scoreList = document.getElementById('scoreList');

periods.forEach(period => {
    const periodItem = document.createElement('div');
    periodItem.className = 'item';
    periodItem.textContent = period.name;
    periodItem.dataset.year = period.year;
    periodsContainer.appendChild(periodItem);

    const yearItem = document.createElement('div');
    yearItem.className = 'item';
    yearItem.textContent = period.year;
    yearItem.dataset.period = period.name;
    yearsContainer.appendChild(yearItem);
});

const items = document.querySelectorAll('.item');

items.forEach(item => {
    item.addEventListener('click', () => {
        const isPeriod = item.dataset.year;
        const correspondingItem = isPeriod ? yearsContainer.querySelector(`div[data-period="${item.textContent}"]`) : periodsContainer.querySelector(`div[data-year="${item.textContent}"]`);
        if (correspondingItem) {
            item.classList.toggle('matched');
            correspondingItem.classList.toggle('matched');
            if (item.classList.contains('matched')) {
                addToScoreboard(item, correspondingItem);
            }
        }
    });
});

function addToScoreboard(periodItem, yearItem) {
    const scoreItem = document.createElement('li');
    scoreItem.textContent = `${periodItem.textContent} - ${yearItem.textContent}`;
    scoreList.appendChild(scoreItem);
}

document.getElementById('resetButton').addEventListener('click', () => {
    scoreList.innerHTML = '';
    items.forEach(item => {
        item.classList.remove('matched');
    });
});
