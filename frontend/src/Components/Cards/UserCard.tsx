import { useDispatch } from "react-redux";
import type { UserInfo } from "../../Interfaces/interface";
import { setSelectedUser } from "../../Redux/selectedUserSlices";

const UserCard = ({ user }: { user: UserInfo }) => {
    const dispatch = useDispatch();
    return (
        <div className="flex w-full justify-between items-center cursor-pointer" onClick={() => dispatch(setSelectedUser(user._id))}>
            <div className="flex justify-center items-center gap-2">
                <img src={user.profilePicture} alt={user.name} className="w-16 h-16 rounded-full object-cover"/>
                <div>
                    <h2 className="font-black text-xl">{user.name}</h2>
                    <p>{user.bio}</p>
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <span className="text-gray-500 text-sm">{"2 min ago"}</span>
                <span className="text-sm rounded-full bg-red-500 text-white px-2 py-0.5 text-center">{"1"}</span>
            </div>
        </div>
    )
}

export default UserCard;