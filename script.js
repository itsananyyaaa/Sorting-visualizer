// ============================================================================
// COMPREHENSIVE SORTING ALGORITHM VISUALIZER
// All features: Bubble, Selection, Insertion, Merge, Quick Sort
// Plus: Comparison Mode, Gamified Mode, Benchmark Mode, AI Suggestions
// ============================================================================

// AUDIO CONTEXT FOR SOUND EFFECTS
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// ============================================================================
// ALGORITHM DEFINITIONS WITH FULL METADATA
// ============================================================================

const ALGORITHMS = {
    bubble: {
        name: 'Bubble Sort',
        description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they\'re in the wrong order. Simple but inefficient for large datasets.',
        complexity: {
            best: 'O(n)',
            average: 'O(n²)',
            worst: 'O(n²)',
            space: 'O(1)',
            stability: 'Stable'
        },
        pseudoCode: `for i = 0 to n-1:
  for j = 0 to n-i-2:
    if arr[j] > arr[j+1]:
      swap(arr[j], arr[j+1])`,
        difficulty: 'Easy',
        useCases: 'Educational, small datasets'
    },
    selection: {
        name: 'Selection Sort',
        description: 'Divides the array into sorted and unsorted portions. Repeatedly finds the minimum element from the unsorted part and places it at the beginning.',
        complexity: {
            best: 'O(n²)',
            average: 'O(n²)',
            worst: 'O(n²)',
            space: 'O(1)',
            stability: 'Unstable'
        },
        pseudoCode: `for i = 0 to n-1:
  min_idx = i
  for j = i+1 to n:
    if arr[j] < arr[min_idx]:
      min_idx = j
  swap(arr[i], arr[min_idx])`,
        difficulty: 'Easy',
        useCases: 'When memory is limited'
    },
    insertion: {
        name: 'Insertion Sort',
        description: 'Builds the sorted array one item at a time. Iterates through an input array, and for each element, finds the place it belongs in the sorted list.',
        complexity: {
            best: 'O(n)',
            average: 'O(n²)',
            worst: 'O(n²)',
            space: 'O(1)',
            stability: 'Stable'
        },
        pseudoCode: `for i = 1 to n-1:
  key = arr[i]
  j = i - 1
  while j >= 0 and arr[j] > key:
    arr[j+1] = arr[j]
    j = j - 1
  arr[j+1] = key`,
        difficulty: 'Easy',
        useCases: 'Nearly sorted data, small datasets'
    },
    merge: {
        name: 'Merge Sort',
        description: 'Divide and conquer algorithm. Divides the array into halves, recursively sorts them, and then merges the sorted halves. Very efficient for large datasets.',
        complexity: {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n log n)',
            space: 'O(n)',
            stability: 'Stable'
        },
        pseudoCode: `mergeSort(arr, left, right):
  if left < right:
    mid = (left + right) / 2
    mergeSort(arr, left, mid)
    mergeSort(arr, mid+1, right)
    merge(arr, left, mid, right)`,
        difficulty: 'Medium',
        useCases: 'Large datasets, guaranteed O(n log n)'
    },
    quick: {
        name: 'Quick Sort',
        description: 'Divide and conquer algorithm using a pivot element. Highly efficient on average. Recursively partitions the array around a pivot.',
        complexity: {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n²)',
            space: 'O(log n)',
            stability: 'Unstable'
        },
        pseudoCode: `quickSort(arr, low, high):
  if low < high:
    pi = partition(arr, low, high)
    quickSort(arr, low, pi-1)
    quickSort(arr, pi+1, high)`,
        difficulty: 'Medium',
        useCases: 'General-purpose, average case superior'
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
    originalArray: [],
    isSorting: false,
    isPaused: false,
    sortingStep: 0,
    totalSteps: 0,
    comparisons: 0,
    swaps: 0,
    sortingHistory: [],
    startTime: 0,
    endTime: 0,
    executionTime: 0,
    mode: 'normal',
    gameScore: 0,
    gameSwaps: 0,
    suggestedAlgorithm: null,
    soundEnabled: false
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
    speedValue: null,
    modeSelect: null,
    soundToggle: null,
    suggestBtn: null,
    benchmarkCanvas: null,
    comparisonViz1: null,
    comparisonViz2: null,
    gameViz: null,
    gameTimer: null,
    gameScore: null
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
    loadPreferences();
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
    DOM.modeSelect = document.getElementById('modeSelect');
    DOM.soundToggle = document.getElementById('soundToggle');
    DOM.suggestBtn = document.getElementById('suggestBtn');
    DOM.benchmarkCanvas = document.getElementById('benchmarkCanvas');
    DOM.gameViz = document.getElementById('gameViz');
    DOM.gameScore = document.getElementById('gameScore');
}

function initializeEventListeners() {
    DOM.themeToggle?.addEventListener('click', toggleTheme);
    DOM.modeSelect?.addEventListener('change', (e) => {
        appState.mode = e.target.value;
        resetSort();
    });
    DOM.soundToggle?.addEventListener('click', toggleSound);
    DOM.suggestBtn?.addEventListener('click', suggestAlgorithm);

    DOM.algoButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (appState.isSorting) return;
            DOM.algoButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            appState.currentAlgorithm = e.target.dataset.algo;
            resetSort();
            updateAlgorithmInfo();
        });
    });

    DOM.sizeSlider?.addEventListener('input', (e) => {
        appState.arraySize = parseInt(e.target.value);
        DOM.sizeValue.textContent = appState.arraySize;
        generateRandomArray();
        renderVisualization();
    });

    DOM.speedSlider?.addEventListener('input', (e) => {
        appState.speed = parseInt(e.target.value);
        const speedFactor = ((100 - e.target.value) / 50).toFixed(2);
        DOM.speedValue.textContent = speedFactor + 'x';
    });

    DOM.playBtn?.addEventListener('click', startSort);
    DOM.pauseBtn?.addEventListener('click', togglePause);
    DOM.nextBtn?.addEventListener('click', nextStep);
    DOM.prevBtn?.addEventListener('click', prevStep);
    DOM.resetBtn?.addEventListener('click', resetSort);

    DOM.applyBtn?.addEventListener('click', applyCustomArray);
    DOM.randomBtn?.addEventListener('click', generateRandomArray);
}

// ============================================================================
// THEME TOGGLE & PREFERENCES
// ============================================================================

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

function toggleSound() {
    appState.soundEnabled = !appState.soundEnabled;
    DOM.soundToggle?.classList.toggle('sound-enabled');
    localStorage.setItem('sound', appState.soundEnabled ? 'enabled' : 'disabled');
}

function loadPreferences() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
    if (localStorage.getItem('sound') === 'enabled') {
        appState.soundEnabled = true;
        DOM.soundToggle?.classList.add('sound-enabled');
    }
}

// ============================================================================
// SOUND EFFECTS
// ============================================================================

function playSwapSound() {
    if (!appState.soundEnabled) return;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.frequency.value = 400;
    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 0.1);
}

function playComparisonSound() {
    if (!appState.soundEnabled) return;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.frequency.value = 200;
    gain.gain.setValueAtTime(0.2, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 0.05);
}

function playCompleteSound() {
    if (!appState.soundEnabled) return;
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
        setTimeout(() => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.3, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            osc.start(audioContext.currentTime);
            osc.stop(audioContext.currentTime + 0.3);
        }, idx * 100);
    });
}

// ============================================================================
// AI ALGORITHM SUGGESTION
// ============================================================================

function analyzeArray() {
    const arr = appState.array;
    const n = arr.length;
    
    const isSorted = arr.every((v, i) => i === 0 || arr[i - 1] <= v);
    if (isSorted) return 'insertion';
    
    const isReverseSorted = arr.every((v, i) => i === 0 || arr[i - 1] >= v);
    if (isReverseSorted) return 'quick';
    
    let inversions = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (arr[i] > arr[j]) inversions++;
        }
    }
    
    const inversionRatio = inversions / (n * (n - 1) / 2);
    
    if (n <= 20) {
        if (inversionRatio < 0.2) return 'insertion';
        return 'bubble';
    }
    
    if (inversionRatio < 0.2) return 'insertion';
    if (n > 50) return 'merge';
    return 'quick';
}

function suggestAlgorithm() {
    const suggested = analyzeArray();
    appState.suggestedAlgorithm = suggested;
    const algo = ALGORITHMS[suggested];
    const message = `✨ Suggestion: <strong>${algo.name}</strong> - ${algo.useCases}`;
    
    alert(message);
}

// ============================================================================
// ARRAY MANAGEMENT
// ============================================================================

function generateRandomArray() {
    appState.array = Array.from({ length: appState.arraySize }, 
        () => Math.floor(Math.random() * 100) + 1
    );
    appState.originalArray = [...appState.array];
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
                return Math.max(1, Math.min(100, num));
            });
        
        appState.arraySize = appState.array.length;
        appState.originalArray = [...appState.array];
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
        <p style="margin-top: 8px; font-size: 0.9rem;"><strong>Difficulty:</strong> ${algo.difficulty} | <strong>Best For:</strong> ${algo.useCases}</p>
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
            <span>Stability:</span>
            <span>${algo.complexity.stability}</span>
        </div>
        <div class="metric-row">
            <span>Comparisons:</span>
            <span id="comparisonCount">0</span>
        </div>
        <div class="metric-row">
            <span>Swaps:</span>
            <span id="swapCount">0</span>
        </div>
        <div class="metric-row">
            <span>Time:</span>
            <span id="executionTime">0ms</span>
        </div>
    `;
}

function updateMetrics() {
    const compCount = document.getElementById('comparisonCount');
    const swapCount = document.getElementById('swapCount');
    const timeEl = document.getElementById('executionTime');
    
    if (compCount) compCount.textContent = appState.comparisons;
    if (swapCount) swapCount.textContent = appState.swaps;
    if (timeEl && appState.isSorting) {
        appState.executionTime = Date.now() - appState.startTime;
        timeEl.textContent = appState.executionTime + 'ms';
    }
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
        .map((line, idx) => `<code class="${line.current ? 'current' : ''}">${escapeHtml(line.text)}</code>`)
        .join('');
}

function updateButtonStates() {
    const isActive = appState.isSorting;
    DOM.playBtn?.setAttribute('disabled', isActive);
    DOM.sizeSlider?.setAttribute('disabled', isActive);
    DOM.speedSlider?.setAttribute('disabled', isActive);
    DOM.algoButtons.forEach(btn => btn.setAttribute('disabled', isActive));
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ============================================================================
// SORTING ALGORITHMS - BUBBLE SORT
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
            playComparisonSound();
            updateMetrics();

            updateVisualizationBlock(j, 'comparing');
            updateVisualizationBlock(j + 1, 'comparing');
            updateExplanation(`Comparing arr[${j}] = ${arr[j]} with arr[${j + 1}] = ${arr[j + 1]}`);

            await sleep(101 - appState.speed);

            if (arr[j] > arr[j + 1]) {
                appState.swaps++;
                playSwapSound();
                updateMetrics();

                updateVisualizationBlock(j, 'swapping');
                updateVisualizationBlock(j + 1, 'swapping');
                updateExplanation(`Swapping arr[${j}] = ${arr[j]} with arr[${j + 1}] = ${arr[j + 1]}`);

                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                appState.array = arr;
                renderVisualization();

                updateVisualizationBlock(j, 'swapping');
                updateVisualizationBlock(j + 1, 'swapping');

                await sleep(101 - appState.speed);
            }

            resetBlockStates();
            appState.sortingStep++;
            updateProgressBar();
        }

        for (let k = n - i - 1; k < n; k++) {
            updateVisualizationBlock(k, 'sorted');
        }
    }

    document.querySelectorAll('.array-block').forEach(block => {
        block.classList.remove('comparing', 'swapping');
        block.classList.add('sorted');
    });

    updateExplanation('✅ Sorting complete! Array is now sorted.');
    playCompleteSound();
    appState.isSorting = false;
    updateButtonStates();
}

// ============================================================================
// SORTING ALGORITHMS - SELECTION SORT
// ============================================================================

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
            playComparisonSound();
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
            playSwapSound();
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

    updateExplanation('✅ Sorting complete! Array is now sorted.');
    playCompleteSound();
    appState.isSorting = false;
    updateButtonStates();
}

// ============================================================================
// SORTING ALGORITHMS - INSERTION SORT
// ============================================================================

async function insertionSort() {
    const arr = [...appState.array];
    const n = arr.length;
    appState.totalSteps = n - 1;
    appState.sortingStep = 0;

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

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
            playComparisonSound();
            updateMetrics();

            updateVisualizationBlock(j, 'comparing');
            updateExplanation(`Shifting arr[${j}] = ${arr[j]} right`);

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
        appState.swaps++;
        playSwapSound();
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

    updateExplanation('✅ Sorting complete! Array is now sorted.');
    playCompleteSound();
    appState.isSorting = false;
    updateButtonStates();
}

// ============================================================================
// SORTING ALGORITHMS - MERGE SORT
// ============================================================================

async function mergeSort() {
    const arr = [...appState.array];
    appState.totalSteps = arr.length * Math.log2(arr.length);
    appState.sortingStep = 0;

    async function mergeSortHelper(low, high) {
        if (low < high) {
            const mid = Math.floor((low + high) / 2);
            await mergeSortHelper(low, mid);
            await mergeSortHelper(mid + 1, high);
            await merge(low, mid, high);
        }
    }

    async function merge(low, mid, high) {
        const left = arr.slice(low, mid + 1);
        const right = arr.slice(mid + 1, high + 1);
        let i = 0, j = 0, k = low;

        while (i < left.length && j < right.length) {
            if (!appState.isSorting) return;
            if (appState.isPaused) {
                await sleep(100);
                continue;
            }

            appState.comparisons++;
            playComparisonSound();
            updateMetrics();

            updateVisualizationBlock(low + i, 'comparing');
            updateVisualizationBlock(mid + 1 + j, 'comparing');

            await sleep(101 - appState.speed);

            if (left[i] <= right[j]) {
                arr[k++] = left[i++];
            } else {
                arr[k++] = right[j++];
            }

            appState.swaps++;
            appState.sortingStep++;
            appState.array = [...arr];
            renderVisualization();
            updateProgressBar();
            resetBlockStates();
        }

        while (i < left.length) {
            arr[k++] = left[i++];
            appState.array = [...arr];
            renderVisualization();
        }

        while (j < right.length) {
            arr[k++] = right[j++];
            appState.array = [...arr];
            renderVisualization();
        }
    }

    await mergeSortHelper(0, arr.length - 1);

    document.querySelectorAll('.array-block').forEach(block => {
        block.classList.remove('comparing', 'swapping');
        block.classList.add('sorted');
    });

    updateExplanation('✅ Merge Sort complete! Array is now sorted.');
    playCompleteSound();
    appState.isSorting = false;
    updateButtonStates();
}

// ============================================================================
// SORTING ALGORITHMS - QUICK SORT
// ============================================================================

async function quickSort() {
    const arr = [...appState.array];
    appState.totalSteps = arr.length * Math.log2(arr.length);
    appState.sortingStep = 0;

    async function quickSortHelper(low, high) {
        if (low < high) {
            const pi = await partition(low, high);
            await quickSortHelper(low, pi - 1);
            await quickSortHelper(pi + 1, high);
        }
    }

    async function partition(low, high) {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (!appState.isSorting) return i + 1;
            if (appState.isPaused) {
                await sleep(100);
                j--;
                continue;
            }

            appState.comparisons++;
            playComparisonSound();
            updateMetrics();

            updateVisualizationBlock(j, 'comparing');
            updateVisualizationBlock(high, 'comparing');

            await sleep(101 - appState.speed);

            if (arr[j] < pivot) {
                i++;
                appState.swaps++;
                playSwapSound();

                [arr[i], arr[j]] = [arr[j], arr[i]];
                appState.array = [...arr];
                renderVisualization();
            }

            appState.sortingStep++;
            updateProgressBar();
            resetBlockStates();
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        appState.array = [...arr];
        renderVisualization();

        return i + 1;
    }

    await quickSortHelper(0, arr.length - 1);

    document.querySelectorAll('.array-block').forEach(block => {
        block.classList.remove('comparing', 'swapping');
        block.classList.add('sorted');
    });

    updateExplanation('✅ Quick Sort complete! Array is now sorted.');
    playCompleteSound();
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
    appState.startTime = Date.now();
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
    } else if (algo === 'merge') {
        await mergeSort();
    } else if (algo === 'quick') {
        await quickSort();
    }

    appState.endTime = Date.now();
}

function togglePause() {
    appState.isPaused = !appState.isPaused;
    DOM.pauseBtn.textContent = appState.isPaused ? '▶ Resume' : '⏸ Pause';
}

function nextStep() {
    updateExplanation('⏭️ Step-by-step mode coming soon!');
}

function prevStep() {
    updateExplanation('⏮️ Step-by-step mode coming soon!');
}

function resetSort() {
    appState.isSorting = false;
    appState.isPaused = false;
    appState.comparisons = 0;
    appState.swaps = 0;
    appState.sortingStep = 0;
    appState.totalSteps = 0;
    appState.array = [...appState.originalArray];
    resetBlockStates();
    renderVisualization();
    updateExplanation('Ready to sort! Select an algorithm and click Play.');
    updateProgressBar();
    updateMetrics();
    updateButtonStates();
    DOM.pauseBtn.textContent = '⏸ Pause';
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
