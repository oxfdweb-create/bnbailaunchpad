# BNB AI Launchpad — GitHub Pages package

Custom domain: https://bnbailaunchpad.in  
Network target: BNB Smart Chain mainnet (chain ID 56)

## What this package includes
- Responsive black-and-gold BNB AI Launchpad frontend.
- AI Token Studio form that prepares a structured prompt for an AI service.
- Injected-wallet connection and BNB Smart Chain network switch (connection only; no transactions).
- `CNAME` file for `bnbailaunchpad.in`.
- Safety notices and clear preview-mode disclosures.

## Important current limitations
This is a frontend prototype. The AI form prepares a prompt locally; it does **not** call an AI model yet. To enable real AI generation, connect a backend/serverless API and keep the AI provider key on that server only. Never put API keys, wallet private keys, or seed phrases in this repository.

No token contract deployment, minting, token sales, liquidity, trading, or fundraising is implemented. Those require separately developed and independently reviewed smart contracts and supporting services. Do not treat AI output as legal, financial, or security advice.

## Publish on GitHub Pages
1. Create a **public** GitHub repository named `bnbailaunchpad` (or another name you prefer).
2. Upload the contents of this package so `index.html`, `app.js`, `style.css`, `CNAME`, and `assets/` are at the repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then Save.
5. Under **Custom domain**, enter `bnbailaunchpad.in` and save.
6. In GoDaddy DNS, create these A records for host `@`:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
7. Create a CNAME record: host `www`, points to `YOUR-GITHUB-USERNAME.github.io` (replace with your exact GitHub username).
8. Remove conflicting old A/AAAA/CNAME records for `@` or `www`, if present. Do not delete MX records or email-related TXT records.
9. Wait for DNS propagation, then return to Settings → Pages and enable **Enforce HTTPS** when available.

GitHub's DNS instructions: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Run locally
Open `index.html` in a browser. Wallet connection requires a browser with an injected EVM wallet.
