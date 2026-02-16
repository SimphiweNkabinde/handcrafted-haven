import { StarIcon } from "@heroicons/react/16/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import moment from "moment";

type Props = {
    username: string,
    title: string,
    body: string,
    rating: number,
    createdAt: any
}
export default function ProductReviewCard({ username, title, body, rating, createdAt }: Props) {

    return (
        <div className="flex flex-col gap-2 border border-gray-200 rounded py-2 px-3 bg-slate-50">
            <div className="flex justify-between">
                <p className="text-sm capitalize">{username}</p>
                <div className="flex gap-1">
                    {Array(rating).fill(1).map((item, index) => <StarIcon key={index} className="w-4 text-yellow-500" />)}
                    {Array(5 - rating).fill(1).map((item, index) => <StarIconOutline key={index} className="w-4 text-yellow-500" />)}
                </div>
            </div>
            <p className="font-semibold">{title}</p>
            <p className="text-gray-500 text-xs">{body}</p>
            <p className="text-xs text-gray-500">{moment(createdAt).fromNow()}</p>
        </div>
    )
}
