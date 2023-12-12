"use client";

interface AvatarProps {
  user: string | undefined | null;
}

const Avatar = ({ user }: AvatarProps) => {
  return (
    <div className="avatar online placeholder">
      <div className="w-12 h-12 rounded-full bg-neutral">
        <span className="text-3xl uppercase font-bold">{user}</span>
      </div>
    </div>
  );
};

export default Avatar;
