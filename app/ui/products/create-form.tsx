'use client';
import Link from "next/link";
import FormLabel from "./form-label";
import NumberInput from "./number-input";
import TextInput from "./text-input";
import Textarea from "./textarea";
import Button from "./button";
import { useActionState, useState } from "react";
import { createProduct, ProductState } from "@/app/lib/actions/product-actions";
import { ProductCategory } from "@/app/lib/definitions";
import Select from "./select";
import FieldErrorMessage from "./field-error-message";

export default function CreateForm({ categories }: { categories: ProductCategory[] }) {
    const initialState: ProductState = {
        message: null,
        errors: {},
        values: {}
    };
    const [state, formAction] = useActionState(createProduct, initialState);

    const [imgPreviewUrl, setImgPreviewUrl] = useState('')

    return (
        <form action={formAction} className="flex flex-col gap-5">
            <div className="flex flex-col-reverse gap-5 sm:grid grid-cols-2 gap-10">
                <div className="flex flex-col gap-3">
                    <FormLabel htmlFor="name">Image URL</FormLabel>
                    <div>
                        <TextInput id="imageUrl" defaultValue={state.values?.imageUrl} onChange={(e) => setImgPreviewUrl(e.target.value)} name="imageUrl" />
                        <FieldErrorMessage errorId="image-error" errors={state.errors?.imageUrl} />
                    </div>
                    {imgPreviewUrl ? (
                        <img
                            src={imgPreviewUrl}
                            alt="Preview"
                            className="rounded object-cover w-full"
                        />
                    ) : (
                        <div className="rounded w-full aspect-square bg-neutral-100 grid place-items-center text-sm text-neutral-500">
                            Image preview
                        </div>
                    )}

                </div>
                <div className="flex flex-col gap-5 md:flex-1">
                    <div className="flex flex-col gap-2">
                        <FormLabel htmlFor="name">Product Name</FormLabel>
                        <div>
                            <TextInput defaultValue={state.values?.name} id="name" name="name" />
                            <FieldErrorMessage errorId="name-error" errors={state.errors?.name} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <FormLabel htmlFor="shortDescription">Short Description</FormLabel>
                        <div>
                            <TextInput defaultValue={state.values?.shortDescription} id="shortDescription" name="shortDescription" />
                            <FieldErrorMessage errorId="shortdescription-error" errors={state.errors?.shortDescription} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <FormLabel htmlFor="longDescription">Long Description</FormLabel>
                        <div>
                            <Textarea defaultValue={state.values?.longDescription} id="longDescription" name="longDescription" />
                            <FieldErrorMessage errorId="longdescription-error" errors={state.errors?.longDescription} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <FormLabel htmlFor="price">Price</FormLabel>
                        <div>
                            <NumberInput defaultValue={state.values?.price} id="price" name="price" />
                            <FieldErrorMessage errorId="price-error" errors={state.errors?.price} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <FormLabel htmlFor="category">Categories</FormLabel>
                        <div>
                            <Select
                                id="category"
                                name="categoryId"
                                defaultValue=""
                                aria-describedby='customer-error'
                            >
                                <option value="" disabled>
                                    Select a category
                                </option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Select>
                            <FieldErrorMessage errorId="category-error" errors={state.errors?.categoryId} />
                        </div>
                    </div>
                    <FieldErrorMessage errorId="category-error" errors={state.message || ""} />
                </div>
            </div>
            <div className="flex gap-5 ms-auto">
                <Link className="rounded-lg px-4 py-1.5 text-sm cursor-pointer bg-gray-50 border border-gray-200 hover:bg-gray-100" href={`/products`}>Cancel</Link>
                <Button type="submit" className="primary">Add Product</Button>
            </div>
        </form>
    )
}
