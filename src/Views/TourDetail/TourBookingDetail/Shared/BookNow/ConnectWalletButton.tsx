import { toast } from "react-toastify";
import "./ConnectWalletButton.css";
import { useWriteContract } from "wagmi";
import nftAbi from "../../../../AppkitProvider/NFTAbi.json";
import { parseEther } from "viem";

const contractAddress = "0xE32383aB1dbea75Fa416CB7cA200b0e1c89735AC";

const ConnectWalletButton = ({
  makePayment,
  onSuccess,
  totalEthPrice,
}: {
  makePayment: boolean;
  onSuccess: () => void;
  totalEthPrice: any;
}) => {
  const { writeContractAsync, isPending } = useWriteContract();

  const handlePayment = async (totalPrice: number) => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask first.");
      return;
    }

    if (!makePayment) {
      toast.error("All fields are required.");
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

      // toast.success("Booking successful! Transaction submitted.");
      onSuccess();
      
    } catch (err: any) {
      console.log("checking........",err.message);
      // alert(err.message)
          toast.error("Error during transaction: " + (err.message.slice(0,26)) + "...");
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