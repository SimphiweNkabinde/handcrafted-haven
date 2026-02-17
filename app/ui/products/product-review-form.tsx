'use client';

import { createReview, ReviewState } from "@/app/lib/actions/product-review-actions";
import { useActionState, useState } from "react";

export default function ProductReviewForm({ productId }: { productId: string }) {

    const [showForm, setShowForm] = useState(false)
    const initialState: ReviewState = {
        message: null,
        errors: {},
        values: {}
    };
    const [state, formAction] = useActionState(createReview, initialState);

    return (
        <div>
            {!showForm && <button onClick={() => setShowForm(true)} className="rounded-lg px-4 py-1.5 text-sm w-full cursor-pointer bg-gray-900 text-white hover:bg-gray-800">Review this product</button>}
            {
                showForm &&
                <form action={formAction} className="flex flex-col gap-4 border border-gray-200 px-3 py-5 rounded-lg">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="rating" className="text-sm">Rating</label>
                        <input type="range" id="rating" name="rating" className="accent-yellow-400" min={1} max={5} />
                        <div className="flex justify-between text-xs ">
                            <span className="">1</span>
                            <span className="">2</span>
                            <span className="">3</span>
                            <span className="">4</span>
                            <span className="">5</span>
                        </div>
                    </div>
                    <div>
                        <input id="title" name="title" defaultValue={state?.values?.title} className="block h-4 text-sm border border-slate-200 h-9 rounded-md text-sm py-2 px-2.5 w-full bg-slate-50" placeholder="review title" />
                        <p className="text-xs text-red-500 mt-1 ms-1">{state?.errors?.title}</p>
                    </div>
                    <div>
                        <textarea id="body" name="body" defaultValue={state?.values?.body || ""} className="block border text-sm border-slate-200 rounded-md text-sm py-2 px-2.5 w-full bg-slate-50" placeholder="review details" />
                        <p className="text-xs text-red-500 mt-1 ms-1">{state?.errors?.body}</p>
                    </div>
                    <input type="hidden" name="productId" defaultValue={productId} />

                    <p className="text-xs text-red-500 mt-1 ms-1">{state?.message}</p>
                    <div className="flex justify-between">
                        <button type="button"
                            onClick={() => setShowForm(false)}
                            className="rounded-lg text-xs px-4 py-1.5 text-sm cursor-pointer bg-gray-50 border border-gray-200 hover:bg-gray-100">Cancel</button>
                        <button type="submit" className="rounded-lg text-xs px-4 py-1.5 text-sm cursor-pointer bg-gray-900 text-white hover:bg-gray-800">Submit</button>
                    </div>
                </form>
            }
        </div>
    )
}
