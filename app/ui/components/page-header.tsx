export default function PageHeader({ heading, intro }: { heading: string, intro?: string }) {
    return (
        <div className="mb-10">
            <h1 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">
                {heading}
            </h1>
            <p className="mt-3 text-neutral-600">
                {intro}
            </p>
        </div>
    )
}
