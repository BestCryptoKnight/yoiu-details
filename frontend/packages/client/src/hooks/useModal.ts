import { useCallback, useState } from 'react';

export const useModal = (): [boolean, () => void] => {
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return [isOpen, onToggle];
};
