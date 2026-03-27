'use client'
import { useState } from "react";
import {sendVerifyCodeAction} from "@/app/(main)/(auth)/sign-up/action";
import {useRouter} from "next/navigation";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async () => {
        if (!email.trim()) {
            setError("Please enter your email.");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const result = await sendVerifyCodeAction(email);

            if (!result.success) {
                setError(result.error ?? "Something went wrong");
            } else {
                alert("Verification code sent! Check your email.");
                router.push(`/sign-up/verify?email=${encodeURIComponent(email)}`);
            }
        } catch {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.blobTopLeft} />
            <div style={styles.blobBottomRight} />

            <div style={styles.card}>
                <div style={styles.header}>
                    <span style={styles.backArrow} onClick={() => router.back()}>←</span>
                    <span style={styles.title}>SIGN UP</span>
                </div>

                <div style={styles.infoBox}>
                    Please enter your email. Omnicart will send a verification code to your email.
                </div>

                <div style={styles.inputWrapper}>
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#bbb"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0 }}
                    >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M22 7l-10 7L2 7" />
                    </svg>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                        style={styles.input}
                    />
                </div>

                {error && <p style={styles.error}>{error}</p>}

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                        ...styles.button,
                        opacity: loading ? 0.7 : 1,
                        cursor: loading ? "not-allowed" : "pointer",
                    }}
                >
                    {loading ? "SENDING..." : "SEND VERIFICATION CODE"}
                </button>
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #fff5ee 0%, #ffe0c0 40%, #fff 70%)",
        fontFamily: "'Segoe UI', sans-serif",
        position: "relative" as const,
        overflow: "hidden",
    },
    blobTopLeft: {
        position: "fixed" as const,
        top: 0,
        left: 0,
        width: 300,
        height: 300,
        background: "radial-gradient(circle, rgba(255,160,80,0.35) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none" as const,
    },
    blobBottomRight: {
        position: "fixed" as const,
        bottom: 0,
        right: 0,
        width: 250,
        height: 250,
        background: "radial-gradient(circle, rgba(255,180,100,0.25) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none" as const,
    },
    card: {
        background: "#fff",
        borderRadius: 16,
        padding: "40px 48px 48px",
        width: "100%",
        maxWidth: 520,
        boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
        position: "relative" as const,
        zIndex: 1,
    },
    header: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 24,
    },
    backArrow: {
        fontSize: 22,
        color: "#e06000",
        fontWeight: 700,
        cursor: "pointer" as const,
    },
    title: {
        fontSize: 22,
        fontWeight: 800,
        color: "#e06000",
        letterSpacing: 1,
    },
    infoBox: {
        border: "1.5px solid #5c4ef5",
        borderRadius: 6,
        padding: "14px 16px",
        marginBottom: 28,
        color: "#222",
        fontSize: 15,
        lineHeight: 1.6,
    },
    inputWrapper: {
        display: "flex",
        alignItems: "center",
        borderBottom: "1.5px solid #ccc",
        marginBottom: 8,
        paddingBottom: 8,
        gap: 10,
    },
    input: {
        border: "none",
        outline: "none",
        fontSize: 15,
        color: "#333",
        width: "100%",
        background: "transparent",
    },
    error: {
        color: "#e03000",
        fontSize: 13,
        marginBottom: 20,
        marginTop: 4,
    },
    button: {
        width: "100%",
        background: "#e87722",
        color: "#fff",
        border: "none",
        borderRadius: 10,
        padding: "18px 0",
        fontSize: 16,
        fontWeight: 800,
        letterSpacing: 1.5,
        marginTop: 24,
        transition: "opacity 0.2s",
        cursor: "pointer" as const,
    },
};