'use server';
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import postgres from "postgres";
import z from "zod";
import bcrypt from 'bcrypt';
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

export async function authenticate(
    prevState: string | undefined,
    formData: FormData) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid Credentials';
                default:
                    return 'Something went wrong';
            }
        }
        throw error;
    }
}


export type RegisterState = {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
    },
    message?: string | null;
    values?: {
        name?: string;
        email?: string;
    };
}
const RegisterSchema = z.object({
    name: z.string().min(2, 'Username must be at least 4 characters long.'),
    email: z.email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
    confirmPassword: z.string('passwords must match')
})
    .refine((data) => data.password === data.confirmPassword, 'passwords do not match')

export async function registerUser(prevState: RegisterState, formData: FormData) {
    const validatedFields = RegisterSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    })
    console.log({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Register.',
            values: {
                name: formData.get('name')?.toString(),
                email: formData.get('email')?.toString(),
            }
        }
    }

    const { name, email, password } = validatedFields.data

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await sql`
            INSERT INTO users (name, email, password)
            VALUES (${name}, ${email}, ${hashedPassword})
        `
    } catch (error) {
        return {
            message: 'Database Error: Failed to Regisyter User.',
        };
    }

    redirect('/login');
}