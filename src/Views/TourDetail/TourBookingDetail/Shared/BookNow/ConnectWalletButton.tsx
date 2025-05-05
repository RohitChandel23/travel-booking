// import { toast } from "react-toastify";
// import "./ConnectWalletButton.css";
// import { useWriteContract } from "wagmi";
// import nftAbi from "../../../../AppkitProvider/NFTAbi.json";
// import { parseEther } from "viem";

// const contractAddress = "0xE32383aB1dbea75Fa416CB7cA200b0e1c89735AC";

// const ConnectWalletButton = ({
//   makePayment,
//   onSuccess,
//   totalEthPrice,
// }: {
//   makePayment: boolean;
//   onSuccess: () => void;
//   totalEthPrice: any;
// }) => {
//   const { writeContractAsync, isPending } = useWriteContract();

//   const handlePayment = async (totalPrice: number) => {
//     if (!window.ethereum) {
//       toast.error("Please install MetaMask first.");
//       return;
//     }

//     if (!makePayment) {
//       toast.error("All fields are required.");
//       return;
//     }

//     try {

//        await writeContractAsync({
//         address: contractAddress,
//         abi: nftAbi,
//         functionName: "mintNFT",
//         args: [""], 
//         value: parseEther(totalPrice.toString()), 
//       });

//       // toast.success("Booking successful! Transaction submitted.");
//       onSuccess();
      
//     } catch (err: any) {
//       console.log("checking........",err.message);
//       toast.error("Payment Failed");
//       // alert(err.message)
//           // toast.error("Error during transaction: " + (err.message.slice(0,26)) + "...");
//     }
//   };

//   return (
//     <div className="wallet-btn-wrapper">
//       <button
//         className="button-hovering-color"
//         onClick={() => handlePayment(totalEthPrice)}
//         disabled={isPending}
//       >
//         {isPending ? "Processing..." : "Book Now"}
//       </button>
//     </div>
//   );
// };

// export default ConnectWalletButton;






import { toast } from "react-toastify";
import "./ConnectWalletButton.css";
import { useWriteContract } from "wagmi";
import nftAbi from "../../../../AppkitProvider/NFTAbi.json";
import { parseEther } from "viem";

const contractAddress = "0xE32383aB1dbea75Fa416CB7cA200b0e1c89735AC";

interface ConnectWalletButtonProps {
  onSuccess: () => void;
  totalEthPrice: number;
  hasDate: boolean;
  hasTime: boolean;
  hasTickets: boolean;
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
      toast.error("Please select date, time and at least one ticket.");
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