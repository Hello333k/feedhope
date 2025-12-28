# FeedHope Nepal 🇳🇵

## Our Story

We're Anup and Samrat, two college students from Kathmandu who got tired of seeing perfectly good food being wasted while people in our community go hungry. This project started as our final year college project in December 2024, but it's become something we really care about.

The idea came to us when we noticed restaurants throwing away unsold food at closing time, while just a few blocks away, people were struggling to afford meals. We thought - there has to be a better way to connect these two.

## What is FeedHope?

A web platform that helps connect food donors (restaurants, stores, individuals) with people who need food. Simple as that. We're still learning and building this, but the basic idea works.

## Current Features (Work in Progress!)

- ✅ Food donation form (mostly working)
- ✅ User authentication (using Supabase - took forever to figure out!)
- ✅ Track your donations
- ⚠️ Partner store locator (still has some bugs)
- 🚧 Real-time notifications (planned)
- 🚧 Mobile app version (maybe someday?)

## How to Run This Locally

**You'll need:**
- Node.js (we're using v18, but v16+ should work)
- A code editor (VS Code recommended)
- Supabase account (free tier is enough)

**Setup:**

```bash
# Install stuff
npm install

# Create a .env file (see .env.example)
# Add your Supabase keys - DON'T commit these!

# Run the dev server
npm run dev
```

Then open http://localhost:8080 (we changed it from default port because reasons)

## Tech We're Using

We chose these because they seemed popular and had good tutorials:
- **React** with TypeScript (still getting used to TS honestly)
- **Tailwind CSS** for styling (way easier than plain CSS)
- **Framer Motion** for animations (maybe overdid it a bit)
- **Supabase** for backend (their docs are pretty good)
- **Vite** for building (it's fast!)

## Known Issues / TODO

Check our notes.md file for the full list, but main ones:
- [ ] Form validation needs work
- [ ] Mobile responsive on some pages is wonky
- [ ] Need to add actual map integration for stores
- [ ] Performance optimization (loads slow sometimes)
- [ ] Better error handling

## Want to Help?

We're new to open source, but if you want to contribute or have suggestions, feel free to open an issue or reach out. We're learning as we go!

## Contact

- **Anup & Samrat**
- Email: hello@feedhope.org (if this project takes off, we'll get a real domain)
- Phone: +977 9810876549
- Location: Kathmandu, Nepal

---

*Started: December 2024*  
*Last updated: December 28, 2025*

This is our first real web app project, so please be patient with us! 😅
