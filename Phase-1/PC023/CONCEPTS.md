# PC 23: Pricing Tables - Concepts Guide

## Project Overview
A responsive pricing table with 3 cards where the center card is "popped out" to highlight it as the most popular option.

---

## 🎨 Key Concepts Used

### 1. **CSS Variables (Custom Properties)**
```css
:root {
    --primary-color: #6C5CE7;
    --text-dark: #2D3436;
}
```
**Why?** Variables make it easy to:
- Change colors globally
- Maintain consistency
- Reduce code repetition

---

### 2. **Flexbox Layout**
```css
.pricing-cards {
    display: flex;
    justify-content: center;    /* Centers horizontally */
    align-items: flex-end;      /* Aligns to bottom */
    gap: 30px;                  /* Space between cards */
}
```

**Why Flexbox?**
- Perfect for 1D layouts (rows or columns)
- Easy alignment and spacing
- Responsive by nature

**Key Properties:**
- `justify-content`: Horizontal alignment
- `align-items`: Vertical alignment
- `gap`: Space between items
- `flex-wrap`: Makes items wrap on small screens

---

### 3. **CSS Transforms - "Pop Out" Effect**
```css
.card.premium {
    transform: scale(1.1) translateY(-40px);
}
```

**Breaking it down:**
- `scale(1.1)`: Makes the card 10% larger
- `translateY(-40px)`: Moves it 40px upward
- Combined = Center card stands out visually

**Why transform over top/left?**
- Better performance (GPU accelerated)
- Doesn't affect document flow
- Smoother animations

---

### 4. **Box Shadows - Depth Effect**
```css
--shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

box-shadow: var(--shadow);
```

**Shadow Values:**
- `0` = X offset (horizontal)
- `10px` = Y offset (vertical, downward)
- `30px` = Blur radius (how soft)
- `rgba(0,0,0,0.1)` = Color & opacity

---

### 5. **Hover States & Transitions**
```css
.card {
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: var(--shadow-dark);
}
```

**Concept:**
- `transition`: Smoothly animates property changes
- `:hover`: Pseudo-class triggered on mouse over
- Creates interactive, polished feel

---

### 6. **Responsive Design - Media Queries**
```css
/* Desktop - Cards side-by-side */
.pricing-cards {
    display: flex;
    gap: 30px;
}

/* Tablet - Remove pop-out effect */
@media (max-width: 768px) {
    .card.premium {
        transform: scale(1) translateY(0);
    }
}

/* Mobile - Stack vertically */
@media (max-width: 480px) {
    .pricing-cards {
        flex-direction: column;
    }
}
```

**Breakpoints Used:**
- **Desktop**: Full layout
- **Tablet (≤768px)**: Cards still side-by-side, no pop-out
- **Mobile (≤480px)**: Cards stack vertically

---

### 7. **Gradient Backgrounds**
```css
background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
```

**How it works:**
- `linear-gradient()`: Creates smooth color transition
- `135deg`: Diagonal direction
- Color stops: `#667EEA` at 0%, `#764BA2` at 100%

---

### 8. **Pseudo-classes & Pseudo-elements**
```css
.features li:last-child {
    border-bottom: none;
}

.badge {
    padding: 8px 16px;
    border-radius: 20px;
}
```

**Pseudo-classes:**
- `:hover` - When user hovers
- `:active` - When clicked
- `:last-child` - Last item in list

**Pseudo-elements:**
- `::before`, `::after` - Add content without HTML

---

### 9. **Animation Keyframes**
```css
@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.card {
    animation: slideUp 0.6s ease forwards;
    animation-delay: 0.1s;  /* Stagger effect */
}
```

**Why?**
- Makes page feel alive and dynamic
- `animation-delay`: Creates cascading effect

---

## 📱 Responsive Behavior

| Screen Size | Layout | Pop-out Effect |
|-------------|--------|----------------|
| Desktop (>768px) | 3 cards horizontal | ✅ Yes (center card scaled & lifted) |
| Tablet (480-768px) | 3 cards horizontal | ❌ No (removed for space) |
| Mobile (<480px) | Stacked vertically | ❌ No |

---

## 🎯 Design Highlights

1. **Visual Hierarchy**: Premium card uses gradient background and badge
2. **Interactive Feedback**: Hover effects on cards and buttons
3. **Color Psychology**: 
   - Purple gradient = Premium/Professional
   - White cards = Clean, trustworthy
4. **Typography**: Different font sizes guide user attention
5. **Accessibility**: Text contrast, readable font sizes

---

## 💡 Things to Practice

1. Try changing the `scale()` value to see different pop-out effects
2. Modify `gap` value to adjust card spacing
3. Change breakpoints in media queries for different layouts
4. Add more animations to buttons
5. Customize colors using CSS variables

---

## 🚀 Next Steps

Once comfortable with this, move to:
- **PC 24**: Testimonial Carousel (CSS Scroll Snap)
- **PC 25**: Hero Section (Background images/videos)
- **PC 26**: Admin Dashboard (CSS Grid)
