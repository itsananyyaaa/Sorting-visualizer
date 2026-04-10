// ============================================================================
// SORTING ALGORITHM VISUALIZER - Main JavaScript
// A professional, feature-rich sorting algorithm visualization application
// ============================================================================

// ============================================================================
// MODULE: Step Tracker for Detailed Explanations
// ============================================================================

class StepTracker {
    constructor() {
        this.steps = [];
        this.currentStep = 0;
    }

    addStep(array, description, action = 'compare') {
        this.steps.push({
            array: [...array],
            description: description,
            action: action,
            stepNumber: this.steps.length + 1
        });
    }

    getStep(index) {
        return this.steps[index] || null;
    }

    getAllSteps() {
        return this.steps;
    }

    reset() {
        this.steps = [];
        this.currentStep = 0;
    }

    getTotalSteps() {
        return this.steps.length;
    }
}

// ============================================================================
// MODULE: Sorting Algorithms
// ============================================================================

class SortingAlgorithms {
    /**
     * Bubble Sort - O(n²) average and worst case
     * Simple comparison-based algorithm
     */
    static async bubbleSort(arr, visualizer, stepTracker = null) {
        const n = arr.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                visualizer.compare(j, j + 1);
                const shouldSwap = arr[j] > arr[j + 1];
                
                if (stepTracker) {
                    const desc = `Comparing ${arr[j]} and ${arr[j + 1]} → ${shouldSwap ? 'swapping' : 'no swap'}`;
                    stepTracker.addStep(arr, desc, shouldSwap ? 'swap' : 'compare');
                }
                
                if (shouldSwap) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    visualizer.swap(j, j + 1);
                }
                await visualizer.wait();
            }
            visualizer.markSorted(n - i - 1);
        }
        visualizer.markAllSorted();
    }

    /**
     * Selection Sort - O(n²) average and worst case
     * Finds minimum element and places it at the beginning
     */
    static async selectionSort(arr, visualizer, stepTracker = null) {
        const n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            
            if (stepTracker) {
                stepTracker.addStep(arr, `Finding minimum from unsorted part (starting at index ${i})`);
            }
            
            for (let j = i + 1; j < n; j++) {
                visualizer.compare(minIdx, j);
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                    if (stepTracker) {
                        stepTracker.addStep(arr, `Found new minimum: ${arr[minIdx]} at index ${minIdx}`);
                    }
                }
                await visualizer.wait();
            }
            if (minIdx !== i) {
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                visualizer.swap(i, minIdx);
                if (stepTracker) {
                    stepTracker.addStep(arr, `Swapped minimum ${arr[i]} to position ${i}`, 'swap');
                }
            }
            visualizer.markSorted(i);
        }
        visualizer.markAllSorted();
    }

    /**
     * Insertion Sort - O(n²) average and worst case
     * Builds sorted array one item at a time
     */
    static async insertionSort(arr, visualizer, stepTracker = null) {
        const n = arr.length;
        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;
            
            if (stepTracker) {
                stepTracker.addStep(arr, `Inserting element ${key} into sorted portion`);
            }
            
            while (j >= 0 && arr[j] > key) {
                visualizer.compare(j, i);
                arr[j + 1] = arr[j];
                visualizer.swap(j + 1, j);
                
                if (stepTracker) {
                    stepTracker.addStep(arr, `Shifting ${arr[j]} right to make space for ${key}`, 'swap');
                }
                
                j--;
                await visualizer.wait();
            }
            arr[j + 1] = key;
            
            if (stepTracker) {
                stepTracker.addStep(arr, `Placed ${key} at position ${j + 1}`, 'insert');
            }
            
            visualizer.markSortedRange(0, i);
        }
        visualizer.markAllSorted();
    }

    /**
     * Merge Sort - O(n log n) average and worst case
     * Divide and conquer algorithm
     */
    static async mergeSort(arr, visualizer) {
        await this._mergeSortHelper(arr, 0, arr.length - 1, visualizer);
        visualizer.markAllSorted();
    }

    static async _mergeSortHelper(arr, left, right, visualizer) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            await this._mergeSortHelper(arr, left, mid, visualizer);
            await this._mergeSortHelper(arr, mid + 1, right, visualizer);
            await this._merge(arr, left, mid, right, visualizer);
        }
    }

    static async _merge(arr, left, mid, right, visualizer) {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;

        while (i < leftArr.length && j < rightArr.length) {
            visualizer.compare(left + i, mid + 1 + j);
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                visualizer.swap(k, mid + 1 + j);
                j++;
            }
            k++;
            await visualizer.wait();
        }

        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            i++;
            k++;
        }

        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            j++;
            k++;
        }
    }

    /**
     * Quick Sort - O(n log n) average, O(n²) worst case
     * Divide and conquer with pivot
     */
    static async quickSort(arr, visualizer) {
        await this._quickSortHelper(arr, 0, arr.length - 1, visualizer);
        visualizer.markAllSorted();
    }

    static async _quickSortHelper(arr, low, high, visualizer) {
        if (low < high) {
            const pi = await this._partition(arr, low, high, visualizer);
            await this._quickSortHelper(arr, low, pi - 1, visualizer);
            await this._quickSortHelper(arr, pi + 1, high, visualizer);
        }
    }

    static async _partition(arr, low, high, visualizer) {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            visualizer.compare(j, high);
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                visualizer.swap(i, j);
            }
            await visualizer.wait();
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        visualizer.swap(i + 1, high);
        return i + 1;
    }
}

// ============================================================================
// MODULE: Visualizer - Handles rendering and animation
// ============================================================================

class Visualizer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.array = [];
        this.delay = 100;
        this.comparisons = 0;
        this.swaps = 0;
        this.startTime = 0;
        this.isSorting = false;
        this.isPaused = false;
        this.pausePromise = null;
        this.pauseResolve = null;
        this.stepMode = false;
        this.currentStep = 0;
        this.totalSteps = 0;
        this.history = [];
        this.comparisonIndices = [];
        this.sortedIndices = [];
    }

    /**
     * Initialize array visualization with bars
     */
    initializeArray(arr) {
        this.array = [...arr];
        this.comparisons = 0;
        this.swaps = 0;
        this.currentStep = 0;
        this.history = [];
        this.comparisonIndices = [];
        this.sortedIndices = [];
        this.render();
    }

    /**
     * Render current array state
     */
    render() {
        this.container.innerHTML = '';
        const maxValue = Math.max(...this.array);
        
        this.array.forEach((value, index) => {
            const barHeight = (value / maxValue) * 100;
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = barHeight + '%';
            
            // Apply styling based on state
            if (this.sortedIndices.includes(index)) {
                bar.classList.add('sorted');
            } else if (this.comparisonIndices.includes(index)) {
                bar.classList.add('comparing');
            }
            
            bar.title = value;
            this.container.appendChild(bar);
        });
    }

    /**
     * Mark indices as being compared
     */
    compare(i, j) {
        this.comparisonIndices = [i, j];
        this.comparisons++;
        updateMetrics();
    }

    /**
     * Mark indices as being swapped
     */
    swap(i, j) {
        this.swaps++;
        updateMetrics();
    }

    /**
     * Mark index as sorted
     */
    markSorted(index) {
        if (!this.sortedIndices.includes(index)) {
            this.sortedIndices.push(index);
        }
        this.render();
    }

    /**
     * Mark range as sorted
     */
    markSortedRange(start, end) {
        for (let i = start; i <= end; i++) {
            if (!this.sortedIndices.includes(i)) {
                this.sortedIndices.push(i);
            }
        }
        this.render();
    }

    /**
     * Mark all as sorted
     */
    markAllSorted() {
        this.sortedIndices = [...Array(this.array.length).keys()];
        this.comparisonIndices = [];
        this.render();
    }

    /**
     * Wait for animation delay or step
     */
    async wait() {
        this.currentStep++;
        this.render();
        updateMetrics();
        
        if (this.stepMode) {
            await new Promise(resolve => {
                this.pauseResolve = resolve;
            });
        } else {
            await new Promise(resolve => setTimeout(resolve, this.delay));
        }
        
        while (this.isPaused && !this.stepMode) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    /**
     * Set animation delay based on speed
     */
    setDelay(speedMultiplier) {
        const baseDelay = 100;
        this.delay = Math.max(10, baseDelay / speedMultiplier);
    }

    /**
     * Advance one step in step mode
     */
    nextStep() {
        if (this.pauseResolve) {
            this.pauseResolve();
            this.pauseResolve = null;
        }
    }

    /**
     * Get metrics
     */
    getMetrics() {
        return {
            comparisons: this.comparisons,
            swaps: this.swaps,
            time: Date.now() - this.startTime
        };
    }
}

// ============================================================================
// MODULE: AI Analysis Engine
// ============================================================================

class AIAnalyzer {
    static analyzeArray(arr) {
        const inversions = this.countInversions(arr);
        const isSorted = this.isSorted(arr);
        const isReversed = this.isReversed(arr);
        const isNearlySorted = inversions < arr.length * 0.1;

        let suggestion = '';
        let reason = '';

        if (isSorted) {
            suggestion = 'Insertion Sort';
            reason = 'Array is already sorted!';
        } else if (isReversed) {
            suggestion = 'Quick Sort';
            reason = 'Array is completely reversed. Quick Sort handles this efficiently.';
        } else if (isNearlySorted) {
            suggestion = 'Insertion Sort';
            reason = 'Array is nearly sorted. Insertion Sort excels with minimal inversions.';
        } else if (arr.length <= 50) {
            suggestion = 'Insertion Sort';
            reason = 'Small array size. Insertion Sort is optimal for small datasets.';
        } else {
            suggestion = 'Merge Sort';
            reason = 'Large, random array. Merge Sort offers consistent O(n log n) performance.';
        }

        return { suggestion, reason, inversions, isNearlySorted };
    }

    static countInversions(arr) {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i] > arr[j]) count++;
            }
        }
        return count;
    }

    static isSorted(arr) {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) return false;
        }
        return true;
    }

    static isReversed(arr) {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > arr[i - 1]) return false;
        }
        return true;
    }
}

// ============================================================================
// MODULE: Algorithm Information Database
// ============================================================================

const ALGORITHM_INFO = {
    bubble: {
        name: 'Bubble Sort',
        timeAvg: 'O(n²)',
        timeWorst: 'O(n²)',
        space: 'O(1)',
        stable: 'Yes',
        description: 'Compares adjacent elements and swaps them if they are in wrong order.'
    },
    selection: {
        name: 'Selection Sort',
        timeAvg: 'O(n²)',
        timeWorst: 'O(n²)',
        space: 'O(1)',
        stable: 'No',
        description: 'Selects minimum element and places it at the beginning repeatedly.'
    },
    insertion: {
        name: 'Insertion Sort',
        timeAvg: 'O(n²)',
        timeWorst: 'O(n²)',
        space: 'O(1)',
        stable: 'Yes',
        description: 'Builds sorted array one element at a time by inserting elements.'
    },
    merge: {
        name: 'Merge Sort',
        timeAvg: 'O(n log n)',
        timeWorst: 'O(n log n)',
        space: 'O(n)',
        stable: 'Yes',
        description: 'Divide and conquer algorithm that divides array and merges sorted subarrays.'
    },
    quick: {
        name: 'Quick Sort',
        timeAvg: 'O(n log n)',
        timeWorst: 'O(n²)',
        space: 'O(log n)',
        stable: 'No',
        description: 'Divide and conquer algorithm using pivot partitioning.'
    }
};

// ============================================================================
// MODULE: Application State and Control
// ============================================================================

class AppState {
    constructor() {
        this.array = [];
        this.originalArray = [];
        this.algorithm = 'bubble';
        this.speed = 1;
        this.arraySize = 50;
        this.mode = 'visualize';
        this.isSorting = false;
        this.isPaused = false;
        this.stepTracker = new StepTracker();
        this.currentStepIndex = 0;
        this.visualizers = {
            main: new Visualizer('canvas-container'),
            compare1: null,
            compare2: null,
            gamify: null
        };
    }

    generateRandomArray(size) {
        const arr = [];
        for (let i = 0; i < size; i++) {
            arr.push(Math.floor(Math.random() * 100) + 1);
        }
        this.array = arr;
        this.originalArray = [...arr];
        this.stepTracker.reset();
        this.currentStepIndex = 0;
        return arr;
    }

    parseCustomArray(input) {
        try {
            const arr = input.split(',').map(x => {
                const num = parseInt(x.trim());
                if (isNaN(num) || num < 1 || num > 100) throw new Error('Invalid');
                return num;
            });
            if (arr.length < 2) throw new Error('Need at least 2 elements');
            this.array = arr;
            this.originalArray = [...arr];
            this.stepTracker.reset();
            this.currentStepIndex = 0;
            return arr;
        } catch (e) {
            alert('Invalid input! Use comma-separated numbers between 1-100');
            return null;
        }
    }

    reset() {
        this.array = [...this.originalArray];
        this.stepTracker.reset();
        this.currentStepIndex = 0;
        this.visualizers.main.initializeArray(this.array);
    }
}

// ============================================================================
// MODULE: Benchmark Engine
// ============================================================================

class BenchmarkEngine {
    static async runBenchmarks(size) {
        const results = {};
        const algorithms = ['bubble', 'selection', 'insertion', 'merge', 'quick'];

        for (const algo of algorithms) {
            const arr = this.generateRandomArray(size);
            const startTime = performance.now();
            const visualizer = new Visualizer('canvas-container');
            visualizer.initializeArray(arr);

            // Temporarily disable animations
            visualizer.delay = 0;

            const algoFunc = SortingAlgorithms[algo + 'Sort'] || 
                           SortingAlgorithms[algo[0].toUpperCase() + algo.slice(1) + 'Sort'];
            
            if (algoFunc) {
                await algoFunc.call(SortingAlgorithms, arr, visualizer);
            }

            const endTime = performance.now();
            const time = endTime - startTime;

            results[algo] = {
                name: ALGORITHM_INFO[algo].name,
                time: time.toFixed(2),
                comparisons: visualizer.comparisons,
                swaps: visualizer.swaps
            };
        }

        return results;
    }

    static generateRandomArray(size) {
        const arr = [];
        for (let i = 0; i < size; i++) {
            arr.push(Math.floor(Math.random() * 100) + 1);
        }
        return arr;
    }
}

// ============================================================================
// MODULE: UI Controller
// ============================================================================

const appState = new AppState();

// Global UI Update Functions
function updateMetrics() {
    const metrics = appState.visualizers.main.getMetrics();
    document.getElementById('comparisons').textContent = metrics.comparisons;
    document.getElementById('swaps').textContent = metrics.swaps;
    document.getElementById('elapsedTime').textContent = metrics.time + 'ms';
    document.getElementById('stepCounter').textContent = appState.visualizers.main.currentStep;
}

function updateStepDetails() {
    const step = appState.stepTracker.getStep(appState.currentStepIndex);
    if (step) {
        document.querySelector('.step-description').textContent = step.description;
        document.querySelector('.action-type').textContent = step.action;
        document.querySelector('.array-state').textContent = '[' + step.array.join(', ') + ']';
        document.getElementById('totalSteps').textContent = appState.stepTracker.getTotalSteps();
    }
}

function updateAlgorithmInfo() {
    const info = ALGORITHM_INFO[appState.algorithm];
    document.getElementById('timeComplexity').textContent = info.timeAvg;
    document.getElementById('worstComplexity').textContent = info.timeWorst;
    document.getElementById('spaceComplexity').textContent = info.space;
    document.getElementById('stability').textContent = info.stable;
}

function setExplanation(text) {
    document.getElementById('explanation').textContent = text;
}

// ============================================================================
// MODULE: Event Listeners and Main Logic
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize
    appState.generateRandomArray(appState.arraySize);
    appState.visualizers.main.initializeArray(appState.array);
    updateAlgorithmInfo();
    setExplanation('Generate an array to begin...');

    // ========== Theme Toggle ==========
    const themeBtn = document.getElementById('themeBtn');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });

    // Load saved theme
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }

    // ========== Array Size Control ==========
    const arraySizeSlider = document.getElementById('arraySizeSlider');
    const arraySizeValue = document.getElementById('arraySizeValue');

    arraySizeSlider.addEventListener('input', (e) => {
        appState.arraySize = parseInt(e.target.value);
        arraySizeValue.textContent = appState.arraySize;
        appState.generateRandomArray(appState.arraySize);
        appState.visualizers.main.initializeArray(appState.array);
        setExplanation('Array size changed. Ready to sort!');
    });

    // ========== Speed Control ==========
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');

    speedSlider.addEventListener('input', (e) => {
        const speed = parseFloat(e.target.value);
        appState.speed = speed;
        speedValue.textContent = speed.toFixed(2) + 'x';
        appState.visualizers.main.setDelay(speed);
    });

    // ========== Algorithm Selection ==========
    const algorithmSelect = document.getElementById('algorithmSelect');
    algorithmSelect.addEventListener('change', (e) => {
        appState.algorithm = e.target.value;
        updateAlgorithmInfo();
        appState.reset();
        setExplanation(`Selected ${ALGORITHM_INFO[appState.algorithm].name}`);
    });

    // ========== Play Button ==========
    const playBtn = document.getElementById('playBtn');
    playBtn.addEventListener('click', async () => {
        if (appState.isSorting) return;

        appState.isSorting = true;
        appState.isPaused = false;
        playBtn.disabled = true;
        document.getElementById('pauseBtn').disabled = false;
        document.getElementById('resetBtn').disabled = true;
        document.getElementById('algorithmSelect').disabled = true;
        document.getElementById('arraySizeSlider').disabled = true;

        appState.visualizers.main.isSorting = true;
        appState.visualizers.main.startTime = Date.now();
        appState.visualizers.main.comparisons = 0;
        appState.visualizers.main.swaps = 0;

        try {
            const algoName = appState.algorithm + 'Sort';
            const sortFunc = SortingAlgorithms[algoName[0].toUpperCase() + algoName.slice(1)];
            
            if (sortFunc) {
                await sortFunc.call(SortingAlgorithms, appState.array, appState.visualizers.main, appState.stepTracker);
            }

            updateStepDetails();
            setExplanation(`✓ Sorting complete! Total steps: ${appState.stepTracker.getTotalSteps()}`);
        } catch (e) {
            console.error('Sort error:', e);
        }

        appState.isSorting = false;
        playBtn.disabled = false;
        document.getElementById('pauseBtn').disabled = true;
        document.getElementById('resetBtn').disabled = false;
        document.getElementById('algorithmSelect').disabled = false;
        document.getElementById('arraySizeSlider').disabled = false;
    });

    // ========== Pause Button ==========
    const pauseBtn = document.getElementById('pauseBtn');
    pauseBtn.addEventListener('click', () => {
        appState.isPaused = !appState.isPaused;
        appState.visualizers.main.isPaused = appState.isPaused;
        pauseBtn.textContent = appState.isPaused ? '▶ Resume' : '⏸ Pause';
    });

    // ========== Reset Button ==========
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', () => {
        appState.isSorting = false;
        appState.isPaused = false;
        appState.reset();
        document.getElementById('playBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
        document.getElementById('pauseBtn').textContent = '⏸ Pause';
        document.getElementById('algorithmSelect').disabled = false;
        document.getElementById('arraySizeSlider').disabled = false;
        setExplanation(`Ready to sort!`);
    });

    // ========== Next Step Button ==========
    const nextStepBtn = document.getElementById('nextStepBtn');
    nextStepBtn.addEventListener('click', () => {
        appState.visualizers.main.nextStep();
    });

    // ========== Previous Step Button ==========
    const prevStepBtn = document.getElementById('prevStepBtn');
    prevStepBtn.addEventListener('click', () => {
        // Placeholder for previous step functionality
        setExplanation('Previous step functionality requires history tracking');
    });

    // ========== Random Array Button ==========
    const randomBtn = document.getElementById('randomBtn');
    randomBtn.addEventListener('click', () => {
        appState.generateRandomArray(appState.arraySize);
        appState.visualizers.main.initializeArray(appState.array);
        setExplanation('New random array generated!');
    });

    // ========== Custom Array Input ==========
    const applyCustomBtn = document.getElementById('applyCustomBtn');
    const customInput = document.getElementById('customInput');

    applyCustomBtn.addEventListener('click', () => {
        const result = appState.parseCustomArray(customInput.value);
        if (result) {
            appState.visualizers.main.initializeArray(appState.array);
            setExplanation('Custom array applied successfully!');
            customInput.value = '';
        }
    });

    customInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            applyCustomBtn.click();
        }
    });

    // ========== AI Suggestion Button ==========
    const suggestBtn = document.getElementById('suggestBtn');
    suggestBtn.addEventListener('click', () => {
        const analysis = AIAnalyzer.analyzeArray(appState.array);
        const resultEl = document.getElementById('suggestResult');
        resultEl.innerHTML = `
            <strong>Suggested: ${analysis.suggestion}</strong><br>
            Reason: ${analysis.reason}<br>
            Inversions: ${analysis.inversions}
        `;
        // Auto-select suggested algorithm
        const algoKey = Object.keys(ALGORITHM_INFO).find(k => 
            ALGORITHM_INFO[k].name.includes(analysis.suggestion.split(' ')[0])
        ) || 'bubble';
        document.getElementById('algorithmSelect').value = algoKey;
        algorithmSelect.dispatchEvent(new Event('change'));
    });

    // ========== Mode Selection ==========
    const modeSelect = document.getElementById('modeSelect');
    modeSelect.addEventListener('change', (e) => {
        appState.mode = e.target.value;

        if (e.target.value === 'compare') {
            openComparisonMode();
        } else if (e.target.value === 'gamify') {
            openGamifyMode();
        } else if (e.target.value === 'benchmark') {
            openBenchmarkMode();
        } else {
            document.getElementById('comparisonMode').classList.remove('active');
            document.getElementById('gamifyMode').classList.remove('active');
            document.getElementById('benchmarkMode').classList.remove('active');
        }
    });

    // ========== Close Buttons ==========
    document.getElementById('closeComparison')?.addEventListener('click', () => {
        document.getElementById('comparisonMode').classList.remove('active');
        document.getElementById('modeSelect').value = 'visualize';
    });

    document.getElementById('closeGamify')?.addEventListener('click', () => {
        document.getElementById('gamifyMode').classList.remove('active');
        document.getElementById('modeSelect').value = 'visualize';
    });

    document.getElementById('closeBenchmark')?.addEventListener('click', () => {
        document.getElementById('benchmarkMode').classList.remove('active');
        document.getElementById('modeSelect').value = 'visualize';
    });
});

// ============================================================================
// ADVANCED FEATURES: Comparison Mode
// ============================================================================

async function openComparisonMode() {
    const mode = document.getElementById('comparisonMode');
    mode.classList.add('active');

    const algo1 = 'merge';
    const algo2 = 'quick';

    document.getElementById('algo1Name').textContent = ALGORITHM_INFO[algo1].name;
    document.getElementById('algo2Name').textContent = ALGORITHM_INFO[algo2].name;

    // Create visualizers for comparison
    const visualizer1 = new Visualizer('algo1Canvas');
    const visualizer2 = new Visualizer('algo2Canvas');

    const testArray = appState.array;
    const arr1 = [...testArray];
    const arr2 = [...testArray];

    visualizer1.initializeArray(arr1);
    visualizer2.initializeArray(arr2);

    visualizer1.setDelay(appState.speed);
    visualizer2.setDelay(appState.speed);

    visualizer1.startTime = Date.now();
    visualizer2.startTime = Date.now();

    // Run both algorithms in parallel
    const algo1Func = SortingAlgorithms[algo1 + 'Sort'];
    const algo2Func = SortingAlgorithms[algo2 + 'Sort'];

    await Promise.all([
        algo1Func.call(SortingAlgorithms, arr1, visualizer1),
        algo2Func.call(SortingAlgorithms, arr2, visualizer2)
    ]);

    // Update comparison metrics
    document.getElementById('algo1Comparisons').textContent = visualizer1.comparisons;
    document.getElementById('algo1Swaps').textContent = visualizer1.swaps;
    document.getElementById('algo1Time').textContent = visualizer1.getMetrics().time + 'ms';

    document.getElementById('algo2Comparisons').textContent = visualizer2.comparisons;
    document.getElementById('algo2Swaps').textContent = visualizer2.swaps;
    document.getElementById('algo2Time').textContent = visualizer2.getMetrics().time + 'ms';
}

// ============================================================================
// ADVANCED FEATURES: Gamified Mode
// ============================================================================

let gamifyState = {
    array: [],
    selected: null,
    swaps: 0,
    startTime: 0,
    visualizer: null
};

async function openGamifyMode() {
    const mode = document.getElementById('gamifyMode');
    mode.classList.add('active');

    gamifyState.array = [...appState.array];
    gamifyState.swaps = 0;
    gamifyState.startTime = Date.now();
    gamifyState.visualizer = new Visualizer('gamifyCanvas');
    gamifyState.visualizer.initializeArray(gamifyState.array);

    document.getElementById('gamifySwaps').textContent = '0';

    // Add click handlers to bars for manual sorting
    const bars = document.querySelectorAll('#gamifyCanvas .bar');
    bars.forEach((bar, index) => {
        bar.style.cursor = 'pointer';
        bar.addEventListener('click', () => {
            if (gamifyState.selected === null) {
                gamifyState.selected = index;
                bar.style.opacity = '0.5';
            } else if (gamifyState.selected === index) {
                gamifyState.selected = null;
                bar.style.opacity = '1';
            } else {
                // Swap
                [gamifyState.array[gamifyState.selected], gamifyState.array[index]] = 
                [gamifyState.array[index], gamifyState.array[gamifyState.selected]];
                gamifyState.swaps++;
                gamifyState.visualizer.initializeArray(gamifyState.array);
                document.getElementById('gamifySwaps').textContent = gamifyState.swaps;
                gamifyState.selected = null;
            }
        });
    });

    // Update timer
    setInterval(() => {
        const elapsed = Math.floor((Date.now() - gamifyState.startTime) / 1000);
        document.getElementById('gamifyTime').textContent = elapsed + 's';
    }, 100);
}

document.getElementById('submitGameBtn')?.addEventListener('click', () => {
    const isSorted = gamifyState.array.every((v, i, a) => i === 0 || a[i - 1] <= v);
    const elapsed = Math.floor((Date.now() - gamifyState.startTime) / 1000);

    if (isSorted) {
        alert(`✓ Sorted in ${elapsed}s with ${gamifyState.swaps} swaps!`);
        document.getElementById('gamifyMode').classList.remove('active');
    } else {
        alert('Not sorted yet! Keep trying.');
    }
});

// ============================================================================
// ADVANCED FEATURES: Benchmark Mode
// ============================================================================

async function openBenchmarkMode() {
    const mode = document.getElementById('benchmarkMode');
    mode.classList.add('active');

    const runBenchmarkBtn = document.getElementById('runBenchmarkBtn');
    const benchmarkSize = document.getElementById('benchmarkSize');

    runBenchmarkBtn.addEventListener('click', async () => {
        runBenchmarkBtn.disabled = true;
        benchmarkSize.disabled = true;
        document.getElementById('benchmarkResults').innerHTML = '<div class="loading"></div> Running benchmarks...';

        const size = parseInt(benchmarkSize.value);
        const results = await BenchmarkEngine.runBenchmarks(size);

        let html = '';
        Object.entries(results).forEach(([algo, data]) => {
            html += `
                <div class="benchmark-result">
                    <h4>${data.name}</h4>
                    <div class="result-row">
                        <span>Time:</span>
                        <span class="result-value">${data.time}ms</span>
                    </div>
                    <div class="result-row">
                        <span>Comparisons:</span>
                        <span class="result-value">${data.comparisons}</span>
                    </div>
                    <div class="result-row">
                        <span>Swaps:</span>
                        <span class="result-value">${data.swaps}</span>
                    </div>
                </div>
            `;
        });

        document.getElementById('benchmarkResults').innerHTML = html;
        runBenchmarkBtn.disabled = false;
        benchmarkSize.disabled = false;
    });
}

// ============================================================================
// END OF FILE
// ============================================================================
