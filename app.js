const walletButton = document.getElementById('walletButton');
const walletLabel = document.getElementById('walletLabel');
const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}
function shortAddress(address) { return address.slice(0, 6) + '...' + address.slice(-4); }
async function ensureBscMainnet() {
  const chainId = await window.ethereum.request({ method: 'eth_chainId' });
  if (chainId === '0x38') return;
  try {
    await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x38' }] });
  } catch (error) {
    if (error.code !== 4902) throw error;
    await window.ethereum.request({ method: 'wallet_addEthereumChain', params: [{
      chainId: '0x38', chainName: 'BNB Smart Chain',
      nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
      rpcUrls: ['https://bsc-dataseed.bnbchain.org'], blockExplorerUrls: ['https://bscscan.com/']
    }] });
  }
}
async function connectWallet() {
  if (!window.ethereum) { showToast('No wallet detected. Open this site in MetaMask or a compatible wallet browser.'); return; }
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (!accounts?.length) return;
    await ensureBscMainnet();
    walletLabel.textContent = shortAddress(accounts[0]);
    walletButton.classList.add('connected');
    showToast('Wallet connected to BNB Smart Chain. No transaction was made.');
  } catch (error) { showToast(error?.message?.slice(0, 120) || 'Wallet connection was cancelled.'); }
}
walletButton.addEventListener('click', connectWallet);
if (window.ethereum) {
  window.ethereum.on?.('accountsChanged', accounts => {
    walletLabel.textContent = accounts?.length ? shortAddress(accounts[0]) : 'Connect Wallet';
    walletButton.classList.toggle('connected', !!accounts?.length);
  });
  window.ethereum.on?.('chainChanged', () => window.location.reload());
}
document.getElementById('menuButton').addEventListener('click', () => document.getElementById('mobileNav').classList.toggle('open'));
document.querySelectorAll('#mobileNav a').forEach(link => link.addEventListener('click', () => document.getElementById('mobileNav').classList.remove('open')));

const ideaForm = document.getElementById('ideaForm');
ideaForm.addEventListener('submit', event => {
  event.preventDefault();
  const idea = document.getElementById('idea').value.trim();
  if (!idea) { showToast('Please describe your token idea first.'); return; }
  const style = document.getElementById('style').value;
  const purpose = document.getElementById('purpose').value;
  const ticker = document.getElementById('ticker').value.trim().toUpperCase() || 'Suggest 5 ticker symbols';
  const supply = document.getElementById('supply').value.trim() || 'Recommend options and explain trade-offs';
  const prompt = `Act as a careful BNB Smart Chain token project strategist. Create a responsible token concept brief using the details below. Do not promise returns, imply guaranteed profits, invent partnerships, or recommend deceptive tokenomics. Clearly label assumptions and risks.\n\nPROJECT IDEA:\n${idea}\n\nBRAND PERSONALITY: ${style}\nTOKEN PURPOSE: ${purpose}\nPREFERRED TICKER: ${ticker}\nTARGET SUPPLY: ${supply}\n\nPlease provide:\n1. Five original token name ideas and ticker options.\n2. A concise project description and tagline.\n3. A realistic utility proposal (avoid empty promises).\n4. Community and brand positioning ideas.\n5. A transparent tokenomics discussion with assumptions, allocation risks and supply considerations.\n6. A pre-launch checklist for BNB Smart Chain, including contract verification, ownership controls, liquidity disclosures, security review and legal review.\n7. A risk section explaining that AI suggestions are not financial, legal or security advice.\n\nReturn a structured, editable draft. Do not claim that a token has been deployed or audited.`;
  document.getElementById('promptOutput').textContent = prompt;
  document.getElementById('outputEmpty').hidden = true;
  document.getElementById('outputResult').hidden = false;
  showToast('Your AI launch brief prompt is ready.');
});
document.getElementById('copyPrompt').addEventListener('click', async () => {
  const prompt = document.getElementById('promptOutput').textContent;
  try { await navigator.clipboard.writeText(prompt); showToast('AI prompt copied. Paste it into your AI service.'); }
  catch { showToast('Select the prompt text and copy it manually.'); }
});
