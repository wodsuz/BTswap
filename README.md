## Project Overview

BTSwap is a cutting-edge decentralized exchange (DEX) built on the principles of transparency, security, and user-centric design. Empowering users to trade digital assets seamlessly on the blockchain, BTSwap offers a decentralized and secure trading experience.

## 📽️ Demo Video

🔗 [![BTSwap Demo]](https://www.loom.com/share/df83dfb0258643b898e46c6ab5f35b6f?sid=901e6473-ac3b-4293-941e-3099bdf30130)

https://github.com/user-attachments/assets/4a9f312f-368b-43da-8c2a-d302d02ec727

## 🛠️ Changes

💡 New Features & Improvements
git ad
✅ Added conversion logic from ETH to BASE <br>
✅ Implemented Swap Modal for better UI/UX <br>
✅ Swap Modal now opens when Swap button is clicked <br>
✅ Added Swap animation for improved user experience <br>
✅ Implemented Swap Completed Transaction Modal

## 🐞 Optimizations

🛠 Fixed amountB not updating in the Swap Modal by introducing finalAmountA and finalAmountB state variables<br>
🛠 Updated Swap button click handler to store amountB before opening the modal<br>
🛠 Modified SwapModal props to use finalAmountA and finalAmountB instead of amountA and amountB<br>
🛠 Fixed BigInt conversion errors when multiplying with swapRate by scaling swapRate before BigInt conversion<br>
🛠 Improved slider and input synchronization by ensuring amountB updates dynamically when amountA changes<br>
🛠 Refactored getAmountOut function to prevent division errors and improve accuracy<br>
🛠 Cleaned the code for better readability and maintainability
