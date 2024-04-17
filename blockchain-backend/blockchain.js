// blockchain.js
class Block {
  constructor(index, timestamp, transactions, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return JSON.stringify(this.transactions) + this.index + this.previousHash;
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.pendingTransactions = [];
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), [], "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  minePendingTransactions() {
    let block = new Block(this.chain.length, Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
    this.chain.push(block);
    this.pendingTransactions = [];
  }
}

module.exports = Blockchain;
