import { useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import "./ConnectWalletButton.css";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const ConnectWalletButton = ({ onSuccess, totalEthPrice}: { onSuccess: () => void; totalEthPrice:any }  ) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (totalPrice: number) => {
    if (!window.ethereum) {
      alert("Please install MetaMask first.");
      return;
    }

    try {
      setIsProcessing(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const receiverAddress = "0x1D7e62a808fC888764cfB26D3FD58A0A81DC4886";
      const amount = ethers.parseEther(totalPrice.toString());  

      const balance = await provider.getBalance(await signer.getAddress());
      if (balance < amount) {
        throw new Error("Insufficient funds for the payment + gas");
      }
      const tx = await signer.sendTransaction({
        to: receiverAddress,
        value: amount,
      });

      onSuccess();

      toast.success("Booked successfully, Tx Hash: " + tx.hash);
    } catch (err: unknown) {
      console.error("Payment failed:", err);
      if (err instanceof Error) {
        toast.error("Payment failed: " + err.message);
      } else {
        toast.error("Payment failed: Unknown error");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="wallet-btn-wrapper">
      <button onClick={() => handlePayment(totalEthPrice)} disabled={isProcessing}>    {/* requires price*/}
        {isProcessing ? "Processing..." : "Book Now"}
      </button>
    </div>
  );
};

export default ConnectWalletButton;
