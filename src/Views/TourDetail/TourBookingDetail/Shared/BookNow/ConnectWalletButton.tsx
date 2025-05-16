import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./ConnectWalletButton.css";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import nftAbi from "../../../../../Shared/AppkitProvider/NFTAbi.json";
import { parseEther } from "viem";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONFIG } from "../../../../../Shared/Constants";

const contractAddress = "0xE32383aB1dbea75Fa416CB7cA200b0e1c89735AC";

interface ConnectWalletButtonProps {
  readonly onSuccess: () => void;
  readonly totalEthPrice: number;
  readonly hasDate: boolean;
  readonly hasTime: boolean;
  readonly hasTickets: boolean;
}

const ConnectWalletButton = ({
  onSuccess,
  totalEthPrice,
  hasDate,
  hasTime,
  hasTickets,
}: ConnectWalletButtonProps) => {
  const { writeContractAsync, isPending } = useWriteContract();
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [statusText, setStatusText] = useState<"pending" | "success" | "failed" | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  
  const navigate = useNavigate();

  const {
    data: receipt,
    isSuccess: isReceiptSuccess,
    isLoading: isReceiptLoading,
    isError: isReceiptError,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash: txHash as `0x${string}`,
    confirmations: 1, 
    enabled: !!txHash,
  });

  useEffect(() => {
    if (txHash) {
      console.log("Transaction submitted:", txHash);
      setStatusText("pending");
      setShowModal(true);
    }
  }, [txHash]);

  useEffect(() => {
    if (isReceiptSuccess && receipt) {
      console.log("Transaction receipt:", receipt);
      
      if (receipt.status === "success") {
        console.log("Transaction confirmed successful");
        setStatusText("success");
        setPaymentCompleted(true);
        // Do NOT call onSuccess directly here. It will be called 
        // when the user confirms in the modal
      } else {
        console.log("Transaction failed on-chain");
        setStatusText("failed");
      }
    } else if (isReceiptError) {
      console.error("Receipt error:", receiptError);
      setStatusText("failed");
    }
  }, [receipt, isReceiptSuccess, isReceiptError, receiptError]);

  const handlePayment = async (totalPrice: number) => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask first.");
      return;
    }

    if (!hasDate) {
      toast.error("Please select a date.");
      return;
    }

    if (!hasTime) {
      toast.error("Please select a time.");
      return;
    }

    if (!hasTickets) {
      toast.error("Please select at least one ticket.");
      return;
    }

    // Reset states for new transaction
    setTxHash(null);
    setStatusText(null);
    setPaymentCompleted(false);

    try {
      const hash = await writeContractAsync({
        address: contractAddress,
        abi: nftAbi,
        functionName: "mintNFT",
        args: [""],
        value: parseEther(totalPrice.toString()),
      });

      setTxHash(hash); // Track transaction
    } catch (err: any) {
      console.error("Transaction error:", err);
      toast.error("Payment Failed: " + (err.message || "Unknown error"));
    }
  };

  const completeBooking = () => {
    if (paymentCompleted) {
      onSuccess();
      setShowModal(false);
      navigate(ROUTES_CONFIG.BOOKED_TOURS.path);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    // If we're closing without completing the process, reset payment state
    if (statusText === "success" && paymentCompleted) {
      setPaymentCompleted(false);
    }
  };

  const renderStatusMessage = () => {
    switch (statusText) {
      case "pending":
        return (
          <div className="tx-status">
            <p>⏳ Transaction is pending...</p>
          </div>
        );
      case "success":
        return (
          <div className="tx-status">
            <p>✅ Transaction successful!</p>
            <p className="tx-details">Ready to complete your booking.</p>
            {txHash && (
              <p className="tx-hash">Transaction hash: {txHash.substring(0, 10)}...{txHash.substring(txHash.length - 8)}</p>
            )}
          </div>
        );
      case "failed":
        return (
          <div className="tx-status">
            <p>❌ Transaction failed.</p>
            <p className="tx-details">There was an issue with your transaction.</p>
            {txHash && (
              <p className="tx-hash">Transaction hash: {txHash.substring(0, 10)}...{txHash.substring(txHash.length - 8)}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="wallet-btn-wrapper">
        <button
          className="button-hovering-color"
          onClick={() => handlePayment(totalEthPrice)}
          disabled={isPending || isReceiptLoading || statusText === "pending"}
        >
          {isPending || (statusText === "pending" && isReceiptLoading) ? "Processing..." : "Book Now"}
        </button>
      </div>

      {showModal && (
        <div className="tx-modal-backdrop">
          <div className="tx-modal-content">
            <h2>Transaction Status</h2>
            {renderStatusMessage()}

            {statusText === "success" && (
              <div className="tx-modal-buttons">
                <button onClick={completeBooking}>Complete Booking</button>
                <button onClick={closeModal}>Cancel</button>
              </div>
            )}

            {(statusText === "failed") && (
              <div className="tx-modal-buttons">
                <button onClick={closeModal}>Close</button>
                <button onClick={() => navigate(ROUTES_CONFIG.TOURS.path)}>Explore Tours</button>
              </div>
            )}
            
            {(statusText === "pending") && (
              <div className="tx-modal-buttons">
                <button onClick={closeModal}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ConnectWalletButton;