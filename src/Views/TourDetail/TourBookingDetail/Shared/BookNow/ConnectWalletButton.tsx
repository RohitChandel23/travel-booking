import { toast } from "react-toastify";
import "./ConnectWalletButton.css";
import { useWriteContract } from "wagmi";
import nftAbi from "../../../../../Shared/AppkitProvider/NFTAbi.json";
import { parseEther } from "viem";

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

  const handlePayment = async (totalPrice: number) => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask first.");
      return;
    }

    if (!hasDate && !hasTime && !hasTickets) {
      toast.error("Please select time and at least one ticket.");
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

    try {
      await writeContractAsync({
        address: contractAddress,
        abi: nftAbi,
        functionName: "mintNFT",
        args: [""], 
        value: parseEther(totalPrice.toString()), 
      });

      onSuccess();
      
    } catch (err: any) {
      console.error("Transaction error:", err.message);
      toast.error("Payment Failed");
    }
  };

  return (
    <div className="wallet-btn-wrapper">
      <button
        className="button-hovering-color"
        onClick={() => handlePayment(totalEthPrice)}
        disabled={isPending}
      >
        {isPending ? "Processing..." : "Book Now"}
      </button>
    </div>
  );
};

export default ConnectWalletButton;