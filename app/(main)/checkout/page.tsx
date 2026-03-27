"use client";

import {CSSProperties, useEffect, useState} from "react";
import {createOrder} from "@/app/(main)/checkout/action";
import { useRouter } from "next/navigation";

const s: Record<string, CSSProperties> = {
  page: {
    fontFamily: "'Jost', 'Segoe UI', sans-serif",
    background: "#f7f4ef",
    minHeight: "100vh",
    padding: "2rem 1rem 4rem",
    color: "#1c1a17",
  },
  layout: {
    maxWidth: "860px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 290px",
    gap: "2.5rem",
    alignItems: "start",
  },
  heading: {
    fontFamily: "'Georgia', serif",
    fontSize: "1.4rem",
    fontWeight: 700,
    color: "#d95f02",
    letterSpacing: ".08em",
    textTransform: "uppercase",
    marginBottom: "1.2rem",
  },
  section: {
    marginBottom: "2.4rem",
  },
  fields: {
    display: "flex",
    flexDirection: "column",
    gap: ".7rem",
  },
  input: {
    width: "100%",
    padding: ".75rem 1rem",
    border: "1.5px solid #e0d9d0",
    borderRadius: "7px",
    background: "#ffffff",
    fontFamily: "inherit",
    fontSize: ".875rem",
    color: "#1c1a17",
    outline: "none",
    boxSizing: "border-box",
  },
  inputFocused: {
    width: "100%",
    padding: ".75rem 1rem",
    border: "1.5px solid #d95f02",
    borderRadius: "7px",
    background: "#ffffff",
    fontFamily: "inherit",
    fontSize: ".875rem",
    color: "#1c1a17",
    outline: "none",
    boxSizing: "border-box",
    boxShadow: "0 0 0 3px rgba(217,95,2,.12)",
  },
  hint: {
    fontSize: ".7rem",
    color: "#8a8278",
    marginTop: ".28rem",
    paddingLeft: ".15rem",
    fontStyle: "italic",
  },
  checkRow: {
    display: "flex",
    alignItems: "center",
    gap: ".55rem",
    fontSize: ".82rem",
    color: "#8a8278",
    cursor: "pointer",
    marginTop: ".2rem",
  },
  methodBtn: {
    padding: ".7rem 1rem",
    border: "1.5px solid #e0d9d0",
    borderRadius: "7px",
    background: "#ffffff",
    fontFamily: "inherit",
    fontSize: ".875rem",
    color: "#1c1a17",
    textAlign: "left",
    cursor: "pointer",
    width: "100%",
    marginBottom: ".5rem",
  },
  methodBtnActive: {
    padding: ".7rem 1rem",
    border: "1.5px solid #d95f02",
    borderRadius: "7px",
    background: "#f5e6da",
    fontFamily: "inherit",
    fontSize: ".875rem",
    color: "#1c1a17",
    textAlign: "left",
    cursor: "pointer",
    width: "100%",
    marginBottom: ".5rem",
    fontWeight: 500,
  },
  cardStripe: {
    height: "48px",
    border: "1.5px dashed #e0d9d0",
    borderRadius: "7px",
    background:
        "repeating-linear-gradient(-45deg,#f7f2ec,#f7f2ec 5px,#eee7de 5px,#eee7de 10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: ".85rem",
  },
  cardStripeText: {
    fontSize: ".7rem",
    color: "#c0b8ae",
    letterSpacing: ".06em",
  },
  payHint: {
    fontSize: ".8rem",
    color: "#8a8278",
    marginBottom: ".6rem",
  },
  row2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: ".7rem",
  },
  termsLine: {
    fontSize: ".7rem",
    color: "#8a8278",
    marginTop: ".75rem",
    lineHeight: 1.5,
  },
  termsLink: {
    color: "#d95f02",
    textDecoration: "none",
  },
  placeBtn: {
    width: "100%",
    marginTop: "1rem",
    padding: ".9rem",
    background: "#d95f02",
    color: "#fff",
    border: "none",
    borderRadius: "7px",
    fontFamily: "inherit",
    fontSize: ".95rem",
    fontWeight: 500,
    letterSpacing: ".06em",
    textTransform: "uppercase",
    cursor: "pointer",
  },
  summary: {
    background: "#ffffff",
    border: "1.5px solid #e0d9d0",
    borderRadius: "10px",
    padding: "1.4rem",
    position: "sticky",
    top: "1.5rem",
  },
  summaryTitle: {
    fontFamily: "'Georgia', serif",
    fontSize: "1.1rem",
    fontWeight: 700,
    textAlign: "center",
    letterSpacing: ".08em",
    textTransform: "uppercase",
    paddingBottom: ".9rem",
    borderBottom: "1.5px solid #e0d9d0",
    marginBottom: "1rem",
  },
  sRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: ".86rem",
    color: "#8a8278",
    marginBottom: ".55rem",
  },
  sRowTotal: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: 500,
    color: "#1c1a17",
    fontSize: ".95rem",
    paddingTop: ".75rem",
    borderTop: "1.5px solid #e0d9d0",
    marginTop: ".3rem",
    marginBottom: ".55rem",
  },
  arrives: {
    fontSize: ".76rem",
    color: "#8a8278",
    margin: ".9rem 0",
    fontStyle: "italic",
  },
  productCard: {
    display: "flex",
    gap: ".8rem",
    alignItems: "center",
    background: "#f7f4ef",
    border: "1px solid #e0d9d0",
    borderRadius: "8px",
    padding: ".7rem",
  },
  productThumb: {
    width: "58px",
    height: "66px",
    flexShrink: 0,
    borderRadius: "5px",
    background: "#ede5d6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.7rem",
  },
  productInfo: {
    fontSize: ".82rem",
    color: "#8a8278",
  },
  productName: {
    display: "block",
    color: "#1c1a17",
    fontSize: ".87rem",
    marginBottom: ".18rem",
    fontWeight: 500,
  },
};


interface FieldProps {
  placeholder: string;
  type?: string;
  hint?: string;
  maxLength?: number;
}

function Field({
                 placeholder,
                 type = "text",
                 hint,
                 maxLength,
                 value,
                 onChange,
               }: FieldProps & { value: string; onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false);

  return (
      <div>
        <input
            type={type}
            placeholder={placeholder}
            maxLength={maxLength}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={focused ? s.inputFocused : s.input}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
        />
        {hint && <p style={s.hint}>{hint}</p>}
      </div>
  );
}


const PAYMENT_METHODS = ["Credit Card", "Debit Card", "Bank Transfer", "Pay Pal"] as const;

export default function CheckOutPage() {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    age: "",
    address: "",
    phone: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [payMethod, setPayMethod] = useState<string>("Credit Card");
  const isCard = payMethod === "Credit Card" || payMethod === "Debit Card";
  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };
  const router = useRouter();

  const checkout = JSON.parse(localStorage.getItem("checkout") || "null");


  useEffect(() => {
    fetch('http://localhost:8017/v1/users/me', {
      credentials: 'include',
    })
        .then(res => {
          if (!res.ok) return null; // chưa login
          return res.json();
        })
        .then(data => {
          if (!data?.data) return;

          const u = data.data;

          // 🔥 auto fill form
          setForm(prev => ({
            ...prev,
            email: u.email || '',
            firstName: u.firstName || '',
            lastName: u.lastName || '',
            age: u.age || '',
            address: u.address || '',
            phone: u.phoneNumber || '',
          }));
        })
        .catch(() => {
          // không login → bỏ qua
        });
  }, []);

  const handlePlaceOrder = async () => {
    const checkout = JSON.parse(localStorage.getItem("checkout") || "null");

    if (!checkout) {
      alert("No checkout data");
      return;
    }

    const payload = {
      customer: {
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        age: form.age,
        address: form.address,
        phone: form.phone,
      },
      payment: {
        method: payMethod,
        ...(isCard && {
          cardName: form.cardName,
          cardNumber: form.cardNumber,
          expiry: form.expiry,
          cvv: form.cvv,
        }),
      },
      items: checkout.cart,
      total: checkout.total,
    };

    try {
      await createOrder(payload);

      alert("Order success 🎉");

      localStorage.removeItem("cart");
      localStorage.removeItem("checkout");

      router.push("/success");
    } catch (e) {
      console.error("ERROR:", e);
      alert("Order failed ❌");
    }
  };
  return (
      <div style={s.page}>
        <div style={s.layout}>

          {/* ── LEFT ── */}
          <div>

            {/* DELIVERY */}
            <section style={s.section}>
              <div style={s.heading}>Delivery</div>
              <div style={s.fields}>
                <Field
                    type="email"
                    placeholder="Email *"
                    value={form.email}
                    onChange={(v) => updateField("email", v)}
                />

                <Field
                    placeholder="First Name *"
                    value={form.firstName}
                    onChange={(v) => updateField("firstName", v)}
                />

                <Field
                    placeholder="Last Name *"
                    value={form.lastName}
                    onChange={(v) => updateField("lastName", v)}
                />

                <Field
                    placeholder="Age *"
                    value={form.age}
                    onChange={(v) => updateField("age", v)}
                />

                <Field
                    placeholder="Address *"
                    value={form.address}
                    onChange={(v) => updateField("address", v)}
                />

                <Field
                    type="tel"
                    placeholder="Phone Number *"
                    value={form.phone}
                    onChange={(v) => updateField("phone", v)}
                />
                <label style={s.checkRow}>
                  <input
                      type="checkbox"
                      defaultChecked
                      style={{ accentColor: "#d95f02", width: "14px", height: "14px", cursor: "pointer" }}
                  />
                  Billing matches shipping address
                </label>
              </div>
            </section>

            {/* PAYMENT */}
            <section style={s.section}>
              <div style={s.heading}>Payment</div>

              {/* Select method */}
              <div>
                {PAYMENT_METHODS.map((m) => (
                    <button
                        key={m}
                        type="button"
                        style={payMethod === m ? s.methodBtnActive : s.methodBtn}
                        onClick={() => setPayMethod(m)}
                    >
                      {m}
                    </button>
                ))}
              </div>

              {/* CARD PAYMENT */}
              {isCard && (
                  <>
                    <div style={s.cardStripe}>
                      <span style={s.cardStripeText}>Secure card entry</span>
                    </div>

                    <p style={s.payHint}>Enter your payment details</p>

                    <div style={s.fields}>
                      <Field
                          placeholder="Name on card *"
                          value={form.cardName}
                          onChange={(v) => updateField("cardName", v)}
                      />

                      <Field
                          placeholder="Card Number *"
                          maxLength={19}
                          value={form.cardNumber}
                          onChange={(v) => updateField("cardNumber", v)}
                      />

                      <div style={s.row2}>
                        <Field
                            placeholder="MM/YY *"
                            maxLength={5}
                            value={form.expiry}
                            onChange={(v) => updateField("expiry", v)}
                        />
                        <Field
                            placeholder="Security Code *"
                            maxLength={4}
                            value={form.cvv}
                            onChange={(v) => updateField("cvv", v)}
                        />
                      </div>
                    </div>
                  </>
              )}

              {/* BANK TRANSFER */}
              {payMethod === "Bank Transfer" && (
                  <div style={s.payHint}>
                    <p>Transfer to:</p>
                    <p><b>Bank:</b> Vietcombank</p>
                    <p><b>Account:</b> 123456789</p>
                    <p><b>Name:</b> Your Store</p>
                  </div>
              )}

              {/* PAYPAL */}
              {payMethod === "Pay Pal" && (
                  <p style={s.payHint}>
                    You will be redirected to PayPal after placing the order.
                  </p>
              )}

              <p style={s.termsLine}>
                By clicking Place Order, you agree to the{" "}
                <a href="#" style={s.termsLink}>
                  Terms and Conditions
                </a>
              </p>

              <button
                  type="button"
                  style={s.placeBtn}
                  onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </section>
          </div>

          {/* ── ORDER SUMMARY ── */}
          <aside style={s.summary}>
            <div style={s.summaryTitle}>Order Summary</div>

            <div style={s.sRow}>
              <span>Subtotal</span>
              <span>{checkout.total}</span>
            </div>
            <div style={s.sRow}>
              <span>Shipping</span>
              <span>$0</span>
            </div>
            <div style={s.sRowTotal}>
              <span>Total</span>
              <span>{checkout.total}</span>
            </div>

            <p style={s.arrives}>Arrives Mar 25 – Mar 28</p>

            {checkout?.cart?.map((item: any) => (
                <div key={item._id} style={s.productCard}>
                  <div style={s.productThumb}>
                    <img src={item.image} alt={item.name} width={40} />
                  </div>

                  <div style={s.productInfo}>
                    <span style={s.productName}>{item.name}</span>
                    <div>Qty: {item.quantity}</div>
                  </div>
                </div>
            ))}
          </aside>

        </div>
      </div>
  );
}