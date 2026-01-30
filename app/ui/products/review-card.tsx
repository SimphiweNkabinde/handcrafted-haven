import { StarIcon } from "@heroicons/react/16/solid";

export default function ReviewCard() {
    return (
        <div className="border rounded-lg border-gray-300 bg-gray-100 p-4 flex flex-col gap-3 text-gray-700">
            <div className="flex justify-between items-center">
                <p>
                    <span className="font-semibold">Username</span>
                    <span className="text-gray-300 mx-2">|</span>
                    <span className="text-gray-400">01 Sep 2024</span></p>
                <div className="flex items-center">
                    <StarIcon className="text-yellow-400 w-4" />3
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <p className="font-bold">Review Title</p>
                <p className="text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam aliquam tempore consequatur eligendi nemo,
                    molestias optio laudantium praesent.</p>
            </div>
        </div>
    )
}
