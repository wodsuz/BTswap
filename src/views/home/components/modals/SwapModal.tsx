import React, { useEffect, useState } from "react";
import { FaTimes, FaInfoCircle } from "react-icons/fa";
import Image from "next/image";

interface SwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenA: { symbol: string; logoURI: string; amount: bigint };
  tokenB: { symbol: string; logoURI: string; amount: bigint };
  rate: number | null;
  slippage: number;
  confirmSwap: () => void;
}

const SwapModal: React.FC<SwapModalProps> = ({
  isOpen,
  onClose,
  tokenA,
  tokenB,
  rate,
  slippage,
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

  const expectedOutput = Number(tokenB.amount) / 1e18;
  const minReceived = expectedOutput * (1 - slippage / 100);
  const priceImpact = "0%"; // Simulated price impact
  const networkFee = "$2.72"; // Simulated fee
  const exchangeFee = "Free";

  return (
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
              <span className="text-sm text-gray-400">$0.00</span>
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
              <span className="text-sm text-gray-400">$0.00</span>
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

        {/* Exchange Rate */}
        <div className="mb-4 text-sm text-center text-gray-400">
          {loadingRate
            ? "⏳ Getting Rate..."
            : `1 ${tokenA.symbol} = ${rate} ${tokenB.symbol}`}
        </div>

        {/* Swap Details */}
        <div className="p-4 bg-gray-800 rounded-md">
          <div className="flex justify-between mb-2">
            <span className="relative flex items-center text-gray-400 group">
              Expected Output
              <FaInfoCircle className="ml-1 text-xs cursor-pointer" />
              <span className="absolute left-0 hidden p-2 text-xs text-white bg-gray-700 rounded shadow-lg bottom-6 group-hover:block">
                The estimated amount of {tokenB.symbol} you will receive.
              </span>
            </span>
            <span>
              {expectedOutput.toFixed(6)} {tokenB.symbol}
            </span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="relative flex items-center text-gray-400 group">
              Price Impact
              <FaInfoCircle className="ml-1 text-xs cursor-pointer" />
              <span className="absolute left-0 hidden p-2 text-xs text-white bg-gray-700 rounded shadow-lg bottom-6 group-hover:block">
                The difference between the market price and your trade price.
              </span>
            </span>
            <span className="text-green-400">{priceImpact}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="relative flex items-center text-gray-400 group">
              Minimum received after slippage ({slippage}%)
              <FaInfoCircle className="ml-1 text-xs cursor-pointer" />
              <span className="absolute left-0 hidden p-2 text-xs text-white bg-gray-700 rounded shadow-lg bottom-6 group-hover:block">
                The minimum amount you will receive after price fluctuations.
              </span>
            </span>
            <span>
              {minReceived.toFixed(6)} {tokenB.symbol}
            </span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="relative flex items-center text-gray-400 group">
              Network Fee
              <FaInfoCircle className="ml-1 text-xs cursor-pointer" />
              <span className="absolute left-0 hidden p-2 text-xs text-white bg-gray-700 rounded shadow-lg bottom-6 group-hover:block">
                The estimated transaction fee for processing this swap.
              </span>
            </span>
            <span>{networkFee}</span>
          </div>

          <div className="flex justify-between">
            <span className="relative flex items-center text-gray-400 group">
              Exchange Fee
              <FaInfoCircle className="ml-1 text-xs cursor-pointer" />
              <span className="absolute left-0 hidden p-2 text-xs text-white bg-gray-700 rounded shadow-lg bottom-6 group-hover:block">
                The fee charged by the exchange for this swap.
              </span>
            </span>
            <span className="text-green-400">{exchangeFee}</span>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          className="w-full py-3 mt-4 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={confirmSwap}
          disabled={loadingRate}
          aria-label="Confirm swap transaction"
          title="Confirm Swap"
        >
          {loadingRate ? "Loading..." : "Confirm Swap"}
        </button>
      </div>
    </div>
  );
};

export default SwapModal;
