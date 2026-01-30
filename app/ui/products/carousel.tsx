import Image from "next/image";

export default function Carousel({ imageUrls }: { imageUrls: string[] }) {
  return (
    <div className="md:flex-1">
      <Image
        className="h-96 w-96 object-cover rounded"
        src={imageUrls[0]}
        width={100}
        height={300}
        alt="product image" />
      <div className="flex gap-4 mt-4">
        {imageUrls.map((image, index) => (
          <Image
            key={index}
            className="h-20 w-20 object-cover rounded"
            src={image}
            width={50}
            height={50}
            alt="product image" />
        ))}
      </div>
    </div>
  )
}
