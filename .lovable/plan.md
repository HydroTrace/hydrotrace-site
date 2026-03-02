

## Plan: WhatsApp Chat Mockup on Landing Page

### What
Create a new `WhatsAppMockup` component that renders a static, phone-framed WhatsApp Business chat mockup showing a hypothetical HydroTrace bot conversation. Place it on the main landing page between the Contact section and the Footer.

### Component: `src/components/WhatsAppMockup.tsx`
- **Phone frame**: iPhone-style bezel wrapper (rounded corners, notch, centered on page)
- **WhatsApp header**: Green bar with HydroTrace icon, name, verified badge
- **Chat bubbles**: Recreating the uploaded screenshot's flow:
  - User: "What is my remaining Quota?"
  - Bot: Quota response with a styled progress bar
  - Bot: "Please submit your meter reading"
  - User: Photo of meter (using `capture-meter-reading.png`)
  - Bot: OCR result confirmation
  - User: Location shared
  - Bot: Submission summary with checkmarks
- **Styling**: WhatsApp green outgoing bubbles, white incoming bubbles, timestamps, blue double-check marks
- **Bot text in IBM Plex Mono** to tie it to HydroTrace branding
- Section heading above: something like "Accessible via WhatsApp" with a short description

### Modify: `src/pages/Index.tsx`
- Import and add `<WhatsAppMockup />` between `<Contact />` and `<Footer />`

