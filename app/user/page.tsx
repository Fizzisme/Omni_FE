// app/user/page.tsx
import { redirect } from 'next/navigation';

export default function UserPage() {
    redirect('/user/info');
}