# Ranchi AutoCare demo website

## Files
- `index.html` — page structure and content
- `style.css` — responsive layout and visual styling
- `script.js` — navigation, service filters, form validation, WhatsApp and GSAP animations

## Run locally
1. Extract the ZIP file.
2. Open the `ranchi-autocare-website` folder in VS Code.
3. Install the VS Code **Live Server** extension if it is not installed.
4. Right-click `index.html` and choose **Open with Live Server**.

You can also open `index.html` directly in a browser, but Live Server is recommended.

## Required setup before testing WhatsApp
Open `script.js` and replace:
`const WHATSAPP_NUMBER = "91XXXXXXXXXX";`
with the real business WhatsApp number, including country code and without `+`, spaces or hyphens.

Example format only: `919876543210`

The booking form validates the visitor's name, phone number and selected service, then prepares a WhatsApp message. It does not save submissions to a database or send them to an email inbox.

## Customise before publishing
- Replace the demo brand name `Ranchi AutoCare`.
- Confirm the actual services and package inclusions with the business.
- Replace demo photos with the business's own images.
- Add the real business address, phone number, hours and social links.
- Confirm image usage rights and test the page on mobile.
- GSAP and Bootstrap Icons are loaded from CDNs, so an internet connection is required for those assets.
