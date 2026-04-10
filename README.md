# 🔄 Sorting Algorithm Visualizer

A modern, interactive web application for visualizing and learning sorting algorithms with real-time metrics, AI suggestions, and multiple advanced modes.

## ✨ Features

### Core Features
- **5 Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort
- **Interactive Visualization**: Animated array bars with color-coded states (comparing, swapping, sorted)
- **Smooth Animations**: CSS transitions and requestAnimationFrame for fluid motion
- **Professional UI**: Glassmorphism design with dark/light mode toggle
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### Controls
- ▶ **Play/Pause**: Start and pause sorting
- ↻ **Reset**: Reset to original array
- ⬅/➜ **Step Controls**: Navigate frame-by-frame through sorting
- 🎲 **Speed Control**: 0.25x to 2x playback speed
- 📊 **Array Size**: Adjust from 10 to 100 elements
- 📝 **Custom Input**: Input comma-separated numbers
- 🎲 **Random Generator**: Create random arrays instantly

### Metrics & Analytics
- **Real-time Metrics**: Live comparisons, swaps, and elapsed time counters
- **Step Counter**: Track current step / total steps
- **Algorithm Info Panel**: Display time complexity, space complexity, stability, and use cases

### Advanced Features
1. **🤖 AI Algorithm Suggestion**
   - Analyzes array characteristics
   - Suggests optimal algorithm based on:
     - Nearly sorted detection
     - Completely reversed arrays
     - Array size
     - Inversion count
   - Auto-selects recommended algorithm

2. **⚔️ Comparison Mode**
   - Run two algorithms side-by-side
   - Synchronize animations
   - Compare metrics in real-time
   - Default: Merge Sort vs Quick Sort

3. **🎮 Gamified Mode**
   - Manually sort array by clicking/dragging bars
   - Timer and swap counter
   - Performance scoring
   - Fun, interactive learning experience

4. **⚡ Benchmark Mode**
   - Test algorithms on large datasets (100, 500, 1000 elements)
   - Measure execution time and operation counts
   - Grid-based result comparison

5. **🌙 Dark/Light Mode**
   - Toggle between themes
   - Persists preference in localStorage
   - Smooth theme transitions

## 🚀 Getting Started

### Quick Start
1. Open `index.html` in a modern web browser
2. Click "🎲 Random Array" to generate an array
3. Select a sorting algorithm from the dropdown
4. Click "▶ Play" to start the visualization

### No Installation Required!
This is a pure HTML/CSS/JavaScript application - no frameworks, no build tools, no dependencies. Just download and open in your browser.

## 📁 File Structure

```
Sorting-visualiser/
├── index.html       # Main HTML structure
├── style.css        # Styling & glassmorphism design
├── script.js        # All JavaScript logic
└── README.md        # This file
```

## 🎯 How to Use

### Basic Workflow
1. **Generate Array**: Click "🎲 Random Array" or enter custom values
2. **Choose Algorithm**: Select from 5 sorting algorithms
3. **Adjust Settings**:
   - Speed slider (0.25x - 2x)
   - Array size (10 - 100)
   - Step through manually with ⬅/➜ buttons
4. **Click Play**: Watch the algorithm sort the array
5. **View Metrics**: Monitor comparisons, swaps, and time

### Keyboard Shortcuts (Future Enhancement)
- `Space`: Play/Pause
- `R`: Reset
- `→`: Next Step
- `←`: Previous Step

### Features Explained

#### 🤖 AI Suggestion
- Analyzes your array for patterns
- Counts inversions to detect nearly-sorted arrays
- Suggests the best algorithm for your specific array
- Automatically switches to recommended algorithm

#### ⚔️ Comparison Mode
- Opens a full-screen split view
- Runs Merge Sort and Quick Sort simultaneously
- Perfect for understanding performance differences
- Shows side-by-side metrics

#### 🎮 Gamified Mode
- Click bars to select and swap
- Try to sort faster than the algorithm
- Compare your swaps against the algorithm's swaps
- Great for interactive learning

#### ⚡ Benchmark Mode
- Select dataset size (100, 500, or 1000 elements)
- Runs all algorithms without animation
- Displays execution time and metrics
- Useful for studying algorithm complexity

## 💡 Algorithm Complexities

| Algorithm | Average | Worst | Space | Stable |
|-----------|---------|-------|-------|--------|
| Bubble Sort | O(n²) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(1) | No |
| Insertion Sort | O(n²) | O(n²) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n²) | O(log n) | No |

## 🎨 Design Features

### Glassmorphism UI
- Frosted glass effect with backdrop blur
- Gradient borders and shadows
- Smooth hover animations
- Professional, modern appearance

### Color Scheme
- **Primary**: Indigo (#6366f1)
- **Secondary**: Violet (#8b5cf6)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Danger**: Red (#ef4444)

### Responsive Breakpoints
- Desktop: Full 3-column layout
- Tablet: Single column layout
- Mobile: Optimized controls and visualization

## 🔧 Customization

### Modify Speed Range
Edit in `script.js`:
```javascript
// Default: 0.25x to 2x
speedSlider.min = "0.25";
speedSlider.max = "2";
```

### Change Array Size Limits
Edit in `index.html`:
```html
<input type="range" id="arraySizeSlider" min="10" max="100" value="50">
```

### Adjust Colors
Edit in `style.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... */
}
```

## 🐛 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive support

## 📚 Code Architecture

### Modular Design
- **SortingAlgorithms**: All sorting implementations
- **Visualizer**: Rendering and animation logic
- **AIAnalyzer**: Array analysis and suggestions
- **BenchmarkEngine**: Performance testing
- **AppState**: Application state management

### Key Patterns
- Async/await for smooth animations
- Promise-based wait mechanism
- Event-driven UI updates
- Separation of concerns
- Clean, commented code

## 🎓 Learning Outcomes

This project helps you understand:
- How sorting algorithms work step-by-step
- Visual differences in algorithm behavior
- Time and space complexity in practice
- Algorithm selection for different scenarios
- Modern web development techniques

## 📈 Future Enhancements

Potential additions:
- Sound effects during swaps
- Voice narration (Web Speech API)
- More algorithms (Radix Sort, Heap Sort, etc.)
- Array generation patterns (nearly sorted, reversed, etc.)
- Statistics graphs and charts
- Keyboard shortcuts
- Tutorial mode with explanations

## 🙋 Tips for Learning

1. **Start with Bubble Sort**: Easy to follow, shows basic concepts
2. **Compare Algorithms**: Use comparison mode to see differences
3. **Try Gamified Mode**: Hands-on experience with sorting
4. **Use AI Suggestions**: Learn when to use each algorithm
5. **Run Benchmarks**: See real-world performance differences
6. **Slow Down Speed**: 0.25x speed for detailed observation

## 📄 License

Free to use, modify, and share for educational purposes.

## 🙌 Credits

Built as a modern educational tool for computer science students learning sorting algorithms.

---

**Happy Learning! 🚀**

For questions or suggestions, feel free to explore the code and experiment with modifications!
