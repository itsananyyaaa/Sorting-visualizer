# 🚀 Quick Start Guide

## Get Your Sorting Visualizer Running in 30 Seconds

### Option 1: Using Python (Easiest)
```bash
cd /Users/aluriananya/Desktop/Sorting-visualiser
python3 -m http.server 8000
```
Then open: **http://localhost:8000**

### Option 2: Using Node.js
```bash
cd /Users/aluriananya/Desktop/Sorting-visualiser
npx http-server -p 8000
```
Then open: **http://localhost:8000**

### Option 3: Using VS Code Live Server
1. Right-click `index.html`
2. Select "Open with Live Server"
3. Browser opens automatically

---

## 🎮 How to Use

### 1. Select an Algorithm
Click one of the three algorithm buttons:
- **Bubble** - Classic comparison-based sort
- **Selection** - Find minimum and place
- **Insertion** - Build sorted array incrementally

### 2. Adjust Array Size (Optional)
Slider: 5 elements (easy) to 50 elements (challenging)

### 3. Adjust Speed (Optional)
Speed slider: 0.1x (slow, detailed) to 3x (fast)

### 4. Click Play ▶️
Watch the algorithm sort in real-time!

### 5. Learn
- Read pseudo code on the left
- Watch visual animations
- Read step explanations
- Check complexity metrics
- See code trace highlighting

---

## 🌙 Features to Try

- **Dark Mode**: Click moon button (top-right)
- **Custom Array**: Enter numbers like `5,2,8,1,9` in the input box
- **Pause**: Pause during sorting to study steps
- **Reset**: Start over anytime
- **Random**: Generate new random array

---

## 💡 Learning Tips

1. **Start with Bubble Sort** - Most intuitive
2. **Try with small array size** (5-10) to see details
3. **Use slow speed** (0.1x) to follow along
4. **Read the pseudo code** to understand logic
5. **Watch the colors**:
   - 🟡 Yellow = Comparing elements
   - 🔴 Orange = Swapping elements
   - 🟢 Green = Already sorted

---

## 🔍 Understanding the Display

### Left Sidebar
- Algorithm selection buttons
- Algorithm description
- Pseudo code of the algorithm
- Play/Pause/Reset controls
- Array size and speed sliders
- Progress bar
- Custom array input

### Main Area
- **Visualization**: Animated bars showing array
- **Step Explanation**: What's happening right now
- **Complexity Metrics**: Best/average/worst case times
- **Code Trace**: Current line of pseudo code highlighted

---

## ⚡ Performance Notes

- **Large arrays** (40-50) take longer but show patterns
- **Fast speed** (2-3x) harder to follow visually
- **Comparison count** shows algorithm efficiency
- **Swap count** shows movement required

---

## 🐛 Troubleshooting

**Page won't load?**
→ Make sure server is running on port 8000

**Animations look choppy?**
→ Try slower speed, smaller array

**Colors not showing?**
→ Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

**Dark mode not working?**
→ Click moon button again or hard refresh

---

## 📊 Algorithm Comparison

| Algorithm | Best Case | Avg Case | Worst Case | Space | Stable |
|-----------|-----------|----------|------------|-------|--------|
| **Bubble** | O(n) | O(n²) | O(n²) | O(1) | ✅ Yes |
| **Selection** | O(n²) | O(n²) | O(n²) | O(1) | ❌ No |
| **Insertion** | O(n) | O(n²) | O(n²) | O(1) | ✅ Yes |

---

## 🎯 What to Notice

### Bubble Sort
- Many passes through array
- Adjacent elements compared repeatedly
- Worst performer on unsorted data

### Selection Sort
- Finds minimum each time
- Consistent comparisons O(n²)
- Less swapping than Bubble

### Insertion Sort
- Very fast on nearly-sorted data
- Good for small arrays
- Efficient for real-world use

---

## 🌐 Browser Support

Works on:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers
- ✅ Dark mode enabled

---

## 📱 Mobile Usage

The visualizer works great on phones and tablets:
1. Open http://localhost:8000 on your device
2. All buttons are touch-friendly
3. Sliders work smoothly
4. Dark mode helps at night

---

## 🎓 Educational Use

Perfect for:
- 👨‍🎓 Learning sorting algorithms
- 👩‍💼 Interview prep
- 📚 Teaching computer science
- 🔍 Understanding time complexity
- 🧠 Visual learning

---

## ⌨️ Keyboard Navigation

- **Tab**: Move between controls
- **Enter**: Click buttons
- **Arrows**: Adjust sliders
- **Space**: Play/pause (when focused on Play button)

---

## 💾 Your Data

- ✅ No data sent to servers
- ✅ Nothing stored online
- ✅ All processing on your computer
- ✅ Theme preference saved locally

---

## 🎨 Customization (Advanced)

Want to modify colors or algorithms?

1. Edit `style.css` for colors
2. Edit `script.js` to add new algorithms
3. Edit `index.html` for layout changes
4. See the comprehensive comments in code

---

## 📚 Learn More

Read the full documentation:
- `PROJECT_COMPLETE.md` - Complete feature list
- `IMPLEMENTATION_SUMMARY.md` - Technical details
- Comments in `script.js` - How algorithms work

---

## ✨ Features at a Glance

| Feature | Status |
|---------|--------|
| 3 Sorting Algorithms | ✅ |
| Real-time Visualization | ✅ |
| Dark Mode | ✅ |
| Responsive Design | ✅ |
| Speed Control | ✅ |
| Custom Arrays | ✅ |
| Step Explanations | ✅ |
| Complexity Info | ✅ |
| Code Trace | ✅ |
| Mobile Friendly | ✅ |

---

## 🎉 You're All Set!

Your professional sorting algorithm visualizer is ready to use. Start learning right now!

**Quick Start Command:**
```
cd /Users/aluriananya/Desktop/Sorting-visualiser && python3 -m http.server 8000
```

Then visit: **http://localhost:8000**

---

Enjoy! 🚀
