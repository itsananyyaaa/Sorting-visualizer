// ============================================================================
// ALGORITHM DEFINITIONS
// ============================================================================

const ALGORITHMS = {
    bubble: {
        name: 'Bubble Sort',
        description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they\'re in the wrong order. Simple but inefficient for large datasets.',
        complexity: {
            best: 'O(n)',
            average: 'O(n²)',
            worst: 'O(n²)',
            space: 'O(1)'
        },
        pseudoCode: `for i = 0 to n-1:
  for j = 0 to n-i-2:
    if arr[j] > arr[j+1]:
      swap(arr[j], arr[j+1])`
    },
    selection: {
        name: 'Selection Sort',
        description: 'Divides the array into sorted and unsorted portions. Repeatedly finds the minimum element from the unsorted part and places it at the beginning.',
        complexity: {
            best: 'O(n²)',
            average: 'O(n²)',
            worst: 'O(n²)',
            space: 'O(1)'
        },
        pseudoCode: `for i = 0 to n-1:
  min_idx = i
  for j = i+1 to n:
    if arr[j] < arr[min_idx]:
      min_idx = j
  swap(arr[i], arr[min_idx])`
    },
    insertion: {
        name: 'Insertion Sort',
        description: 'Builds the sorted array one item at a time. Iterates through an input array, and for each element, finds the place it belongs in the sorted list.',
        complexity: {
            best: 'O(n)',
            average: 'O(n²)',
            worst: 'O(n²)',
            space: 'O(1)'
        },
        pseudoCode: `for i = 1 to n-1:
  key = arr[i]
  j = i - 1
  while j >= 0 and arr[j] > key:
    arr[j+1] = arr[j]
    j = j - 1
  arr[j+1] = key`
    }
};

// ============================================================================
// APPLICATION STATE
// ============================================================================

const appState = {
    currentAlgorithm: 'bubble',
    arraySize: 30,
    speed: 50,
    array: [],
    isSorting: false,
    isPaused: false,
    sortingStep: 0,
    totalSteps: 0,
    comparisons: 0,
    swaps: 0,
    sortingHistory: []
};

// ============================================================================
// DOM ELEMENTS
// ============================================================================

const DOM = {
    themeToggle: null,
    algoButtons: null,
    sizeSlider: null,
    speedSlider: null,
    playBtn: null,
    pauseBtn: null,
    nextBtn: null,
    prevBtn: null,
    resetBtn: null,
    customInput: null,
    applyBtn: null,
    randomBtn: null,
    visualization: null,
    explanation: null,
    codeTrace: null,
    progressFill: null,
    progressText: null,
    pseudoCode: null,
    algorithmDesc: null,
    metricsContent: null,
    sizeValue: null,
    speedValue: null
};

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    initializeDOM();
    initializeEventListeners();
    generateRandomArray();
    renderVisualization();
    updateAlgorithmInfo();
});

function initializeDOM() {
    DOM.themeToggle = document.getElementById('themeToggle');
    DOM.algoButtons = document.querySelectorAll('.algo-btn');
    DOM.sizeSlider = document.getElementById('sizeSlider');
    DOM.speedSlider = document.getElementById('speedSlider');
    DOM.playBtn = document.getElementById('playBtn');
    DOM.pauseBtn = document.getElementById('pauseBtn');
    DOM.nextBtn = document.getElementById('nextBtn');
    DOM.prevBtn = document.getElementById('prevBtn');
    DOM.resetBtn = document.getElementById('resetBtn');
    DOM.customInput = document.getElementById('customInput');
    DOM.applyBtn = document.getElementById('applyBtn');
    DOM.randomBtn = document.getElementById('randomBtn');
    DOM.visualization = document.getElementById('visualization');
    DOM.explanation = document.getElementById('explanation');
    DOM.codeTrace = document.getElementById('codeTrace');
    DOM.progressFill = document.getElementById('progressFill');
    DOM.progressText = document.getElementById('progressText');
    DOM.pseudoCode = document.getElementById('codeContent');
    DOM.algorithmDesc = document.getElementById('algorithmDesc');
    DOM.metricsContent = document.getElementById('metricsContent');
    DOM.sizeValue = document.getElementById('sizeValue');
    DOM.speedValue = document.getElementById('speedValue');
}

function initializeEventListeners() {
    // Theme toggle
    DOM.themeToggle?.addEventListener('click', toggleTheme);

    // Algorithm selection
    DOM.algoButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            DOM.algoButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            appState.currentAlgorithm = e.target.dataset.algo;
            resetSort();
            updateAlgorithmInfo();
        });
    });

    // Sliders
    DOM.sizeSlider?.addEventListener('input', (e) => {
        appState.arraySize = parseInt(e.target.value);
        DOM.sizeValue.textContent = appState.arraySize;
        generateRandomArray();
        renderVisualization();
    });

    DOM.speedSlider?.addEventListener('input', (e) => {
        appState.speed = parseInt(e.target.value);
        DOM.speedValue.textContent = appState.speed;
    });

    // Control buttons
    DOM.playBtn?.addEventListener('click', startSort);
    DOM.pauseBtn?.addEventListener('click', togglePause);
    DOM.nextBtn?.addEventListener('click', nextStep);
    DOM.prevBtn?.addEventListener('click', prevStep);
    DOM.resetBtn?.addEventListener('click', resetSort);

    // Array input
    DOM.applyBtn?.addEventListener('click', applyCustomArray);
    DOM.randomBtn?.addEventListener('click', generateRandomArray);
}

// ============================================================================
// THEME TOGGLE
// ============================================================================

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// Load saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

// ============================================================================
// ARRAY MANAGEMENT
// ============================================================================

function generateRandomArray() {
    appState.array = Array.from({ length: appState.arraySize }, 
        () => Math.floor(Math.random() * 100) + 1
    );
    resetSort();
    renderVisualization();
}

function applyCustomArray() {
    const input = DOM.customInput?.value.trim();
    if (!input) {
        alert('Please enter comma-separated numbers');
        return;
    }
    
    try {
        appState.array = input
            .split(',')
            .map(n => {
                const num = parseInt(n.trim());
                if (isNaN(num)) throw new Error('Invalid input');
                return num;
            });
        
        appState.arraySize = appState.array.length;
        DOM.sizeValue.textContent = appState.arraySize;
        resetSort();
        renderVisualization();
    } catch (error) {
        alert('Please enter valid numbers separated by commas');
    }
}

// ============================================================================
// VISUALIZATION & RENDERING
// ============================================================================

function renderVisualization() {
    DOM.visualization.innerHTML = '';
    
    const maxValue = Math.max(...appState.array, 1);
    const blockWidth = Math.max(30, 100 / appState.array.length);
    
    appState.array.forEach((value, idx) => {
        const block = document.createElement('div');
        block.className = 'array-block';
        block.style.height = (value / maxValue * 100) + '%';
        block.style.width = blockWidth + '%';
        block.textContent = appState.arraySize <= 50 ? value : '';
        block.id = `block-${idx}`;
        DOM.visualization.appendChild(block);
    });
}

function updateVisualizationBlock(index, state = 'default') {
    const block = document.getElementById(`block-${index}`);
    if (block) {
        block.className = 'array-block';
        if (state === 'comparing') block.classList.add('comparing');
        else if (state === 'swapping') block.classList.add('swapping');
        else if (state === 'sorted') block.classList.add('sorted');
    }
}

function resetBlockStates() {
    document.querySelectorAll('.array-block').forEach(block => {
        block.className = 'array-block';
    });
}

// ============================================================================
// ALGORITHM INFO & METRICS
// ============================================================================

function updateAlgorithmInfo() {
    const algo = ALGORITHMS[appState.currentAlgorithm];
    
    DOM.algorithmDesc.innerHTML = `
        <h3>${algo.name}</h3>
        <p>${algo.description}</p>
    `;
    
    DOM.pseudoCode.textContent = algo.pseudoCode;
    
    DOM.metricsContent.innerHTML = `
        <div class="metric-row">
            <span>Best Case:</span>
            <span>${algo.complexity.best}</span>
        </div>
        <div class="metric-row">
            <span>Average Case:</span>
            <span>${algo.complexity.average}</span>
        </div>
        <div class="metric-row">
            <span>Worst Case:</span>
            <span>${algo.complexity.worst}</span>
        </div>
        <div class="metric-row">
            <span>Space:</span>
            <span>${algo.complexity.space}</span>
        </div>
        <div class="metric-row">
            <span>Comparisons:</span>
            <span id="comparisonCount">0</span>
        </div>
        <div class="metric-row">
            <span>Swaps:</span>
            <span id="swapCount">0</span>
        </div>
    `;
}

function updateMetrics() {
    const compCount = document.getElementById('comparisonCount');
    const swapCount = document.getElementById('swapCount');
    if (compCount) compCount.textContent = appState.comparisons;
    if (swapCount) swapCount.textContent = appState.swaps;
}

function updateExplanation(text) {
    DOM.explanation.innerHTML = `<p>${text}</p>`;
}

function updateProgressBar() {
    const progress = appState.totalSteps > 0 
        ? (appState.sortingStep / appState.totalSteps * 100)
        : 0;
    DOM.progressFill.style.width = progress + '%';
    DOM.progressText.textContent = Math.round(progress) + '%';
}

function updateCodeTrace(lines) {
    DOM.codeTrace.innerHTML = lines
        .map((line, idx) => `<code class="${line.current ? 'current' : ''}">${line.text}</code>`)
        .join('');
}

function updateButtonStates() {
    const isActive = appState.isSorting;
    DOM.playBtn?.setAttribute('disabled', isActive);
    DOM.sizeSlider?.setAttribute('disabled', isActive);
    DOM.speedSlider?.setAttribute('disabled', isActive);
    DOM.algoButtons.forEach(btn => btn.setAttribute('disabled', isActive));
}

// ============================================================================
// SORTING ALGORITHMS
// ============================================================================

async function bubbleSort() {
    const arr = [...appState.array];
    const n = arr.length;
    appState.totalSteps = (n * (n - 1)) / 2;
    appState.sortingStep = 0;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (!appState.isSorting) return;
            if (appState.isPaused) {
                await sleep(100);
                j--;
                continue;
            }

            appState.comparisons++;
            updateMetrics();

            // Highlight comparing elements
            updateVisualizationBlock(j, 'comparing');
            updateVisualizationBlock(j + 1, 'comparing');
            updateExplanation(`Comparing arr[${j}] = ${arr[j]} with arr[${j + 1}] = ${arr[j + 1]}`);
            updateCodeTrace([
                { text: `for i = 0 to ${n-1}:`, current: false },
                { text: `  for j = 0 to ${n-i-2}:`, current: true },
                { text: `    if arr[${j}] > arr[${j+1}]:`, current: false },
                { text: `      swap(arr[${j}], arr[${j+1}])`, current: false }
            ]);

            await sleep(101 - appState.speed);

            if (arr[j] > arr[j + 1]) {
                appState.swaps++;
                updateMetrics();

                // Show swapping
                updateVisualizationBlock(j, 'swapping');
                updateVisualizationBlock(j + 1, 'swapping');
                updateExplanation(`Swapping arr[${j}] = ${arr[j]} with arr[${j + 1}] = ${arr[j + 1]}`);

                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                appState.array = arr;
                renderVisualization();

                // Re-apply states after render
                updateVisualizationBlock(j, 'swapping');
                updateVisualizationBlock(j + 1, 'swapping');

                await sleep(101 - appState.speed);
            }

            resetBlockStates();
            appState.sortingStep++;
            updateProgressBar();
        }

        // Mark sorted elements
        for (let k = n - i - 1; k < n; k++) {
            updateVisualizationBlock(k, 'sorted');
        }
    }

    // Mark all as sorted
    document.querySelectorAll('.array-block').forEach(block => {
        block.classList.remove('comparing', 'swapping');
        block.classList.add('sorted');
    });

    updateExplanation('Sorting complete! Array is now sorted.');
    appState.isSorting = false;
    updateButtonStates();
}

async function selectionSort() {
    const arr = [...appState.array];
    const n = arr.length;
    appState.totalSteps = (n * (n - 1)) / 2;
    appState.sortingStep = 0;

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        updateVisualizationBlock(i, 'sorted');

        for (let j = i + 1; j < n; j++) {
            if (!appState.isSorting) return;
            if (appState.isPaused) {
                await sleep(100);
                j--;
                continue;
            }

            appState.comparisons++;
            updateMetrics();

            updateVisualizationBlock(j, 'comparing');
            updateVisualizationBlock(minIdx, 'comparing');
            updateExplanation(`Comparing arr[${j}] = ${arr[j]} with minimum arr[${minIdx}] = ${arr[minIdx]}`);

            await sleep(101 - appState.speed);

            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }

            resetBlockStates();
            updateVisualizationBlock(i, 'sorted');
            appState.sortingStep++;
            updateProgressBar();
        }

        if (minIdx !== i) {
            appState.swaps++;
            updateMetrics();

            updateVisualizationBlock(i, 'swapping');
            updateVisualizationBlock(minIdx, 'swapping');
            updateExplanation(`Swapping arr[${i}] = ${arr[i]} with arr[${minIdx}] = ${arr[minIdx]}`);

            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            appState.array = arr;
            renderVisualization();

            updateVisualizationBlock(i, 'swapping');
            updateVisualizationBlock(minIdx, 'swapping');

            await sleep(101 - appState.speed);
        }

        resetBlockStates();
    }

    document.querySelectorAll('.array-block').forEach(block => {
        block.classList.remove('comparing', 'swapping');
        block.classList.add('sorted');
    });

    updateExplanation('Sorting complete! Array is now sorted.');
    appState.isSorting = false;
    updateButtonStates();
}

async function insertionSort() {
    const arr = [...appState.array];
    const n = arr.length;
    appState.totalSteps = n - 1;
    appState.sortingStep = 0;

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        // Mark sorted portion
        for (let k = 0; k < i; k++) {
            updateVisualizationBlock(k, 'sorted');
        }
        updateVisualizationBlock(i, 'comparing');

        updateExplanation(`Inserting arr[${i}] = ${key} into sorted portion`);

        await sleep(101 - appState.speed);

        while (j >= 0 && arr[j] > key) {
            if (!appState.isSorting) return;
            if (appState.isPaused) {
                await sleep(100);
                continue;
            }

            appState.comparisons++;
            updateMetrics();

            updateVisualizationBlock(j, 'comparing');
            updateExplanation(`Shifting arr[${j}] = ${arr[j]} right`);
            updateCodeTrace([
                { text: `for i = 1 to ${n-1}:`, current: false },
                { text: `  key = arr[${i}]`, current: false },
                { text: `  j = ${j}`, current: false },
                { text: `  while j >= 0 and arr[${j}] > ${key}:`, current: true },
                { text: `    arr[${j+1}] = arr[${j}]`, current: false }
            ]);

            arr[j + 1] = arr[j];
            appState.array = arr;
            renderVisualization();

            for (let k = 0; k < i; k++) {
                if (k < j + 1) updateVisualizationBlock(k, 'sorted');
            }
            updateVisualizationBlock(j, 'comparing');

            await sleep(101 - appState.speed);
            j--;
        }

        arr[j + 1] = key;
        appState.array = arr;
        renderVisualization();

        appState.sortingStep++;
        updateProgressBar();
        resetBlockStates();
    }

    document.querySelectorAll('.array-block').forEach(block => {
        block.classList.remove('comparing', 'swapping');
        block.classList.add('sorted');
    });

    updateExplanation('Sorting complete! Array is now sorted.');
    appState.isSorting = false;
    updateButtonStates();
}

// ============================================================================
// CONTROL FUNCTIONS
// ============================================================================

async function startSort() {
    if (appState.isSorting) return;

    appState.isSorting = true;
    appState.isPaused = false;
    appState.comparisons = 0;
    appState.swaps = 0;
    appState.sortingStep = 0;
    updateButtonStates();
    resetBlockStates();
    updateMetrics();

    const algo = appState.currentAlgorithm;
    
    if (algo === 'bubble') {
        await bubbleSort();
    } else if (algo === 'selection') {
        await selectionSort();
    } else if (algo === 'insertion') {
        await insertionSort();
    }
}

function togglePause() {
    appState.isPaused = !appState.isPaused;
}

function nextStep() {
    // Placeholder for next step functionality
    updateExplanation('Step-by-step mode not yet implemented');
}

function prevStep() {
    // Placeholder for previous step functionality
    updateExplanation('Step-by-step mode not yet implemented');
}

function resetSort() {
    appState.isSorting = false;
    appState.isPaused = false;
    appState.comparisons = 0;
    appState.swaps = 0;
    appState.sortingStep = 0;
    appState.totalSteps = 0;
    resetBlockStates();
    renderVisualization();
    updateExplanation('Ready to sort! Select an algorithm and click Play.');
    updateProgressBar();
    updateMetrics();
    updateButtonStates();
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
