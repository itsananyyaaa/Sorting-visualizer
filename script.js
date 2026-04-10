// ============================================================================
// SORTING ALGORITHM VISUALIZER
// Clean, modern UI with empty layout for rebuilding
// ============================================================================

console.log('🚀 Sorting Algorithm Visualizer initialized');

// ============================================================================
// ALGORITHM INFORMATION
// ============================================================================

const ALGORITHMS = {
    bubble: {
        name: 'Bubble Sort',
        description: 'Compares adjacent elements and swaps them if in wrong order. Simple but inefficient for large datasets.',
        timeAvg: 'O(n²)',
        timeWorst: 'O(n²)',
        space: 'O(1)',
        stable: 'Yes'
    },
    selection: {
        name: 'Selection Sort',
        description: 'Finds minimum element and places it at beginning. Reduces number of swaps compared to bubble sort.',
        timeAvg: 'O(n²)',
        timeWorst: 'O(n²)',
        space: 'O(1)',
        stable: 'No'
    },
    insertion: {
        name: 'Insertion Sort',
        description: 'Builds sorted array one item at a time. Efficient for small datasets and nearly sorted data.',
        timeAvg: 'O(n²)',
        timeWorst: 'O(n²)',
        space: 'O(1)',
        stable: 'Yes'
    },
    merge: {
        name: 'Merge Sort',
        description: 'Divide and conquer algorithm. Divides array in half, sorts recursively, then merges results.',
        timeAvg: 'O(n log n)',
        timeWorst: 'O(n log n)',
        space: 'O(n)',
        stable: 'Yes'
    },
    quick: {
        name: 'Quick Sort',
        description: 'Divide and conquer with pivot partitioning. Average case is optimal, but worst case can be poor.',
        timeAvg: 'O(n log n)',
        timeWorst: 'O(n²)',
        space: 'O(log n)',
        stable: 'No'
    }
};

// ============================================================================
// APP STATE
// ============================================================================

const appState = {
    currentAlgorithm: 'bubble',
    arraySize: 20,
    speed: 1,
    isSorting: false,
    isPaused: false,
    array: []
};

// ============================================================================
// UI INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM loaded, initializing UI');
    
    initializeEventListeners();
    updateAlgorithmInfo();
    generateRandomArray();
});

// ============================================================================
// EVENT LISTENERS
// ============================================================================

function initializeEventListeners() {
    // Algorithm selection
    const algorithmSelect = document.getElementById('algorithmSelect');
    algorithmSelect.addEventListener('change', (e) => {
        appState.currentAlgorithm = e.target.value;
        updateAlgorithmInfo();
    });

    // Settings sliders
    const sizeSlider = document.getElementById('sizeSlider');
    const sizeValue = document.getElementById('sizeValue');
    sizeSlider.addEventListener('input', (e) => {
        appState.arraySize = parseInt(e.target.value);
        sizeValue.textContent = appState.arraySize;
        generateRandomArray();
    });

    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');
    speedSlider.addEventListener('input', (e) => {
        appState.speed = parseFloat(e.target.value);
        speedValue.textContent = appState.speed.toFixed(1) + 'x';
    });

    // Control buttons
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const randomBtn = document.getElementById('randomBtn');

    playBtn.addEventListener('click', () => {
        console.log('▶ Play button clicked');
        appState.isSorting = true;
        updateButtonStates();
    });

    pauseBtn.addEventListener('click', () => {
        console.log('⏸ Pause button clicked');
        appState.isPaused = !appState.isPaused;
        updateButtonStates();
    });

    resetBtn.addEventListener('click', () => {
        console.log('↻ Reset button clicked');
        appState.isSorting = false;
        appState.isPaused = false;
        generateRandomArray();
        updateButtonStates();
    });

    randomBtn.addEventListener('click', () => {
        console.log('🔀 Random array generated');
        generateRandomArray();
    });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function updateAlgorithmInfo() {
    const algo = ALGORITHMS[appState.currentAlgorithm];
    
    document.getElementById('algorithmDesc').textContent = algo.description;
    document.getElementById('timeComplexity').textContent = algo.timeAvg;
    document.getElementById('worstComplexity').textContent = algo.timeWorst;
    document.getElementById('spaceComplexity').textContent = algo.space;
    document.getElementById('stability').textContent = algo.stable;
}

function generateRandomArray() {
    appState.array = Array.from(
        { length: appState.arraySize },
        () => Math.floor(Math.random() * 100) + 1
    );
    
    renderVisualization();
    updateExplanation('Array generated. Ready to sort!');
}

function renderVisualization() {
    const container = document.getElementById('visualizationArea');
    container.innerHTML = '';
    
    const maxValue = Math.max(...appState.array);
    
    appState.array.forEach((value) => {
        const bar = document.createElement('div');
        bar.style.width = '100%';
        bar.style.height = (value / maxValue) * 200 + 'px';
        bar.style.backgroundColor = '#3b82f6';
        bar.style.borderRadius = '4px';
        bar.style.transition = 'all 0.1s ease';
        bar.style.minWidth = '20px';
        bar.title = value;
        container.appendChild(bar);
    });
}

function updateExplanation(text) {
    const explanationDiv = document.getElementById('explanation');
    explanationDiv.innerHTML = `<p>${text}</p>`;
}

function updateButtonStates() {
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const sizeSlider = document.getElementById('sizeSlider');
    const algorithmSelect = document.getElementById('algorithmSelect');

    if (appState.isSorting) {
        playBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = true;
        sizeSlider.disabled = true;
        algorithmSelect.disabled = true;
        
        if (appState.isPaused) {
            pauseBtn.textContent = '▶ Resume';
        } else {
            pauseBtn.textContent = '⏸ Pause';
        }
    } else {
        playBtn.disabled = false;
        pauseBtn.disabled = true;
        resetBtn.disabled = false;
        sizeSlider.disabled = false;
        algorithmSelect.disabled = false;
        pauseBtn.textContent = '⏸ Pause';
    }
}

// ============================================================================
// READY FOR ALGORITHM IMPLEMENTATION
// ============================================================================

console.log('✅ UI ready - Structure complete');
console.log('📝 Next: Implement sorting algorithms with visualization');
