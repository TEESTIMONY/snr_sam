// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Web3 functionality
    initWeb3();
});

// Initialize Web3 functionality
async function initWeb3() {
    // Check if MetaMask is installed
    const isMetaMaskInstalled = () => {
        return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
    };
    
    // Connect to MetaMask
    const connectWallet = async () => {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            
            // Update UI with connected wallet
            updateWalletUI(account);
            
            // Get network ID
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            handleChainChanged(chainId);
            
            // Listen for account changes
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            
            // Listen for chain changes
            window.ethereum.on('chainChanged', handleChainChanged);
            
            return account;
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            showError('Could not connect to wallet. Please try again.');
            return null;
        }
    };
    
    // Update UI when accounts change
    const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
            // User disconnected their wallet
            updateWalletUI(null);
            showError('Wallet disconnected.');
        } else {
            // User switched accounts
            updateWalletUI(accounts[0]);
        }
    };
    
    // Update UI when chain changes
    const handleChainChanged = (chainId) => {
        // Update network information
        const networkName = getNetworkName(chainId);
        updateNetworkInfo(networkName);
        
        // Reload the page if needed
        // window.location.reload();
    };
    
    // Get network name from chain ID
    const getNetworkName = (chainId) => {
        switch (chainId) {
            case '0x1':
                return 'Ethereum Mainnet';
            case '0x3':
                return 'Ropsten Testnet';
            case '0x4':
                return 'Rinkeby Testnet';
            case '0x5':
                return 'Goerli Testnet';
            case '0x2a':
                return 'Kovan Testnet';
            case '0x89':
                return 'Polygon Mainnet';
            case '0x38':
                return 'Binance Smart Chain';
            case '0xa86a':
                return 'Avalanche';
            default:
                return 'Unknown Network';
        }
    };
    
    // Update UI with wallet info
    const updateWalletUI = (account) => {
        const connectBtn = document.querySelector('.connect-btn');
        
        if (!connectBtn) return;
        
        if (account) {
            // Format account address
            const formattedAccount = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
            
            // Update button text and add connected class
            connectBtn.textContent = formattedAccount;
            connectBtn.classList.add('connected');
            
            // Show account in footer
            const ethAddress = document.querySelector('.eth-address code');
            if (ethAddress) {
                ethAddress.textContent = account;
            }
        } else {
            // Reset button text and remove connected class
            connectBtn.textContent = 'Connect Wallet';
            connectBtn.classList.remove('connected');
            
            // Reset footer address
            const ethAddress = document.querySelector('.eth-address code');
            if (ethAddress) {
                ethAddress.textContent = '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t';
            }
        }
    };
    
    // Update network info in UI
    const updateNetworkInfo = (networkName) => {
        // Create or update network info element if needed
        let networkInfo = document.querySelector('.network-info');
        
        if (!networkInfo) {
            const walletConnect = document.querySelector('.wallet-connect');
            
            if (walletConnect) {
                networkInfo = document.createElement('div');
                networkInfo.className = 'network-info';
                walletConnect.appendChild(networkInfo);
            }
        }
        
        if (networkInfo) {
            networkInfo.textContent = networkName;
        }
    };
    
    // Show error message
    const showError = (message) => {
        console.error(message);
        
        // In a real application, you would show a proper error message to the user
        // For this example, we'll just use the console and alert
        alert(message);
    };
    
    // Initialize the connect button
    const initConnectButton = () => {
        const connectBtn = document.querySelector('.connect-btn');
        
        if (!connectBtn) return;
        
        connectBtn.addEventListener('click', async () => {
            if (isMetaMaskInstalled()) {
                await connectWallet();
            } else {
                showError('MetaMask is not installed. Please install MetaMask and try again.');
                window.open('https://metamask.io/download.html', '_blank');
            }
        });
    };
    
    // Call initialization functions
    initConnectButton();
}

// Smart Contract Interaction Example (for future implementation)
async function interactWithContract() {
    if (typeof window.ethereum === 'undefined') {
        console.error('MetaMask is not installed!');
        return;
    }
    
    // Get the contract ABI and address (this would come from your deployed contract)
    const contractABI = [
        // Your contract ABI would go here
    ];
    const contractAddress = '0x123...'; // Your contract address

    try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        
        // Create Web3 instance
        const web3 = new Web3(window.ethereum);
        
        // Create contract instance
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        
        // Example: Reading data from the contract
        const result = await contract.methods.someFunction().call();
        console.log('Contract result:', result);
        
        // Example: Sending a transaction to the contract
        const tx = await contract.methods.someOtherFunction(param1, param2).send({
            from: account,
            value: web3.utils.toWei('0.01', 'ether') // If sending ETH
        });
        
        console.log('Transaction hash:', tx.transactionHash);
        
    } catch (error) {
        console.error('Error interacting with contract:', error);
    }
} 