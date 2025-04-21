import { useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import "./ConnectWalletButton.css";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const ConnectWalletButton = ({
  makePayment,
  onSuccess,
  totalEthPrice,
}: {
  makePayment: boolean;
  onSuccess: () => void;
  totalEthPrice: any;
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (totalPrice: number) => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask first.");
      return;
    }

    if(!makePayment){
      toast.error("All fields are required.");
      return;
    }
    try {
      setIsProcessing(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      const receiverAddress = "0x37d8a3D58f0D5054c42a966AA0E0fC058f9EC595";
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

      // toast.success("Booked successfully, Tx Hash: " + tx.hash);
      console.log("Booked successfully, Tx Hash: " + tx.hash)
    } catch (err: unknown) {
      console.error("Payment failed:", err);
      if (err instanceof Error) {
        toast.error("Payment failed");
        console.log(err.message)
      } else {
        toast.error("Payment failed: Unknown error");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="wallet-btn-wrapper">
      <button className="button-hovering-color"
        onClick={() => handlePayment(totalEthPrice)}
        disabled={isProcessing}
      >
        {" "}

        {isProcessing ? "Processing..." : "Book Now"}
      </button>
    </div>
  );
};

export default ConnectWalletButton;
