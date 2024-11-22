import { useState } from 'react';
import toast from 'react-hot-toast';

interface UseCopyToClipboardReturn {
  copied: boolean;
  copyToClipboard: (text: string) => Promise<void>;
}

export const useCopyToClipboard = (): UseCopyToClipboardReturn => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy");
      console.error('Failed to copy:', error);
    }
  };

  return { copied, copyToClipboard };
};
