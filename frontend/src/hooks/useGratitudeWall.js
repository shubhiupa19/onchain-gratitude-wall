import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { GRATITUDE_WALL_ABI } from "../abi/GratitudeWall";
import { CONTRACT_ADDRESS } from "../wagmiConfig";

const contractConfig = {
  address: CONTRACT_ADDRESS,
  abi: GRATITUDE_WALL_ABI,
};

export function useNotes() {
  return useReadContract({
    ...contractConfig,
    functionName: "getNotes",
    query: { refetchInterval: 5000 },
  });
}

export function usePostNote() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const postNote = (message) => {
    writeContract({
      ...contractConfig,
      functionName: "postNote",
      args: [message],
    });
  };

  return { postNote, isPending, isConfirming, isSuccess, error };
}

export function useTipNote(noteId) {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const tipNote = () => {
    writeContract({
      ...contractConfig,
      functionName: "tipNote",
      args: [BigInt(noteId)],
      value: parseEther("0.001"),
    });
  };

  return { tipNote, isPending, isConfirming, isSuccess, error };
}
