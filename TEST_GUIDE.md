# Quick Start - Testing the Refactored Sorting Visualizer

## Open the Application

The app is running at: **http://localhost:8000**

Open this URL in your browser to see the sorting visualizer.

---

## Quick Test Sequence

### 1. **Test Algorithm Selection**
- [ ] Click the "Select Algorithm" dropdown
- [ ] You should see: Bubble, Selection, Insertion, Merge, Quick
- [ ] Select "Bubble Sort"
- [ ] Algorithm details should appear below with complexity info

### 2. **Test Array Input**
- [ ] Custom Input field shows: "12, 45, 23, 51, 19, 8, 34"
- [ ] Click "Apply Array" button
- [ ] The array should update and visualization should reset
- [ ] Try entering custom values like "5,3,8,1,9" and apply
- [ ] Error test: Try "5,,8" (double comma) - should show error

### 3. **Test Random Generation**
- [ ] Click "Generate Random" button
- [ ] A new random array should appear
- [ ] Try the "Array Size" slider (5-50)
- [ ] Moving the slider should generate a new random array

### 4. **Test Visualization**
- [ ] You should see array blocks in light blue
- [ ] Current step explanation shows below blocks
- [ ] Progress bar exists below visualization

### 5. **Test Play Button**
- [ ] Click the "Play" button
- [ ] Animation should start, stepping through the algorithm
- [ ] Blocks should change color:
  - Yellow = comparing
  - Red = swapping
  - Green = sorted
- [ ] Step progress updates (e.g., "5 / 47")

### 6. **Test Pause Button**
- [ ] During animation, click "Pause"
- [ ] Animation should stop
- [ ] Play button should become enabled again

### 7. **Test Next/Previous**
- [ ] While paused, click "Next" button
- [ ] Should advance one step
- [ ] Click "Previous" button
- [ ] Should go back one step

### 8. **Test Reset**
- [ ] Click "Reset" button
- [ ] Visualization should clear
- [ ] All counters should reset to 0
- [ ] Step explanation should show initial message

### 9. **Test Speed Slider**
- [ ] Try different speed settings
- [ ] Click Play and observe animation speed changes
- [ ] Speed label should show: Very Slow → Slow → Normal → Fast → Very Fast

### 10. **Test Size Slider**
- [ ] Adjust array size (5-50)
- [ ] Should generate new random array each time
- [ ] Try running Bubble Sort on different sizes

### 11. **Test Algorithm Comparison**
- [ ] Use same array for multiple algorithms
- [ ] Compare step counts, comparisons, swaps
- [ ] Notice different complexity patterns:
  - Bubble Sort: Many comparisons for unsorted
  - Merge Sort: Consistent O(n log n)
  - Quick Sort: Fast on average

### 12. **Test Custom Error Handling**
- [ ] Try entering: "abc"
- [ ] Try entering: "1, 2, "
- [ ] Try entering: (empty)
- [ ] All should show user-friendly error messages

---

## Expected Results

### Bubble Sort on Array: 5,2,8,1,9
- Total Steps: ~20-30
- Comparisons: 10
- Swaps: ~6-8
- Final Array: 1,2,5,8,9

### Merge Sort on Array: 5,2,8,1,9
- Total Steps: ~25-35
- Comparisons: ~7
- Swaps: ~14
- Final Array: 1,2,5,8,9

### Quick Sort on Array: 5,2,8,1,9
- Total Steps: ~15-25
- Comparisons: ~7
- Swaps: ~3-5
- Final Array: 1,2,5,8,9

---

## Visual Design Check

- [ ] Light theme (no dark backgrounds)
- [ ] Blue buttons with hover effects
- [ ] Clean white cards with subtle shadows
- [ ] Proper spacing and alignment
- [ ] Responsive on different window sizes
- [ ] Font is clean and readable
- [ ] Colors match design system

---

## Console Check

- [ ] Open browser DevTools (F12)
- [ ] Check Console tab
- [ ] Should have NO red error messages
- [ ] Should have NO warnings about missing elements

---

## Performance Check

- [ ] Animation should be smooth
- [ ] No lag when clicking buttons
- [ ] Size slider should respond instantly
- [ ] 50-item arrays should animate smoothly

---

## Success Criteria: ALL TESTS PASS ✅

If all above tests pass, the refactored sorting visualizer is fully functional!

---

## Troubleshooting

**If app doesn't load:**
- [ ] Check browser console (F12)
- [ ] Verify http://localhost:8000 is accessible
- [ ] Ensure all files are in `/Users/aluriananya/Desktop/Sorting-visualiser/`

**If buttons don't work:**
- [ ] Check JavaScript console for errors
- [ ] Verify DOM element IDs match in HTML and JS
- [ ] Try refreshing the page (Ctrl+R or Cmd+R)

**If visualization doesn't appear:**
- [ ] Check that array has values
- [ ] Try different algorithm
- [ ] Click "Reset" then "Play"

**If speed slider doesn't work:**
- [ ] Make sure animation is running
- [ ] Slider value should update label text first
- [ ] Then affect animation speed on next play

---

## Contact & Support

If you encounter any issues, please check:
1. Browser console for error messages
2. Network tab to ensure all files loaded
3. File integrity (check file sizes)
4. Browser compatibility (try different browser)
