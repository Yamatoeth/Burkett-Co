# Burkett & Co - Accounting & Client Management

A modern, responsive website for an accounting firm featuring client management capabilities, professional services showcase, and enhanced user experience.

## 🌟 Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Client Management**: Add, edit, delete, and search clients
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive UI**: Toast notifications, loading states, and form validation
- **Professional Services**: Showcase of accounting and advisory services
- **Contact Forms**: Integrated contact and demo request functionality

## 🚀 Technologies Used

- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript**: Interactive functionality and client management
- **Google Fonts**: Inter font family for professional typography

## 🎨 UI/UX Features

### Visual Enhancements
- Smooth transitions and hover effects
- Loading spinners and progress indicators
- Toast notification system
- Form validation with visual feedback
- Responsive design for all screen sizes

### Interactive Elements
- Real-time client search with debouncing
- Modal dialogs for adding/editing clients
- Keyboard shortcuts (Escape, Ctrl+K)
- Click-to-select client management
- Auto-focus and form enhancement

## 📂 Project Structure

```
Burkett & Co/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── app.js             # JavaScript functionality
├── .gitignore         # Git ignore rules
└── README.md          # Project documentation
```

## 🛠️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Yamatoeth/Burkett-Co.git
   cd Burkett-Co
   ```

2. Open `index.html` in your browser or serve with a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using Live Server (VS Code extension)
   # Right-click on index.html and select "Open with Live Server"
   ```

3. Navigate to `http://localhost:8000` in your browser

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎯 Core Functionality

### Client Management
- **Add Clients**: Modal form with validation
- **Edit Clients**: In-place editing with pre-filled data
- **Delete Clients**: Confirmation dialog with loading states
- **Search Clients**: Real-time filtering by name, company, or email

### Notifications
- Success notifications for completed actions
- Error messages for validation failures
- Info messages for user guidance
- Auto-dismiss with manual close option

### Forms
- Contact form with validation
- Demo request functionality
- Real-time field validation
- Loading states during submission

## 🔧 Customization

### Colors & Branding
Edit the CSS custom properties in `styles.css`:
```css
:root {
  --bg: #f7f9fb;
  --card: #ffffff;
  --muted: #6b7280;
  --accent: #0f6fff;
  --accent-600: #0b58d0;
  /* ... */
}
```

### Client Data
Modify the initial client data in `app.js`:
```javascript
let clients = [
  {
    id: 1,
    name: 'Client Name',
    company: 'Company Name',
    email: 'email@example.com',
    phone: '+1 (555) 123-4567'
  },
  // Add more clients...
];
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

Project Link: [https://github.com/Yamatoeth/Burkett-Co](https://github.com/Yamatoeth/Burkett-Co)

---

**Burkett & Co** - Modern Accounting & Client Management Solution
