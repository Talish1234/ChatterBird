type NotificationsCardProps = {
  userId: string;
  profilePicture: string;
  name: string;
  text: string;
};

const NotificationsCard = ({ userId, profilePicture, name, text }: NotificationsCardProps) => {
  return (
    <div className="flex items-center p-2">
      <img src={profilePicture} alt={name} className="w-10 h-10 rounded-full" />
      <div className="ml-2">
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-600">
          {text.length > 20 ? text.slice(0, 20) + "..." : text}
        </p>
      </div>
    </div>
  );
};

export default NotificationsCard;
