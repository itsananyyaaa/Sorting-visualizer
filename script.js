// ============================================================================
// SORTING ALGORITHM VISUALIZER - STEP-BASED ARCHITECTURE
// ============================================================================

// ============================================================================
// ALGORITHM DEFINITIONS
// ============================================================================

const ALGORITHMS = {
    bubble: {
        name: 'Bubble Sort',
        description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they\'re in the wrong order. Simple to understand but inefficient for large datasets.',
        complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stability: 'Stable' },
        pseudoCode: `for i = 0 to n-1:
  for j = 0 to n-i-2:
    if arr[j] > arr[j+1]:
      swap(arr[j], arr[j+1])`,
        explanation: 'Bubble Sort repeatedly swaps adjacent elements if they are in the wrong order. Like bubbles rising to the surface, larger elements "bubble" to the end of the array with each pass.',
        difficulty: 'Easy',
        useCases: 'Educational purposes, small datasets'
    },
    selection: {
        name: 'Selection Sort',
        description: 'Divides array into sorted and unsorted portions. Repeatedly finds the minimum element from unsorted part and places it at the beginning.',
        complexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stability: 'Unstable' },
        pseudoCode: `for i = 0 to n-1:
  min_idx = i
  for j = i+1 to n-1:
    if arr[j] < arr[min_idx]:
      min_idx = j
  swap(arr[i], arr[min_idx])`,
        explanation: 'Selection Sort divides the input into a sorted portion (initially empty) and an unsorted portion. It repeatedly selects the smallest element from the unsorted portion and moves it to the sorted portion.',
        difficulty: 'Easy',
        useCases: 'When memory is limited'
    },
    insertion: {
        name: 'Insertion Sort',
        description: 'Builds the sorted array one item at a time by inserting elements into their correct position. Efficient for small datasets.',
        complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stability: 'Stable' },
        pseudoCode: `for i = 1 to n-1:
  key = arr[i]
  j = i - 1
  while j >= 0 and arr[j] > key:
    arr[j+1] = arr[j]
    j = j - 1
  arr[j+1] = key`,
        explanation: 'Insertion Sort builds the sorted array one item at a time. It iterates through an input array, and for each element, finds the place it belongs in the sorted list and inserts it there.',
        difficulty: 'Easy',
        useCases: 'Nearly sorted data, small arrays'
    },
    merge: {
        name: 'Merge Sort',
        description: 'Divide and conquer algorithm. Divides array into halves, recursively sorts them, and merges back together. Guaranteed O(n log n).',
        complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', stability: 'Stable' },
        pseudoCode: `mergeSort(arr, left, right):
  if left < right:
    mid = (left + right) / 2
    mergeSort(arr, left, mid)
    mergeSort(arr, mid+1, right)
    merge(arr, left, mid, right)`,
        explanation: 'Merge Sort uses the divide-and-conquer paradigm. It divides the array in half recursively until single elements remain, then merges them back together in sorted order.',
        difficulty: 'Medium',
        useCases: 'Large datasets, when O(n log n) is required'
    },
    quick: {
        name: 'Quick Sort',
        description: 'Divide and conquer using a pivot element. Highly efficient on average. Most widely used sorting algorithm in practice.',
        complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)', stability: 'Unstable' },
        pseudoCode: `quickSort(arr, low, high):
  if low < high:
    pi = partition(arr, low, high)
    quickSort(arr, low, pi-1)
    quickSort(arr, pi+1, high)`,
        explanation: 'Quick Sort divides the array around a pivot element. Elements smaller than the pivot are placed before it, and larger elements after it. This process is repeated recursively.',
        difficulty: 'Medium',
        useCases: 'General-purpose sorting, large datasets'
    }
};

// ============================================================================
// APPLICATION STATE
// ============================================================================

const appState = {
    currentAlgorithm: 'bubble',
    arraySize: 20,
    speed: 300, // milliseconds
    array: [],
    isSorting: false,
    isPaused: false,
    steps: [],
    currentStep: 0,
    animationId: null,
    comparisons: 0,
    swaps: 0
};

// ============================================================================
// DOM REFERENCES
// ============================================================================

let DOM = {};

function initializeDOM() {
    DOM = {
        // Algorithm Section
        algorithmSelect: document.getElementById('algorithmSelect'),
        algoDetailsSection: document.getElementById('algoDetailsSection'),
        algoInfo: document.getElementById('algoInfo'),

        // Array Input Section
        customInput: document.getElementById('customInput'),
        customError: document.getElementById('customError'),
        applyBtn: document.getElementById('applyBtn'),
        randomBtn: document.getElementById('randomBtn'),

        // Visualization Section
        stepExplanation: document.getElementById('stepExplanation'),
        arrayVisualization: document.getElementById('arrayVisualization'),
        progressFill: document.getElementById('progressFill'),

        // Playback Controls
        playBtn: document.getElementById('playBtn'),
        pauseBtn: document.getElementById('pauseBtn'),
        nextBtn: document.getElementById('nextBtn'),
        prevBtn: document.getElementById('prevBtn'),
        resetBtn: document.getElementById('resetBtn'),
        speedSlider: document.getElementById('speedSlider'),
        speedValue: document.getElementById('speedValue'),
        sizeSlider: document.getElementById('sizeSlider'),
        sizeValue: document.getElementById('sizeValue'),

        // Statistics
        stepCount: document.getElementById('stepCount'),
        comparisonCount: document.getElementById('comparisonCount'),
        swapCount: document.getElementById('swapCount'),

        // Details Section
        detailsSection: document.getElementById('detailsSection'),
        algoExplanation: document.getElementById('algoExplanation'),
        pseudoCode: document.getElementById('pseudoCode'),
        codeTrace: document.getElementById('codeTrace')
    };
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

function attachEventListeners() {
    // Algorithm selection
    DOM.algorithmSelect.addEventListener('change', handleAlgorithmChange);

    // Array input
    DOM.customInput.addEventListener('input', () => {
        DOM.customError.style.display = 'none';
    });
    DOM.applyBtn.addEventListener('click', applyCustomArray);
    DOM.randomBtn.addEventListener('click', generateRandomArray);

    // Playback controls
    DOM.playBtn.addEventListener('click', play);
    DOM.pauseBtn.addEventListener('click', pause);
    DOM.nextBtn.addEventListener('click', nextStep);
    DOM.prevBtn.addEventListener('click', prevStep);
    DOM.resetBtn.addEventListener('click', reset);

    // Sliders
    DOM.speedSlider.addEventListener('input', updateSpeedDisplay);
    DOM.sizeSlider.addEventListener('input', updateSizeDisplay);
}

// ============================================================================
// ALGORITHM SELECTION
// ============================================================================

function handleAlgorithmChange(e) {
    const algo = e.target.value;
    if (!algo) return;

    appState.currentAlgorithm = algo;
    displayAlgorithmInfo(algo);
    reset();
    generateRandomArray();
}

function displayAlgorithmInfo(algoKey) {
    const algo = ALGORITHMS[algoKey];
    if (!algo) return;

    let html = `
        <h4>Overview</h4>
        <p>${algo.description}</p>
        
        <h4>Complexity Analysis</h4>
        <p><strong>Best:</strong> ${algo.complexity.best} | <strong>Average:</strong> ${algo.complexity.average} | <strong>Worst:</strong> ${algo.complexity.worst}</p>
        <p><strong>Space:</strong> ${algo.complexity.space} | <strong>Stability:</strong> ${algo.complexity.stability}</p>
        
        <h4>Difficulty</h4>
        <p>${algo.difficulty}</p>
        
        <h4>Use Cases</h4>
        <p>${algo.useCases}</p>
    `;

    DOM.algoInfo.innerHTML = html;
    DOM.algoDetailsSection.style.display = 'block';
    DOM.detailsSection.style.display = 'block';

    DOM.algoExplanation.innerHTML = `<p>${algo.explanation}</p>`;
    DOM.pseudoCode.textContent = algo.pseudoCode;
}

// ============================================================================
// ARRAY INPUT & GENERATION
// ============================================================================

function parseCustomArray(input) {
    const trimmed = input.trim();
    if (!trimmed) {
        throw new Error('Array cannot be empty');
    }

    const parts = trimmed.split(',');
    const numbers = [];

    for (let i = 0; i < parts.length; i++) {
        const num = Number(parts[i].trim());
        if (isNaN(num)) {
            throw new Error(`Invalid number at position ${i + 1}: "${parts[i].trim()}"`);
        }
        numbers.push(num);
    }

    if (numbers.length === 0) {
        throw new Error('Array cannot be empty');
    }

    return numbers;
}

function showCustomError(message) {
    DOM.customError.textContent = message;
    DOM.customError.style.display = 'block';
}

function applyCustomArray() {
    try {
        const input = DOM.customInput.value;
        appState.array = parseCustomArray(input);
        appState.arraySize = appState.array.length;
        DOM.sizeSlider.value = appState.arraySize;
        DOM.sizeValue.textContent = appState.arraySize;
        DOM.customError.style.display = 'none';
        reset();
        generateSteps();
        updateUI(0);
    } catch (error) {
        showCustomError(error.message);
    }
}

function generateRandomArray() {
    const size = parseInt(DOM.sizeSlider.value);
    appState.arraySize = size;
    appState.array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    DOM.customInput.value = appState.array.join(', ');
    DOM.customError.style.display = 'none';
    reset();
    generateSteps();
    updateUI(0);
}

// ============================================================================
// STEP GENERATION FOR SORTING ALGORITHMS
// ============================================================================

function generateSteps() {
    const algo = appState.currentAlgorithm;
    appState.steps = [];

    // Create a copy to sort
    const arr = [...appState.array];
    appState.comparisons = 0;
    appState.swaps = 0;

    // Add initial step
    appState.steps.push({
        array: [...arr],
        action: 'start',
        indices: [],
        description: 'Sorting started'
    });

    // Generate steps based on algorithm
    switch (algo) {
        case 'bubble':
            generateBubbleSteps(arr);
            break;
        case 'selection':
            generateSelectionSteps(arr);
            break;
        case 'insertion':
            generateInsertionSteps(arr);
            break;
        case 'merge':
            generateMergeSteps(arr);
            break;
        case 'quick':
            generateQuickSteps(arr);
            break;
    }

    // Add final step
    appState.steps.push({
        array: [...arr],
        action: 'complete',
        indices: [],
        description: 'Sorting complete!'
    });
}

function generateBubbleSteps(arr) {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            appState.comparisons++;

            // Compare step
            appState.steps.push({
                array: [...arr],
                action: 'compare',
                indices: [j, j + 1],
                description: `Comparing arr[${j}]=${arr[j]} and arr[${j + 1}]=${arr[j + 1]}`
            });

            if (arr[j] > arr[j + 1]) {
                appState.swaps++;

                // Swap step
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                appState.steps.push({
                    array: [...arr],
                    action: 'swap',
                    indices: [j, j + 1],
                    description: `Swapped arr[${j}] and arr[${j + 1}]`
                });
            }
        }
    }
}

function generateSelectionSteps(arr) {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;

        for (let j = i + 1; j < n; j++) {
            appState.comparisons++;

            appState.steps.push({
                array: [...arr],
                action: 'compare',
                indices: [minIdx, j],
                description: `Comparing arr[${minIdx}]=${arr[minIdx]} and arr[${j}]=${arr[j]}`
            });

            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }

        if (minIdx !== i) {
            appState.swaps++;
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];

            appState.steps.push({
                array: [...arr],
                action: 'swap',
                indices: [i, minIdx],
                description: `Swapped arr[${i}] and arr[${minIdx}]`
            });
        }
    }
}

function generateInsertionSteps(arr) {
    const n = arr.length;

    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;

        appState.steps.push({
            array: [...arr],
            action: 'compare',
            indices: [i],
            description: `Inserting arr[${i}]=${key}`
        });

        while (j >= 0 && arr[j] > key) {
            appState.comparisons++;
            appState.swaps++;

            arr[j + 1] = arr[j];
            appState.steps.push({
                array: [...arr],
                action: 'swap',
                indices: [j, j + 1],
                description: `Shifting arr[${j}]=${arr[j]} to right`
            });

            j--;
        }

        arr[j + 1] = key;
    }
}

function generateMergeSteps(arr) {
    // Simplified merge sort visualization
    mergeSort(arr, 0, arr.length - 1);

    function mergeSort(arr, left, right) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }

    function merge(arr, left, mid, right) {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;

        while (i < leftArr.length && j < rightArr.length) {
            appState.comparisons++;

            appState.steps.push({
                array: [...arr],
                action: 'compare',
                indices: [left + i, mid + 1 + j],
                description: `Comparing ${leftArr[i]} and ${rightArr[j]}`
            });

            if (leftArr[i] <= rightArr[j]) {
                arr[k++] = leftArr[i++];
            } else {
                arr[k++] = rightArr[j++];
            }

            appState.swaps++;
            appState.steps.push({
                array: [...arr],
                action: 'swap',
                indices: [k - 1],
                description: `Placed element at position ${k - 1}`
            });
        }

        while (i < leftArr.length) {
            arr[k++] = leftArr[i++];
        }
        while (j < rightArr.length) {
            arr[k++] = rightArr[j++];
        }
    }
}

function generateQuickSteps(arr) {
    quickSort(arr, 0, arr.length - 1);

    function quickSort(arr, low, high) {
        if (low < high) {
            const pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            appState.comparisons++;

            appState.steps.push({
                array: [...arr],
                action: 'compare',
                indices: [j, high],
                description: `Comparing ${arr[j]} with pivot ${pivot}`
            });

            if (arr[j] < pivot) {
                i++;
                appState.swaps++;
                [arr[i], arr[j]] = [arr[j], arr[i]];

                appState.steps.push({
                    array: [...arr],
                    action: 'swap',
                    indices: [i, j],
                    description: `Swapped arr[${i}] and arr[${j}]`
                });
            }
        }

        appState.swaps++;
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        appState.steps.push({
            array: [...arr],
            action: 'swap',
            indices: [i + 1, high],
            description: `Placed pivot at position ${i + 1}`
        });

        return i + 1;
    }
}

// ============================================================================
// VISUALIZATION
// ============================================================================

function updateUI(stepIndex) {
    // Validate step index
    if (stepIndex < 0) stepIndex = 0;
    if (stepIndex >= appState.steps.length) stepIndex = appState.steps.length - 1;

    appState.currentStep = stepIndex;
    const step = appState.steps[stepIndex];

    // Update visualization
    renderVisualization(step);

    // Update step explanation
    DOM.stepExplanation.innerHTML = `<p>${step.description}</p>`;

    // Update progress bar
    const progress = (stepIndex / (appState.steps.length - 1)) * 100;
    DOM.progressFill.style.width = progress + '%';

    // Update statistics
    DOM.stepCount.textContent = `${stepIndex} / ${appState.steps.length - 1}`;
    DOM.comparisonCount.textContent = appState.comparisons;
    DOM.swapCount.textContent = appState.swaps;

    // Update code trace with current step details
    updateCodeTrace(stepIndex, step);

    // Update button states
    DOM.nextBtn.disabled = (stepIndex >= appState.steps.length - 1) || appState.isSorting;
    DOM.prevBtn.disabled = (stepIndex <= 0) || appState.isSorting;
    DOM.playBtn.disabled = appState.isSorting || stepIndex >= appState.steps.length - 1;
    DOM.pauseBtn.disabled = !appState.isSorting;
}

function renderVisualization(step) {
    DOM.arrayVisualization.innerHTML = '';

    const maxValue = Math.max(...step.array) || 1;
    const MAX_BAR_HEIGHT = 200; // px

    step.array.forEach((value, index) => {
        const item = document.createElement('div');
        item.className = 'array-item';

        // Bar fill — height proportional to value
        const fill = document.createElement('div');
        fill.className = 'bar-fill';
        const barHeight = Math.max(6, Math.round((value / maxValue) * MAX_BAR_HEIGHT));
        fill.style.height = barHeight + 'px';

        // Number label below bar
        const label = document.createElement('span');
        label.className = 'bar-label';
        label.textContent = value;

        item.appendChild(fill);
        item.appendChild(label);

        // Determine state
        const isSorted = checkIfSorted(step.array, index);
        if (isSorted) {
            item.classList.add('sorted');
        } else if (step.indices.includes(index)) {
            if (step.action === 'compare') {
                item.classList.add('comparing');
            } else if (step.action === 'swap') {
                item.classList.add('swapping');
            }
        }

        DOM.arrayVisualization.appendChild(item);
    });
}

function checkIfSorted(arr, upToIndex) {
    // Check if all elements from upToIndex onwards are in their sorted position
    for (let i = upToIndex; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) return false;
        }
    }
    return true;
}

function updateCodeTrace(stepIndex, step) {
    if (!step) {
        DOM.codeTrace.innerHTML = '<p class="code-placeholder">No steps yet</p>';
        return;
    }

    const traceHTML = `
        <div class="trace-entry">
            <div class="trace-header">Step ${stepIndex + 1}: ${step.action.toUpperCase()}</div>
            <div class="trace-content">
                <p><strong>Action:</strong> ${step.description}</p>
                <p><strong>Current Array:</strong> [${step.array.join(', ')}]</p>
                ${step.indices.length > 0 ? `<p><strong>Affected Indices:</strong> ${step.indices.join(', ')}</p>` : ''}
                <p><strong>Comparisons so far:</strong> ${appState.comparisons}</p>
                <p><strong>Swaps so far:</strong> ${appState.swaps}</p>
            </div>
        </div>
    `;
    DOM.codeTrace.innerHTML = traceHTML;
}

// ============================================================================
// PLAYBACK CONTROLS
// ============================================================================

function play() {
    if (appState.currentStep >= appState.steps.length - 1) return;

    appState.isSorting = true;
    appState.isPaused = false;
    DOM.playBtn.disabled = true;
    DOM.pauseBtn.disabled = false;

    function animateStep() {
        if (appState.isPaused || appState.currentStep >= appState.steps.length - 1) {
            appState.isSorting = false;
            updateUI(appState.currentStep);
            return;
        }

        appState.currentStep++;
        updateUI(appState.currentStep);

        if (appState.currentStep < appState.steps.length - 1) {
            appState.animationId = setTimeout(animateStep, 1000 - appState.speed);
        } else {
            appState.isSorting = false;
            updateUI(appState.currentStep);
        }
    }

    animateStep();
}

function pause() {
    appState.isPaused = true;
    if (appState.animationId) clearTimeout(appState.animationId);

    DOM.pauseBtn.disabled = true;
    DOM.playBtn.disabled = false;
    DOM.nextBtn.disabled = false;
    DOM.prevBtn.disabled = appState.currentStep <= 0;
}

function nextStep() {
    if (appState.currentStep < appState.steps.length - 1) {
        updateUI(appState.currentStep + 1);
    }
}

function prevStep() {
    if (appState.currentStep > 0) {
        updateUI(appState.currentStep - 1);
    }
}

function reset() {
    appState.isSorting = false;
    appState.isPaused = false;
    appState.currentStep = 0;

    if (appState.animationId) clearTimeout(appState.animationId);

    DOM.playBtn.disabled = true;
    DOM.pauseBtn.disabled = true;
    DOM.nextBtn.disabled = true;
    DOM.prevBtn.disabled = true;

    appState.comparisons = 0;
    appState.swaps = 0;
    appState.steps = [];

    DOM.stepExplanation.innerHTML = '<p>Select an algorithm and set an array to begin</p>';
    DOM.arrayVisualization.innerHTML = '';
    DOM.progressFill.style.width = '0%';
    DOM.stepCount.textContent = '0 / 0';
    DOM.comparisonCount.textContent = '0';
    DOM.swapCount.textContent = '0';
    DOM.codeTrace.innerHTML = '<p class="code-placeholder">Steps will appear here as the algorithm runs</p>';
}

// ============================================================================
// SLIDER CONTROLS
// ============================================================================

function updateSpeedDisplay() {
    const speed = parseInt(DOM.speedSlider.value);
    appState.speed = speed;

    let label = 'Very Slow';
    if (speed > 800) label = 'Very Fast';
    else if (speed > 600) label = 'Fast';
    else if (speed > 400) label = 'Normal';
    else if (speed > 200) label = 'Slow';

    DOM.speedValue.textContent = label;
}

function updateSizeDisplay() {
    const size = parseInt(DOM.sizeSlider.value);
    DOM.sizeValue.textContent = size;
    appState.arraySize = size;

    if (!appState.isSorting) {
        generateRandomArray();
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    initializeDOM();
    attachEventListeners();

    // Generate initial random array
    generateRandomArray();
});
