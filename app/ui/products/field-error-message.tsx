export default function FieldErrorMessage({ errors, errorId }: { errors: string | string[] | undefined, errorId: string }) {
    return (
        <div id={errorId} aria-live="polite" aria-atomic="true">
            {errors &&
                <>
                    {typeof errors == 'string' ? (
                        <p className="mt-1 text-xs text-red-500" key={errors}>
                            {errors}
                        </p>
                    ) :
                        errors.map((error: string) => (
                            <p className="mt-1 text-xs text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                </>
            }
        </div>
    )
}
