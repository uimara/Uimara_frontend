var a = document.getElementById("info");

async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
  }
}

async function loadContract() {
  // set ABI
  var abi = [
    {
      constant: true,
      inputs: [{ name: "_tweetId", type: "uint256" }],
      name: "getTweetDetail",
      outputs: [
        { name: "tweetId", type: "uint256" },
        { name: "name", type: "string" },
        { name: "content", type: "string" },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_name", type: "string" },
        { name: "_content", type: "string" },
      ],
      name: "createTweet",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getTotalTweet",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "", type: "uint256" }],
      name: "tweets",
      outputs: [
        { name: "tweetId", type: "uint256" },
        { name: "name", type: "string" },
        { name: "content", type: "string" },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, name: "tweetId", type: "uint256" },
        { indexed: false, name: "name", type: "string" },
        { indexed: false, name: "content", type: "string" },
      ],
      name: "NewTwitter",
      type: "event",
    },
  ];

  //set contract address
  var contractAddress = "0xCBdcfE1e3F664ec31833E766B4a46ba725B8c0A3";

  return await new window.web3.eth.Contract(abi, contractAddress);
}

async function getBalance(address) {
  updateBalance("...");
  updateStatus("Fetching balance ...");

  const balance = await window.contract.methods.balanceOf(address).call();

  updateBalance(balance);
  updateStatus("Ready!");
}

async function getCurrentAccount() {
  const accounts = await window.web3.eth.getAccounts();
  return accounts[0];
}

async function load() {
  await loadWeb3();
  window.contract = await loadContract();
  updateStatus("Ready!");
}

function updateStatus(status) {
  const statusEl = document.getElementById("status");
  statusEl.innerHTML = status;
  console.log(status);
}

function updateBalance(balance) {
  const balanceEl = document.getElementById("balance");
  balanceEl.innerHTML = balance;
  console.log(balance);
}
