# 🚀 Nexus-Shield

### Cross-Border Smart Contract Platform on Stellar (Level 2 Submission)

---

## 📌 Overview

**Nexus-Shield** is a decentralized application (dApp) built on the **Stellar Testnet**, enabling secure creation, storage, and verification of cross-border agreements using smart contracts.

This project demonstrates **multi-wallet integration**, **smart contract interaction**, and **real-time transaction tracking**, fulfilling all Level 2 (Yellow Belt) requirements.

---

## 🎯 Key Features

| Feature | Description |
|--------|-------------|
| 🔗 Multi-Wallet Support | Freighter (extension) + Albedo (web wallet) |
| 📜 Smart Contract | Deployed on Stellar Testnet (Soroban) |
| ⚡ Contract Interaction | Frontend calls contract functions (`store_hash`) |
| 📡 Real-Time Updates | Transaction status auto-updates |
| ❗ Error Handling | Wallet not found, rejected, insufficient balance |
| 🔍 Explorer Integration | Transaction hash + explorer link |
| 🧠 State Sync | UI reflects blockchain state dynamically |

---

## 🏗️ System Architecture

```
User (Frontend UI)
        ↓
Wallet Connection Layer
(Freighter / Albedo)
        ↓
Transaction Creation
        ↓
Stellar RPC (Soroban)
        ↓
Smart Contract Execution
        ↓
Blockchain Confirmation
        ↓
Frontend Polling / State Update
        ↓
UI Status Update (Pending → Success / Failed)
```

---

## 🔄 Flowchart (Execution Flow)

```
        [User Clicks "Anchor to Blockchain"]
                        ↓
        [Connect Wallet Selected]
                        ↓
        ┌───────────────┴───────────────┐
        ↓                               ↓
[Wallet Connected]             [Wallet Error]
        ↓                               ↓
[Create Transaction]           ❌ Show Error
        ↓
[Send Transaction to Stellar]
        ↓
⏳ Status = Pending
        ↓
[Poll Transaction Status]
        ↓
   ┌───────────────┬───────────────┐
   ↓               ↓               ↓
SUCCESS         FAILED        REJECTED
   ↓               ↓               ↓
✅ UI Update   ❌ UI Update   ❌ UI Update
```

---

## 🔐 Smart Contract Details

| Parameter | Value |
|----------|------|
| Network | Stellar Testnet |
| Platform | Soroban |
| Function Used | `store_hash()` |
| Input | Contract hash (string) |
| Output | Stored on-chain |

---

## 💻 Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | React + Next.js |
| Blockchain | Stellar Soroban |
| Wallet Integration | Stellar Wallets Kit |
| RPC | Stellar RPC Server |
| Explorer | Stellar Expert |

---

## 🔗 Multi-Wallet Integration

| Wallet | Type | Status |
|-------|------|--------|
| Freighter | Chrome Extension | ✅ Integrated |
| Albedo | Web Wallet | ✅ Integrated |

---

## ⚠️ Error Handling (3 Required Types)

| Error Type | Handling |
|-----------|---------|
| ❌ Wallet Not Installed | UI shows install message |
| ❌ User Rejected Transaction | UI shows rejection |
| ❌ Insufficient Balance | UI shows balance error |

👉 Errors are displayed in UI (not just console)

---

## ⏳ Transaction Status Tracking

| State | UI Representation |
|------|------------------|
| Pending | ⏳ Processing... |
| Success | ✅ Transaction Successful |
| Failed | ❌ Transaction Failed |

👉 Status updates in real-time using polling

---

## 🔁 Real-Time State Synchronization

- Transaction hash stored after submission  
- Polling every few seconds using RPC  
- UI updates automatically based on blockchain response  

---

## 🔍 Blockchain Verification

- Transaction hash displayed in UI  
- Clickable Stellar Explorer link  
- Fully verifiable on-chain  

---

## 📸 Example Transaction Flow

1. User creates contract  
2. Clicks **Anchor to Blockchain**  
3. Wallet signs transaction  
4. Transaction sent to Stellar  
5. UI shows **Pending**  
6. After confirmation → **Success**  
7. Hash available for verification  

---

## 📁 Project Structure

```
/app
  ├── components/
  │     ├── contract-editor.tsx
  │     ├── wallet-connect-modal.tsx
  │     └── blockchain-integration.tsx
  ├── lib/
  │     ├── stellar-contract-service.ts
  │     ├── stellar-service.ts
  │     └── utils.ts
  ├── pages/
  │     └── index.tsx
```

---

## 🔗 Links

- 🚀 Live Demo: https://nexus-shield-2.vercel.app/  
- 📂 GitHub Repo: https://github.com/sylvia-barick/nexus_shield_2  
- 🔍 Explorer Example: https://stellar.expert/explorer/testnet

---

## ✅ Level 2 Requirements Checklist

| Requirement | Status |
|------------|--------|
| Multi-wallet integration | ✅ |
| Smart contract deployed | ✅ |
| Contract called from frontend | ✅ |
| Transaction status visible | ✅ |
| 3 error types handled | ✅ |
| Real-time updates | ✅ |
| 2+ commits | ✅ |

---

## 🏁 Conclusion

Nexus-Shield demonstrates a complete **blockchain-integrated workflow** using Stellar:

- Multi-wallet interaction  
- Smart contract execution  
- Real-time transaction tracking  
- Strong error handling  

---


