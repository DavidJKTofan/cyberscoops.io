# CyberScoops.io

A curated collection of cybersecurity news sources, YouTube channels, and technical blogs. Built with vanilla JavaScript and CSS, no external dependencies required.

## Features

- 🔍 Filtered view of different resource types (News, YouTube, Blogs)
- 🎨 Clean, minimalist design
- 📱 Fully responsive
- ⚡ No external dependencies
- 🌐 Built with vanilla JavaScript and some 🤖 AI magic

## Contributing Resources

Want to add a cybersecurity resource? Follow these steps:

1. Fork the repository
2. Edit `assets/js/data/resources.js`
3. Add your resource in the following format:

```javascript
{
    name: "Resource Name",
    url: "https://resource-url.com",
    category: "news", // Choose: news, youtube, or blogs
    icon: "globe", // Choose from available icons in icons.js
    description: "Brief description of the resource"
}
```

4. Create a Pull Request with:
   - The resource you're adding
   - A brief explanation of why it's valuable
   - Any relevant links or context

### Resource Guidelines

Resources should be:

- Active and regularly updated
- Focused on cybersecurity
- High-quality and reputable
- English language
- (Mostly) free to access

## Available Icons

Icons available for resources (defined in `assets/js/components/icons.js`):

- `newspaper` - For news sites
- `youtube` - For YouTube channels
- `bookOpen` - For blogs and documentation
- `shield` - For security-focused content
- `globe` - For general websites
- `cloud` - For cloud security resources
- `trendingUp` - For trending/current content

## Project Structure

```
root/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── main.js
│       ├── data/
│       │   └── resources.js
│       └── components/
│           ├── cards.js
│           ├── filters.js
│           └── icons.js
└── README.md
```

## License

MIT License - feel free to use this project for your own learning or create your own version!

## Support

- 🌟 Star this repo if you find it useful
- 🐛 Create an issue if you find a bug
- 💡 Submit a feature request if you have ideas
- 🔀 Pull requests are welcome

## Acknowledgments

- Original icon designs inspired by [Feather Icons](https://feathericons.com/)
- Initial resource list curated by the cybersecurity community
- Built with the help of some 🤖 AI magic

---

Made with 🛡️ for the cybersecurity community
