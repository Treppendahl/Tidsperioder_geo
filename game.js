const periods = document.querySelectorAll('.period');
const timelineItems = document.querySelectorAll('#timeline li');
const checkOrderBtn = document.getElementById("checkOrderBtn");
const resultText = document.getElementById("result");

let draggedElement = null;

// Drag events for periods
periods.forEach(period => {
    period.addEventListener('dragstart', () => {
        draggedElement = period;
        period.classList.add('dragging');
    });

    period.addEventListener('dragend', () => {
        period.classList.remove('dragging');
    });
});

// Drag events for timeline (allow dropping periods between timeline items)
timelineItems.forEach(item => {
    item.addEventListener('dragover', (e) => {
        e.preventDefault(); // Nødvendig for at tillade drop
    });

    item.addEventListener('dragenter', () => {
        item.classList.add('over');
    });

    item.addEventListener('dragleave', () => {
        item.classList.remove('over');
    });

    item.addEventListener('drop', () => {
        item.classList.remove('over');

        // Hvis der allerede er et barn i tidslinje-elementet, byttes elementerne om
        if (item.children.length > 0) {
            const existingElement = item.children[0];
            const originalParent = draggedElement.parentElement;

            // Flyt det eksisterende element til den oprindelige placering af det trukne element
            originalParent.appendChild(existingElement);

            // Flyt det trukne element til tidslinje-elementet
            item.appendChild(draggedElement);
        } else {
            // Hvis tidslinje-elementet er tomt, tilføjes det trukne element
            item.appendChild(draggedElement);
        }
    });
});

// Tjek rækkefølgen
checkOrderBtn.addEventListener("click", () => {
    let correct = true;

    timelineItems.forEach(item => {
        const expectedPeriod = item.getAttribute('data-period');
        const placedPeriod = item.querySelector('.period');

        // Fjern tidligere farvemarkeringer
        item.style.backgroundColor = '';
        
        if (placedPeriod && placedPeriod.textContent === expectedPeriod) {
            // Hvis det er korrekt, gør baggrunden grøn
            item.style.backgroundColor = 'lightgreen';
        } else if (placedPeriod) {
            // Hvis det er forkert, gør baggrunden rød
            item.style.backgroundColor = 'lightcoral';
            correct = false;
        }
    });

    if (correct) {
        resultText.textContent = "Rækkefølgen er korrekt!";
        resultText.style.color = "green";
    } else {
        resultText.textContent = "Rækkefølgen er forkert!";
        resultText.style.color = "red";
    }
});
