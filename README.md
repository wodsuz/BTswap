## Project Overview

BTSwap is a cutting-edge decentralized exchange (DEX) built on the principles of transparency, security, and user-centric design. Empowering users to trade digital assets seamlessly on the blockchain, BTSwap offers a decentralized and secure trading experience.

## 📽️ Demo Video

🔗 [![BTSwap Demo]](https://www.loom.com/share/df83dfb0258643b898e46c6ab5f35b6f?sid=901e6473-ac3b-4293-941e-3099bdf30130)

<video width="600" controls>
  <source src="https://raw.githubusercontent.com/wodsuz/BTswap/master/public/baseSwapVideo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## 🛠️ Recent Changes

💡 New Features & Improvements

- ✅ Added conversion logic from ETH to BASE
- ✅ Implemented Swap Modal for better UI/UX
- ✅ Swap Modal now opens when Swap button is clicked
- ✅ Added Swap animation for improved user experience
- ✅ Implemented Swap Completed Transaction Modal

## 🐞 Optimizations

- 🛠 Fixed amountB not updating in the Swap Modal by introducing finalAmountA and finalAmountB state variables
- 🛠 Updated Swap button click handler to store amountB before opening the modal
- 🛠 Modified SwapModal props to use finalAmountA and finalAmountB instead of amountA and amountB
- 🛠 Fixed BigInt conversion errors when multiplying with swapRate by scaling swapRate before BigInt conversion
- 🛠 Improved slider and input synchronization by ensuring amountB updates dynamically when amountA changes
- 🛠 Refactored getAmountOut function to prevent division errors and improve accuracy
- 🛠 Cleaned the code for better readability and maintainability
