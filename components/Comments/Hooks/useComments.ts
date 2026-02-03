import { useState, useEffect } from "react";

export const useComments = (comment: string, setComment: (v: string) => void) => {
  const [isCommentDisable, setIsCommentDisable] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setIsCommentDisable(!(comment?.length > 0));
  }, [comment]);

  const handleFocus = () => setIsFocused(true);
  const handleCancel = () => {
    setComment("");
    setIsFocused(false);
  };

  return {
    isCommentDisable,
    isFocused,
    setIsFocused,
    handleFocus,
    handleCancel,
  };
};
