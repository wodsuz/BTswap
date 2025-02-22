import React, { useEffect, useState } from "react";
import { FaTimes, FaCheckCircle, FaSpinner } from "react-icons/fa";
import Image from "next/image";
import TransactionCompleteModal from "../modals/TransactionCompleteModal"; // Import the new modal

interface SwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenA: { symbol: string; logoURI: string; amount: bigint };
  tokenB: { symbol: string; logoURI: string; amount: bigint };
  rate: number | null;
  slippage: number;
  confirmSwap: () => Promise<string>; // Function returns transaction hash
}

const SwapModal: React.FC<SwapModalProps> = ({
  isOpen,
  onClose,
  tokenA,
  tokenB,
  rate,
  slippage,
}) => {
  const [loadingRate, setLoadingRate] = useState(true);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false); // New state for animation

  useEffect(() => {
    if (rate !== null) {
      setLoadingRate(false);
    } else {
      setTimeout(() => setLoadingRate(false), 2000); // Simulated API delay
    }
  }, [rate]);

  if (!isOpen) return null;

  const expectedOutput = Number(tokenB.amount) / 1e18;
  const minReceived = expectedOutput * (1 - slippage / 100);
  const priceImpact = "0%"; // Simulated price impact
  const networkFee = "$2.72"; // Simulated fee

  const handleConfirmSwap = async () => {
    setIsConfirming(true); // Start animation

    try {
      setTxHash("0x1234567890abcdef"); // Simulated transaction hash

      // Stop animation, show confirmation message
      setTimeout(() => {
        setIsConfirming(false);
      }, 2000);

      // Open Transaction Complete Modal
      setTimeout(() => {
        setIsTransactionModalOpen(true);
      }, 2000);
    } catch (error) {
      console.error("Swap failed:", error);
      setIsConfirming(false);
    }
  };

  return (
    <>
      {/* SWAP MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-gray-900 text-white p-6 rounded-lg w-[600px] shadow-lg relative">
          {/* Close Button */}
          <button
            type="button"
            className="absolute text-gray-400 top-3 right-4 hover:text-gray-200"
            onClick={onClose}
            aria-label="Close swap confirmation modal"
            title="Close"
          >
            <FaTimes size={22} />
          </button>

          {/* Header */}
          <div className="flex items-center justify-between my-4">
            <h2 className="text-lg font-bold">Swap</h2>
            <span className="text-sm text-gray-400">Slippage: {slippage}%</span>
          </div>

          {/* Token Swap Section */}
          <div className="p-4 mb-3 bg-gray-800 rounded-lg">
            <div className="flex justify-between">
              <div>
                <input
                  title="Token A Amount"
                  type="text"
                  value={(Number(tokenA.amount) / 1e18).toFixed(6)}
                  className="w-full text-2xl font-bold text-white bg-transparent outline-none"
                  readOnly
                />
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  src={tokenA.logoURI}
                  alt={tokenA.symbol}
                  className="w-6 h-6"
                  width={24}
                  height={24}
                />
                <span>{tokenA.symbol}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-2">
            <span className="text-lg">⇄</span>
          </div>

          <div className="p-4 mb-4 bg-gray-800 rounded-lg">
            <div className="flex justify-between">
              <div>
                <input
                  title="Token B Amount"
                  type="text"
                  value={(Number(tokenB.amount) / 1e18).toFixed(6)}
                  className="w-full text-2xl font-bold text-white bg-transparent outline-none"
                  readOnly
                />
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  src={tokenB.logoURI}
                  alt={tokenB.symbol}
                  className="w-6 h-6"
                  width={24}
                  height={24}
                />
                <span>{tokenB.symbol}</span>
              </div>
            </div>
          </div>

          {/* Swap Details */}
          <div className="p-4 bg-gray-800 rounded-md">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Expected Output</span>
              <span>
                {expectedOutput.toFixed(6)} {tokenB.symbol}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Price Impact</span>
              <span className="text-green-400">{priceImpact}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Minimum Received</span>
              <span>
                {minReceived.toFixed(6)} {tokenB.symbol}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Network Fee</span>
              <span>{networkFee}</span>
            </div>
          </div>

          {/* Confirming Transaction Animation */}
          {isConfirming && (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <FaSpinner className="text-4xl text-blue-500 animate-spin" />
              <p className="mt-2 text-lg font-bold">
                Confirming transaction...
              </p>
            </div>
          )}

          {/* Confirmation Message */}
          {txHash && !isConfirming && (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <FaCheckCircle className="text-4xl text-green-500" />
              <p className="mt-2 text-lg font-bold">Transaction Successful!</p>
              <a
                href={`https://etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-blue-400 underline"
              >
                Track Transaction
              </a>
            </div>
          )}

          {/* Confirm Button */}
          {!txHash && !isConfirming && (
            <button
              className="w-full py-3 mt-4 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={handleConfirmSwap}
              disabled={loadingRate}
              aria-label="Confirm swap transaction"
              title="Confirm Swap"
            >
              {loadingRate ? "Loading..." : "Confirm Swap"}
            </button>
          )}
        </div>
      </div>

      {/* Transaction Complete Modal (Opens AFTER Swap Confirmation) */}
      <TransactionCompleteModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        txHash={txHash}
      />
    </>
  );
};

export default SwapModal;
