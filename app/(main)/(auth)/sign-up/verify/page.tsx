// 'use client'
// import { useState, useRef, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import {verifyCodeAction} from "@/app/(main)/(auth)/sign-up/action";
//
// export default function VerifyPage() {
//     const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [resendCooldown, setResendCooldown] = useState(60);
//     const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const email = searchParams.get("email") || "";
//
//     // Đếm ngược resend
//     useEffect(() => {
//         if (resendCooldown <= 0) return;
//         const timer = setTimeout(() => setResendCooldown(prev => prev - 1), 1000);
//         return () => clearTimeout(timer);
//     }, [resendCooldown]);
//
//     const handleChange = (index: number, value: string) => {
//         if (!/^\d*$/.test(value)) return; // chỉ nhận số
//         const newOtp = [...otp];
//         newOtp[index] = value.slice(-1); // chỉ lấy 1 ký tự
//         setOtp(newOtp);
//         if (value && index < 5) {
//             inputRefs.current[index + 1]?.focus();
//         }
//     };
//
//     const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
//         if (e.key === "Backspace" && !otp[index] && index > 0) {
//             inputRefs.current[index - 1]?.focus();
//         }
//     };
//
//     const handlePaste = (e: React.ClipboardEvent) => {
//         e.preventDefault();
//         const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
//         const newOtp = [...otp];
//         pasted.split("").forEach((char, i) => { newOtp[i] = char; });
//         setOtp(newOtp);
//         inputRefs.current[Math.min(pasted.length, 5)]?.focus();
//     };
//
//     const handleSubmit = async () => {
//         const code = otp.join("");
//         if (code.length < 6) {
//             setError("Please enter the full 6-digit code.");
//             return;
//         }
//         setError("");
//         setLoading(true);
//         try {
//             const result = await verifyCodeAction(code);
//             if (!result.success) { setError(result.error); return; }
//             router.push("/sign-up/info");
//         } catch {
//             setError("Something went wrong.");
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const handleResend = async () => {
//         if (resendCooldown > 0) return;
//         setResendCooldown(60);
//         // TODO: gọi lại sendVerifyCodeAction(email)
//     };
//
//     return (
//         <div style={styles.wrapper}>
//             <div style={styles.blobTopLeft} />
//             <div style={styles.blobBottomRight} />
//
//             <div style={styles.card}>
//                 {/* Header */}
//                 <div style={styles.header}>
//                     <span style={styles.backArrow} onClick={() => router.back()}>←</span>
//                     <span style={styles.title}>VERIFY EMAIL</span>
//                 </div>
//
//                 {/* Info */}
//                 <div style={styles.infoBox}>
//                     We sent a 6-digit verification code to <br />
//                     <strong>{email}</strong>
//                 </div>
//
//                 {/* OTP inputs */}
//                 <div style={styles.otpRow} onPaste={handlePaste}>
//                     {otp.map((digit, i) => (
//                         <input
//                             key={i}
//                             ref={el => { inputRefs.current[i] = el; }}
//                             type="text"
//                             inputMode="numeric"
//                             maxLength={1}
//                             value={digit}
//                             onChange={e => handleChange(i, e.target.value)}
//                             onKeyDown={e => handleKeyDown(i, e)}
//                             style={{
//                                 ...styles.otpInput,
//                                 borderColor: digit ? "#e87722" : "#ddd",
//                                 background: digit ? "#fff8f3" : "#fff",
//                             }}
//                         />
//                     ))}
//                 </div>
//
//                 {/* Error */}
//                 {error && <p style={styles.error}>{error}</p>}
//
//                 {/* Submit button */}
//                 <button
//                     onClick={handleSubmit}
//                     disabled={loading}
//                     style={{
//                         ...styles.button,
//                         opacity: loading ? 0.7 : 1,
//                         cursor: loading ? "not-allowed" : "pointer",
//                     }}
//                 >
//                     {loading ? "VERIFYING..." : "VERIFY"}
//                 </button>
//
//                 {/* Resend */}
//                 <p style={styles.resendText}>
//                     Didn&apos;t receive the code?{" "}
//                     <span
//                         onClick={handleResend}
//                         style={{
//                             ...styles.resendLink,
//                             color: resendCooldown > 0 ? "#bbb" : "#e87722",
//                             cursor: resendCooldown > 0 ? "not-allowed" : "pointer",
//                         }}
//                     >
//                         {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend"}
//                     </span>
//                 </p>
//             </div>
//         </div>
//     );
// }
//
// const styles = {
//     wrapper: {
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "linear-gradient(135deg, #fff5ee 0%, #ffe0c0 40%, #fff 70%)",
//         fontFamily: "'Segoe UI', sans-serif",
//         position: "relative" as const,
//         overflow: "hidden",
//     },
//     blobTopLeft: {
//         position: "fixed" as const,
//         top: 0, left: 0,
//         width: 300, height: 300,
//         background: "radial-gradient(circle, rgba(255,160,80,0.35) 0%, transparent 70%)",
//         borderRadius: "50%",
//         pointerEvents: "none" as const,
//     },
//     blobBottomRight: {
//         position: "fixed" as const,
//         bottom: 0, right: 0,
//         width: 250, height: 250,
//         background: "radial-gradient(circle, rgba(255,180,100,0.25) 0%, transparent 70%)",
//         borderRadius: "50%",
//         pointerEvents: "none" as const,
//     },
//     card: {
//         background: "#fff",
//         borderRadius: 16,
//         padding: "40px 48px 48px",
//         width: "100%",
//         maxWidth: 520,
//         boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
//         position: "relative" as const,
//         zIndex: 1,
//     },
//     header: {
//         display: "flex",
//         alignItems: "center",
//         gap: 10,
//         marginBottom: 24,
//     },
//     backArrow: {
//         fontSize: 22,
//         color: "#e06000",
//         fontWeight: 700,
//         cursor: "pointer" as const,
//     },
//     title: {
//         fontSize: 22,
//         fontWeight: 800,
//         color: "#e06000",
//         letterSpacing: 1,
//     },
//     infoBox: {
//         border: "1.5px solid #5c4ef5",
//         borderRadius: 6,
//         padding: "14px 16px",
//         marginBottom: 32,
//         color: "#222",
//         fontSize: 15,
//         lineHeight: 1.6,
//     },
//     otpRow: {
//         display: "flex",
//         gap: 12,
//         justifyContent: "center",
//         marginBottom: 8,
//     },
//     otpInput: {
//         width: 52,
//         height: 60,
//         textAlign: "center" as const,
//         fontSize: 24,
//         fontWeight: 700,
//         border: "2px solid #ddd",
//         borderRadius: 10,
//         outline: "none",
//         transition: "border-color 0.2s, background 0.2s",
//         color: "#e06000",
//     },
//     error: {
//         color: "#e03000",
//         fontSize: 13,
//         textAlign: "center" as const,
//         marginTop: 8,
//         marginBottom: 0,
//     },
//     button: {
//         width: "100%",
//         background: "#e87722",
//         color: "#fff",
//         border: "none",
//         borderRadius: 10,
//         padding: "18px 0",
//         fontSize: 16,
//         fontWeight: 800,
//         letterSpacing: 1.5,
//         marginTop: 24,
//         transition: "opacity 0.2s",
//         cursor: "pointer" as const,
//     },
//     resendText: {
//         textAlign: "center" as const,
//         marginTop: 20,
//         fontSize: 14,
//         color: "#666",
//     },
//     resendLink: {
//         fontWeight: 700,
//         textDecoration: "underline",
//     },
// };

export default function VerifyPage() {
  return (
    <div>
      Hi
    </div>
  );
};