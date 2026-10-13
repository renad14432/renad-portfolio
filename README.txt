RENAD portfolio — ready to run, no installation needed.

OPEN IT
- Double-click index.html (folder version) or renad-portfolio-single.html (everything inside one file).
- Works on phone and laptop. To open on a phone, upload the folder to a host (see PUBLISH) and open the link.

WHAT'S INSIDE
- Opens in light mode every time (dark mode is available from the header and lasts for the visit). A splash screen shows on the first open of each visit; tap to skip.
- Header: About · Projects · Skills · Certificates · Experience · Contact, language button (Arabic / English with RTL),
  CV download (assets/Renad_Aladwani_Resume.pdf) and dark / light button. On phones the links are a swipeable row (no menu button).
- Moving between pages plays a transition, and every page starts its animations when you arrive on it.
- Projects with hover-to-enlarge phones (tap to open on phones), typing index, GitHub "coming soon" note.
- Contact buttons are linked to LinkedIn, X, and email.

EDIT
- Text and projects: data.js (English + Arabic). Layout and motion: style.css and app.js.
- Replace images or the CV PDF in assets/ with the same file names.
- When your GitHub is ready, set  window.DATA.github = 'https://github.com/...'  at the end of data.js.

PUBLISH
- Upload this whole folder to Netlify Drop, Vercel, or GitHub Pages (index.html is the entry point).

NOTES
- Fonts load from Google Fonts when online; offline the site uses system fonts.
- Certificate images show certificate numbers and QR codes; blur them before publishing if you prefer.
- The Arabic text is a first draft; please review it.
- Your phone number is NOT published anywhere on the site (it is only inside the CV PDF).
