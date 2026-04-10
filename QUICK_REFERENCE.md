# ⚡ Quick Reference Guide

## 🎯 Main Controls

| Control | Action |
|---------|--------|
| ▶ Play | Start sorting animation |
| ⏸ Pause | Pause/Resume animation |
| ↻ Reset | Reset array to initial state |
| ⬅ Prev | Previous step (manual mode) |
| ➜ Next | Next step (manual mode) |
| 🎲 Random | Generate new random array |

## 🔧 Settings Explained

### Array Size Slider (10-100)
Adjusts the number of elements in the array
- **10-20**: Very fast, good for learning
- **50** (default): Good balance
- **100**: Biggest, shows performance differences

### Speed Slider (0.25x - 2x)
Controls animation speed
- **0.25x**: Slowest, great for detailed observation
- **1x** (default): Normal speed
- **2x**: Fast, for impatient viewing

### Algorithm Dropdown
Select which sorting algorithm to visualize
- **Bubble Sort**: Simple, easy to follow
- **Selection Sort**: Shows minimum selection
- **Insertion Sort**: Builds sorted portion gradually
- **Merge Sort**: Divide and conquer approach
- **Quick Sort**: Pivot-based partitioning

### Mode Dropdown
Choose visualization mode
- **Visualize**: Default single algorithm view
- **Compare Two**: Merge Sort vs Quick Sort side-by-side
- **Gamified**: Manually sort the array yourself
- **Benchmark**: Performance test on large datasets

## 🎨 Color Legend

| Color | Meaning |
|-------|---------|
| 🟦 Blue/Purple | Unsorted elements |
| 🟨 Yellow/Amber | Currently comparing |
| 🟥 Red | Currently swapping |
| 🟩 Green | Sorted/completed |

## 📊 Metrics Explained

### Comparisons
Number of times the algorithm checked if elements need to be swapped
- Reflects comparison operations
- Higher = more checks needed
- Good metric for comparing algorithms

### Swaps
Number of times two elements were exchanged
- Reflects write operations
- Bubble Sort: Often equal to comparisons
- Insertion Sort: Usually much lower
- Merge Sort: Fewer swaps, more comparisons

### Time
Elapsed wall-clock time in milliseconds
- Depends on speed setting
- Not affected by algorithm efficiency
- More for fun than measurement

## 🤖 AI Suggestion Tips

The AI analyzer looks at:
- **Inversions**: Number of out-of-order pairs
- **Sorted State**: Is it already sorted?
- **Reverse State**: Is it completely reversed?
- **Array Size**: Smaller vs larger arrays

### Suggestions Given:
- **Insertion Sort**: Nearly sorted or small arrays
- **Quick Sort**: Completely reversed arrays
- **Merge Sort**: Large, random arrays

Try creating these scenarios:
```
Nearly Sorted:    1,2,3,4,5,7,6,8,9,10
Reversed:         10,9,8,7,6,5,4,3,2,1
Random:           45,23,67,12,89,34,56,78
```

## 🎮 Gamified Mode Guide

**How to Play:**
1. Click a bar to select it (it darkens)
2. Click another bar to swap with selection
3. Continue until array is sorted (all bars ascending)
4. Click "Submit Solution" when done
5. See your performance vs algorithm

**Winning Strategy:**
- Identify smallest/largest elements first
- Group elements roughly by size
- Move large elements toward the right
- Move small elements toward the left

## ⚔️ Comparison Mode Guide

**What You See:**
- Left: Merge Sort running
- Right: Quick Sort running
- Both use same random array
- Animations synchronized

**What to Observe:**
- Number of comparisons (Merge Sort usually more)
- Number of swaps (varies by case)
- Total time taken (roughly similar)
- Differences in approach

## ⚡ Benchmark Mode Guide

**How It Works:**
1. Select dataset size (100, 500, or 1000)
2. Click "Run Benchmark"
3. All algorithms tested without animation
4. Results show in cards with metrics

**Metrics Shown:**
- **Time**: Actual execution time (no animation delay)
- **Comparisons**: Total comparison operations
- **Swaps**: Total swap operations

**Observations:**
- Merge Sort: Consistent O(n log n)
- Quick Sort: Usually fastest, sometimes slower
- Bubble Sort: Dramatically slower with more elements
- Insertion Sort: Good on small/nearly-sorted

## 💾 Custom Array Input

**Format:** Comma-separated integers (1-100)

**Examples:**
```
5,2,8,1,9              → Small array
10,20,30,40,50         → Already sorted
50,40,30,20,10         → Reverse sorted
1,1,1,1,1              → All same (interesting!)
```

**Validation:**
- Must have 2+ elements
- Numbers must be 1-100
- Non-numeric input rejected
- Invalid input shows alert

## 🌙 Dark/Light Mode

**Location:** Top-right corner (☀️ / 🌙)
**Saves:** Your preference in browser localStorage
**Applies To:** All panels and controls

## 📱 Responsive Behavior

**Desktop (>1200px):**
- 3-column layout (controls, visualization, info)
- All panels visible simultaneously
- Maximum information density

**Tablet (600-1200px):**
- 1-column layout
- Stack panels vertically
- All features available
- Touch-friendly controls

**Mobile (<600px):**
- Single column
- Larger touch targets
- Condensed controls
- Simplified information panel

## ⌨️ Keyboard Shortcuts (Available)

While there are no built-in shortcuts yet, you can easily add them by modifying `script.js`:

```javascript
// Example to add:
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') playBtn.click();
    if (e.code === 'KeyR') resetBtn.click();
    if (e.code === 'ArrowRight') nextStepBtn.click();
    if (e.code === 'ArrowLeft') prevStepBtn.click();
});
```

## 🐛 Troubleshooting

**Array not generating?**
- Try clicking "🎲 Random Array" again
- Clear browser cache if needed

**Animation too slow/fast?**
- Adjust speed slider
- Check if system is under load

**Custom input not working?**
- Ensure format: `1,2,3` (comma-separated)
- Numbers must be 1-100
- At least 2 elements needed

**Benchmark taking long?**
- Normal for 1000 elements
- JavaScript runs single-threaded
- Test on smaller sizes first

## 📚 Learning Path

### Beginner
1. Start with Bubble Sort on small array
2. Set speed to 0.25x or 0.5x
3. Observe step-by-step behavior
4. Try different array sizes

### Intermediate
1. Try all 5 algorithms
2. Note performance differences
3. Use AI suggestions
4. Compare two algorithms

### Advanced
1. Run benchmarks
2. Try custom arrays
3. Play gamified mode
4. Modify code to add features

## 🎓 Teaching Tips

**For Students:**
- Start with Bubble Sort (simplest)
- Use gamified mode for hands-on learning
- Compare algorithms to understand trade-offs
- Run benchmarks to see theory in practice

**For Teachers:**
- Use comparison mode for demonstrations
- Highlight color changes for clarity
- Adjust speed for board presentation
- Have students try gamified mode

## 🔧 Code Architecture Quick Tour

```
script.js Structure:
├── SortingAlgorithms (lines 1-300)
│   ├── bubbleSort()
│   ├── selectionSort()
│   ├── insertionSort()
│   ├── mergeSort()
│   └── quickSort()
├── Visualizer (lines 301-500)
│   ├── render()
│   ├── compare()
│   └── swap()
├── AIAnalyzer (lines 501-650)
│   └── analyzeArray()
├── AppState (lines 651-750)
└── Event Handlers (lines 751-935)
```

## 📝 Tips & Tricks

**Pro Tips:**
- Use 0.25x speed when presenting to large groups
- Run benchmarks with same size repeatedly for averages
- Try putting already-sorted arrays to test best-case
- Try reversed arrays to test worst-case

**Easter Eggs:**
- Try an array with all same numbers: `5,5,5,5,5`
- Try just 2 numbers: `10,1` (requires 1 comparison!)
- Watch Bubble Sort on reversed 20-element array (tragic!)

## ✨ Feature Highlights

**Most Useful Features:**
1. AI Suggestion - Learn algorithm selection
2. Comparison Mode - Understand performance
3. Benchmark Mode - See real execution times
4. Speed Control - Deep analysis at slow speed
5. Gamified Mode - Interactive learning fun

**Most Impressive Features:**
1. Real-time metrics update
2. Smooth color transitions
3. Glassmorphism UI design
4. Responsive layout
5. No external dependencies

---

**Everything you need to know to master the Sorting Visualizer!** 🚀
