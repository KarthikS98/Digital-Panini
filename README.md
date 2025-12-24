# 📚 Digital Pāṇini

An interactive web platform for learning Sanskrit grammar through Pāṇini's Aṣṭādhyāyī — built as an academic project for the Indian Knowledge Systems (IKS) curriculum.

## 🌟 Overview

Digital Pāṇini brings the ancient wisdom of Sanskrit grammar into the modern digital age. This platform offers an immersive learning experience through interactive tools, visual storytelling, and comprehensive reference materials based on Pāṇini's 2,500-year-old grammatical framework.

## ✨ Features

### 📖 **About Pāṇini**
- Interactive storytelling chapters about Pāṇini's life and work
- Visual exploration of the Aṣṭādhyāyī structure
- Modern impact and relevance in linguistics and computer science
- Famous sūtras with detailed explanations

### 🎓 **Interactive Grammar Tools**

#### Sandhi Playground
- Practice phonetic combinations (sandhi rules)
- Real-time transformations with explanations
- Theory cards with expandable content
- Direct links to relevant sūtras

#### Dhātu Explorer
- Browse 18+ Sanskrit verbal roots
- Search and filter by class (Bhvādi, Adādi, Divādi)
- View conjugations and example usage
- Integrated external references

#### Pratyaya Guide
- Explore Kṛt (primary) and Taddhita (secondary) suffixes
- Formation examples with detailed breakdowns
- Filter by suffix type and common usage
- 15+ suffixes with grammatical functions

### 📚 **Sūtra Reference**
- Integrated access to ashtadhyayi.com
- Context-aware navigation from interactive tools
- Smart back button system

### 🎨 **User Experience**
- First-time visitor welcome modal
- Traditional Indian scholarly theme (brown/cream/gold)
- Responsive design for all devices
- Smooth animations and transitions

## 🛠️ Technology Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6)
- **No Framework**: Vanilla JavaScript for lightweight performance
- **Storage**: LocalStorage for user preferences
- **Styling**: Custom CSS with traditional color palette
- **Design Pattern**: Mobile-first responsive design

## 📁 Project Structure

```
Digital-Panini/
├── index.html                      # Landing page with hero section
├── panini.html                     # Main navigation for chapters
├── chapter1-meet-panini.html       # Life and times of Pāṇini
├── chapter2-ashtadhyayi.html       # Structure of the Aṣṭādhyāyī
├── chapter3-modern-impact.html     # Influence on modern fields
├── chapter4-famous-sutras.html     # Notable sūtras explained
├── learn.html                      # Grammar tools hub
├── sandhi.html                     # Sandhi playground tool
├── dhatu.html                      # Dhātu root explorer
├── pratyaya.html                   # Pratyaya suffix guide
├── ashtadhyayi-detailed.html       # Sūtra reference (iframe integration)
├── style.css                       # Main stylesheet
├── script.js                       # Core JavaScript functionality
├── voices.json                     # Audio narration configuration
├── images/                         # Image assets
├── videos/                         # Video backgrounds
├── audio/                          # Audio files
└── Papers/                         # Reference documents
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser!

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/digital-panini.git
cd digital-panini
```

2. Open `index.html` in your browser:
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

Or simply drag `index.html` into your browser window.

### Local Development

For better development experience with live reload, you can use:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Then navigate to `http://localhost:8000`

## 🎯 Usage

1. **First Visit**: Welcome modal explains the platform structure
2. **Navigation**: Use the top navbar to access different sections
3. **Interactive Tools**: 
   - Go to "Learn Grammar" to practice Sandhi, explore Dhātu, and study Pratyaya
   - Click any "Learn More" button to access detailed sūtra references
4. **Back Navigation**: Smart back buttons remember your context

## 🎨 Design Philosophy

The website follows a traditional Indian scholarly aesthetic:
- **Colors**: Brown (#654321, #8B4513), Cream (#FFF8DC, #F5E6D3), Gold (#D4AF37)
- **Typography**: Georgia, Garamond, Times New Roman (scholarly serif fonts)
- **Layout**: Clean, hierarchical, content-focused
- **Interactions**: Subtle animations, smooth transitions

## 📱 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is an academic project, but suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📜 Academic Context

This project was developed as part of the **Indian Knowledge Systems (IKS)** curriculum for 7th semester students. It aims to:
- Bridge ancient Sanskrit grammar with modern web technology
- Make Pāṇini's work accessible to contemporary learners
- Demonstrate practical applications of IKS in digital education

## 🙏 Credits

- **Developer**: Karthik S
- **Course**: Indian Knowledge Systems (IKS)
- **Institution**: [Your College/University Name]
- **External References**: [ashtadhyayi.com](https://ashtadhyayi.com) for detailed sūtra explanations
- **Inspiration**: Pāṇini's Aṣṭādhyāyī and traditional Sanskrit grammar texts

## 📄 License

This project is created for educational purposes. Content inspired by classical Sanskrit texts is in the public domain.

For the code and original content:
```
© 2025 Karthik S - Academic Project (IKS)
Available for educational and non-commercial use.
```

## 📧 Contact

For questions or feedback about this project:
- **Email**: [your.email@example.com]
- **LinkedIn**: [Your LinkedIn Profile]
- **GitHub**: [@yourusername](https://github.com/yourusername)

---

**Note**: This is a student-built educational platform focused on making ancient Sanskrit grammar accessible through modern technology. All external references are credited appropriately.

## 🌟 Acknowledgments

Special thanks to:
- The ancient grammarian Pāṇini for his timeless work
- The IKS curriculum for promoting Indian knowledge systems
- Open-source educational resources in Sanskrit grammar
- The ashtadhyayi.com team for comprehensive sūtra documentation

---

<div align="center">

**Made with 🙏 for Sanskrit Grammar Learners**

[View Live Demo](#) | [Report Bug](#) | [Request Feature](#)

</div>
