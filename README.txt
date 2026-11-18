YEVROPA OLAMI MILLIONER — SAFE PATCH

This is a patch for the exact source files supplied by the user.

Included files:
- index.html: repaired the duplicate nested HTML document shell by moving the original outer-head styles/meta into the actual document head. Existing game markup, scripts, language-pack loader, and features are preserved. Release marker advanced from 141 to 142 so the built-in updater can detect the revision.
- sw.js: cache generation advanced from yom-v227 to yom-v228. Existing network-first behavior and cache shell list are preserved.
- questions-din.js: included unchanged, byte-for-byte.

IMPORTANT DEPLOYMENT:
1. Upload/replace ONLY these three files in the existing website folder.
2. Do NOT delete or replace other files already on your website.
3. In particular, this chat did not include questions.js, questions-extra.js, or pack-*.js language files. They are still referenced by index.html and must remain on your hosting unchanged. This patch deliberately does not create empty substitutes, because doing so could remove your existing question bank or multilingual content.
4. After uploading, open the site and refresh once. If an old screen remains, clear the site's cached data or reopen in a private tab.

Validation performed: all inline JavaScript blocks in index.html and the supplied JS files were syntax-checked; original question data file was not modified. A full live gameplay test requires the missing hosted question-bank and language-pack files.
