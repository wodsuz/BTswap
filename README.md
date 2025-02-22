## Project Overview

BTSwap is a cutting-edge decentralized exchange (DEX) built on the principles of transparency, security, and user-centric design. Empowering users to trade digital assets seamlessly on the blockchain, BTSwap offers a decentralized and secure trading experience.

## 📽️ Demo Video

🔗 [![BTSwap Demo]](https://www.loom.com/share/df83dfb0258643b898e46c6ab5f35b6f?sid=901e6473-ac3b-4293-941e-3099bdf30130)

<video width="600" controls>
  <source src="https://private-user-images.githubusercontent.com/34207598/415879121-3838ff53-7cb3-4c09-b432-fc68e4e54917.mp4?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDAyMDA2MjUsIm5iZiI6MTc0MDIwMDMyNSwicGF0aCI6Ii8zNDIwNzU5OC80MTU4NzkxMjEtMzgzOGZmNTMtN2NiMy00YzA5LWI0MzItZmM2OGU0ZTU0OTE3Lm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAyMjIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjIyVDA0NTg0NVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTRkODZlMzA5NGVmZDM0NjdjYWNiNGQyYzIzNmFmNGRiMzUwNTk1MmUxYWI2YmQzODQ0NDY3YWU3NDg0MzljYTUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.W3TYuKJ2iy5tZmoJ6o--z0vdz_s7gInduEQ_AZ28900" type="video/mp4">
  Your browser does not support the video tag.
</video>

## 🛠️ Changes

💡 New Features & Improvements

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
