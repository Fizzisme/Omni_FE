'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInAction } from '@/app/(main)/(auth)/sign-in/action'; // sửa path nếu khác

export default function SignInPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            setError('Please enter email and password');
            return;
        }

        setError('');
        setLoading(true);

        const res = await signInAction(email, password);

        if (!res.success) {
            setError(res.error || 'Login failed');
            setLoading(false);
            return;
        }

        router.push('/');
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.blobTopLeft} />
            <div style={styles.blobBottomRight} />

            <div style={styles.card}>
                <div style={styles.title}>SIGN IN</div>

                <div style={styles.welcome}>Welcome you back</div>
                <div style={styles.sub}>
                    {"Don't have an account? "}
                    <Link href="/sign-up" style={{ color: '#e06000' }}>
                        Sign up
                    </Link>
                </div>

                {/* EMAIL */}
                <div style={styles.inputWrapper}>
                    <input
                        type="text"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    />
                </div>

                {/* PASSWORD */}
                <div style={styles.inputWrapper}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    />

                </div>

                {error && <p style={styles.error}>{error}</p>}

                {/* Remember */}
                <div style={styles.remember}>
                    <input
                        type="checkbox"
                        checked={remember}
                        onChange={() => setRemember(!remember)}
                    />
                    <span>Remember me</span>
                </div>

                {/* BUTTON */}
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    style={{
                        ...styles.button,
                        opacity: loading ? 0.7 : 1,
                    }}
                >
                    {loading ? 'SIGNING IN...' : 'SIGN IN'}
                </button>
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #fff5ee 0%, #ffe0c0 40%, #fff 70%)',
    },
    blobTopLeft: {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, rgba(255,160,80,0.35) 0%, transparent 70%)',
        borderRadius: '50%',
    },
    blobBottomRight: {
        position: 'fixed' as const,
        bottom: 0,
        right: 0,
        width: 250,
        height: 250,
        background: 'radial-gradient(circle, rgba(255,180,100,0.25) 0%, transparent 70%)',
        borderRadius: '50%',
    },
    card: {
        background: '#fff',
        padding: 40,
        borderRadius: 16,
        width: 400,
        boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
    },
    title: {
        fontSize: 24,
        fontWeight: 800,
        color: '#e06000',
        marginBottom: 10,
    },
    welcome: {
        fontSize: 18,
        fontWeight: 600,
    },
    sub: {
        fontSize: 14,
        marginBottom: 20,
    },
    inputWrapper: {
        borderBottom: '1px solid #ccc',
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'space-between',
    },
    input: {
        border: 'none',
        outline: 'none',
        width: '100%',
        padding: 8,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    remember: {
        display: 'flex',
        gap: 8,
        marginBottom: 20,
    },
    button: {
        width: '100%',
        padding: 14,
        background: '#e87722',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        fontWeight: 700,
        cursor: 'pointer',
    },
};