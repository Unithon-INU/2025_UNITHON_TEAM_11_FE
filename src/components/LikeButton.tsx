'use client';

import React from 'react';
import { FiHeart } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';

type LikeButtonProps = {
  liked: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const LikeButton = ({ liked, onClick }: LikeButtonProps) => {
  return (
    <button onClick={onClick} className="absolute bottom-2 right-2">
      {liked ? (
        <AiFillHeart className="text-green-500 text-xl" />
      ) : (
        <FiHeart className="text-gray-400 text-xl" />
      )}
    </button>
  );
};

export default LikeButton;
