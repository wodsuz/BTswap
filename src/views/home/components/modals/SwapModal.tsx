import React, { useEffect, useState } from "react";
import ImageImporter from "@/plugin/ImageImporter";
import { FaTimes } from "react-icons/fa";
import Images from "next/image";

interface SwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenA: { symbol: string; logoURI: string; amount: bigint };
  tokenB: { symbol: string; logoURI: string; amount: bigint };
  rate: number | null;
  confirmSwap: () => void;
}

const SwapModal: React.FC<SwapModalProps> = ({
  isOpen,
  onClose,
  tokenA,
  tokenB,
  rate,
  confirmSwap,
}) => {
  const [loadingRate, setLoadingRate] = useState(true);

  useEffect(() => {
    if (rate !== null) {
      setLoadingRate(false);
    } else {
      setTimeout(() => setLoadingRate(false), 2000); // Simulated API delay
    }
  }, [rate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative p-6 text-white bg-gray-900 rounded-lg shadow-lg w-96">
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close Swap Modal"
          title="Close Swap Modal"
          className="absolute text-gray-400 top-3 right-4 hover:text-gray-200"
          onClick={onClose}
        >
          <FaTimes size={18} />
        </button>

        {/* Title */}
        <h2 className="mb-2 text-lg font-bold text-center">Confirm Swap</h2>
        <p className="mb-4 text-sm text-center text-gray-400">
          Kindly confirm this transaction
        </p>

        {/* Token Swap Section */}
        <div className="flex items-center justify-center mb-4 space-x-2">
          <Images
            src={tokenA.logoURI}
            alt={tokenA.symbol}
            className="w-10 h-10"
            width={40}
            height={40}
          />
          <span className="text-xl">⇄</span>
          <Images
            src={tokenB.logoURI}
            alt={tokenB.symbol}
            className="w-10 h-10"
            width={40}
            height={40}
          />
        </div>

        {/* Rate, Amounts, and Fees */}
        <div className="p-4 bg-gray-800 rounded-md">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Rate</span>
            <span>
              {loadingRate
                ? "⏳ Getting Rate..."
                : `1 ${tokenA.symbol} = ${rate} ${tokenB.symbol}`}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">From</span>
            <span>
              {(Number(tokenA.amount) / 1e18).toFixed(6)} {tokenA.symbol}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Fee</span>
            <span>$ 0.99</span>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          type="button"
          className="w-full py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={confirmSwap}
          disabled={loadingRate}
        >
          {loadingRate ? "Loading..." : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default SwapModal;
