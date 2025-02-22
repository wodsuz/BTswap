import React from "react";

interface TransactionCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  txHash: string | null;
}

const TransactionCompleteModal: React.FC<TransactionCompleteModalProps> = ({
  isOpen,
  onClose,
  txHash,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 text-center text-white bg-gray-900 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold text-green-400">
          ✅ Transaction Complete!
        </h2>
        <p className="mt-2 text-gray-300">
          Your swap transaction has been successfully processed.
        </p>
        {txHash && (
          <div className="mt-4">
            <a
              href={`https://basescan.org/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-500 hover:underline"
            >
              🔗 Track Transaction
            </a>
          </div>
        )}
        <button
          onClick={onClose}
          className="w-full py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TransactionCompleteModal;
