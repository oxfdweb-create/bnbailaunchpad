# BNB AI Launchpad — GitHub Pages package

## Publish with GitHub Pages
1. Create a GitHub repository named `bnbailaunchpad` (public).
2. Upload **all files in this folder** to the repository root. Do not upload this ZIP as a ZIP file.
3. Open Settings → Pages. Under Build and deployment, choose Deploy from a branch, branch `main`, folder `/ (root)`, then Save.
4. In the Pages Custom domain field, enter `bnbailaunchpad.in` and save. The `CNAME` file is included.
5. In GoDaddy DNS, set these records (remove conflicting old `@` A records only):
   - A `@` → `185.199.108.153`
   - A `@` → `185.199.109.153`
   - A `@` → `185.199.110.153`
   - A `@` → `185.199.111.153`
   - CNAME `www` → `<your-github-username>.github.io`
6. Wait for DNS verification in GitHub Pages, then enable Enforce HTTPS when available.

Keep any existing MX/TXT records used for email.

## Prototype limitations
This is a static frontend prototype. Wallet connection and BNB Smart Chain network switching are included, but no token contract deployment, token sale, or live AI API is implemented. Do not collect seed phrases or private keys. A production launchpad needs a secure backend for AI API keys and reviewed/audited smart contracts before real transactions.
