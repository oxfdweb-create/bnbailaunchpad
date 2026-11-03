const walletButton = document.getElementById('walletButton');
const walletLabel = document.getElementById('walletLabel');
const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}
function shortAddress(address) {
  return address.slice(0, 6) + '...' + address.slice(-4);
}
async function connectWallet() {
  if (!window.ethereum) {
    showToast('No wallet detected. Install MetaMask or another injected wallet.');
    return;
  }
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (!accounts || !accounts.length) return;
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== '0x38') {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x38' }]
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x38',
              chainName: 'BNB Smart Chain',
              nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
              rpcUrls: ['https://bsc-dataseed.binance.org/'],
              blockExplorerUrls: ['https://bscscan.com/']
            }]
          });
        } else {
          throw switchError;
        }
      }
    }
    walletLabel.textContent = shortAddress(accounts[0]);
    walletButton.classList.add('connected');
    showToast('Wallet connected. No transaction was made.');
  } catch (error) {
    showToast(error && error.message ? error.message.slice(0, 110) : 'Wallet connection was cancelled.');
  }
}
walletButton.addEventListener('click', connectWallet);
if (window.ethereum) {
  window.ethereum.on?.('accountsChanged', accounts => {
    walletLabel.textContent = accounts && accounts.length ? shortAddress(accounts[0]) : 'Connect Wallet';
    walletButton.classList.toggle('connected', !!(accounts && accounts.length));
  });
}
document.getElementById('menuButton').addEventListener('click', () => {
  document.getElementById('mobileNav').classList.toggle('open');
});
document.querySelectorAll('#mobileNav a').forEach(link => link.addEventListener('click', () => {
  document.getElementById('mobileNav').classList.remove('open');
}));
document.querySelectorAll('[data-prompt]').forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('agentPrompt').value = button.dataset.prompt;
    document.getElementById('agentPrompt').focus();
  });
});
document.getElementById('copyPrompt').addEventListener('click', async () => {
  const prompt = document.getElementById('agentPrompt').value.trim();
  if (!prompt) {
    showToast('Choose or write a prompt first.');
    return;
  }
  try {
    await navigator.clipboard.writeText(prompt);
    showToast('Prompt copied to clipboard.');
  } catch {
    document.getElementById('agentPrompt').select();
    showToast('Select the prompt and copy it manually.');
  }
});

const copyTokenButton = document.getElementById('copyTokenAddress');
if (copyTokenButton) {
  copyTokenButton.addEventListener('click', async () => {
    const address = document.getElementById('officialTokenAddress').textContent.trim();
    try {
      await navigator.clipboard.writeText(address);
      showToast('Official token address copied.');
    } catch {
      showToast('Copy unavailable. Press and hold the address to copy it.');
    }
  });
}
