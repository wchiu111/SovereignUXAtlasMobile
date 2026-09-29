import {
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";

type TransmissionState = "idle" | "sending" | "success" | "error";

interface ProfileContactPanelProps {
  onTransmit?: (formData: FormData) => Promise<void>;
}

export default function ProfileContactPanel({
  onTransmit,
}: ProfileContactPanelProps) {
  const [state, setState] = useState<TransmissionState>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    setState("sending");

    try {
      if (onTransmit) {
        await onTransmit(formData);
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 900));
      }

      form.reset();
      setState("success");
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <TransmissionResult
        status="success"
        eyebrow="Transmission received"
        title="Message delivered"
        message="Your signal has entered the Observatory. I’ll respond through the email address you provided."
        actionLabel="Send another message"
        onAction={() => setState("idle")}
      />
    );
  }

  if (state === "error") {
    return (
      <TransmissionResult
        status="error"
        eyebrow="Transmission interrupted"
        title="Message not delivered"
        message="The channel could not complete the transmission. Please check the connection and try again."
        actionLabel="Try again"
        onAction={() => setState("idle")}
      />
    );
  }

  const sending = state === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={sending}
      style={{
        position: "relative",
        display: "grid",
        alignContent: "start",
        width: "min(100%, 720px)",
        margin: "0 auto",
        padding: "34px 34px 42px",
        minHeight: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes contactTransmissionSweep {
          from { transform: translateY(-120%); opacity: 0; }
          18% { opacity: 0.9; }
          82% { opacity: 0.46; }
          to { transform: translateY(920%); opacity: 0; }
        }

        @keyframes contactResultIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes contactSignalPulse {
          0%, 100% { opacity: 0.54; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.18); }
        }
      `}</style>

      {sending && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 84,
            background:
              "linear-gradient(180deg, transparent, rgba(116,201,155,0.22), transparent)",
            filter: "blur(2px)",
            animation: "contactTransmissionSweep 900ms ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 18,
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(116,201,155,0.74)",
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#74C99B",
            boxShadow: "0 0 14px rgba(116,201,155,0.68)",
          }}
        />
        {sending ? "Transmitting" : "Channel open"}
      </div>

      <p
        style={{
          margin: "0 0 8px",
          maxWidth: 560,
          fontFamily: "'EB Garamond', serif",
          fontSize: 18,
          lineHeight: 1.5,
          color: "rgba(245,235,210,0.68)",
        }}
      >
        Share what you’re building, questioning, or trying to make clearer.
      </p>

      <Field label="Name" name="name" disabled={sending} />
      <Field label="Email" name="email" type="email" disabled={sending} />

      <label style={labelStyle}>
        Message
        <textarea
          name="message"
          rows={4}
          required
          disabled={sending}
          style={{
            ...inputStyle,
            resize: "vertical",
            minHeight: 110,
            maxHeight: 240,
            opacity: sending ? 0.58 : 1,
          }}
        />
      </label>

      <button
        type="submit"
        disabled={sending}
        style={{
          width: "100%",
          marginTop: 14,
          padding: "12px 14px",
          border: "1px solid rgba(116,201,155,0.38)",
          borderRadius: 8,
          background: sending
            ? "rgba(116,201,155,0.14)"
            : "rgba(116,201,155,0.08)",
          color: "rgba(232,245,236,0.9)",
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          cursor: sending ? "wait" : "pointer",
          opacity: sending ? 0.74 : 1,
          transition:
            "background 220ms ease, opacity 220ms ease, border-color 220ms ease",
        }}
      >
        {sending ? "Transmitting…" : "Transmit message"}
      </button>

      <div
        style={{
          marginTop: 14,
          textAlign: "center",
          fontFamily: "'DM Mono', monospace",
          fontSize: 9,
          letterSpacing: "0.1em",
          color: "rgba(245,235,210,0.34)",
        }}
      >
        Replies are sent personally to the email provided.
      </div>
    </form>
  );
}

function TransmissionResult({
  status,
  eyebrow,
  title,
  message,
  actionLabel,
  onAction,
}: {
  status: "success" | "error";
  eyebrow: string;
  title: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
}) {
  const success = status === "success";
  const tone = success ? "#74C99B" : "#E8A06D";
  const toneSoft = success
    ? "rgba(116,201,155,0.16)"
    : "rgba(232,160,109,0.14)";

  return (
    <section
      role={success ? "status" : "alert"}
      aria-live="polite"
      style={{
        display: "grid",
        placeItems: "center",
        alignContent: "center",
        minHeight: "100%",
        padding: "48px 28px",
        boxSizing: "border-box",
        textAlign: "center",
        animation: "contactResultIn 420ms ease-out both",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "relative",
          width: 88,
          height: 88,
          marginBottom: 24,
        }}
      >
        {[88, 58].map((size) => (
          <span
            key={size}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: size,
              height: size,
              borderRadius: "50%",
              border: `1px solid ${success ? "rgba(116,201,155,0.26)" : "rgba(232,160,109,0.24)"}`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 14,
            height: 14,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            background: tone,
            boxShadow: `0 0 18px ${tone}, 0 0 44px ${toneSoft}`,
            animation: "contactSignalPulse 2800ms ease-in-out infinite",
          }}
        />
      </div>

      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: success
            ? "rgba(116,201,155,0.78)"
            : "rgba(232,160,109,0.82)",
        }}
      >
        {eyebrow}
      </div>

      <h3
        style={{
          margin: "14px 0 0",
          fontFamily: "'DM Mono', monospace",
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(244,235,210,0.94)",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          maxWidth: 460,
          margin: "18px 0 0",
          fontFamily: "'EB Garamond', serif",
          fontSize: 18,
          lineHeight: 1.5,
          color: "rgba(245,235,210,0.68)",
        }}
      >
        {message}
      </p>

      <button
        type="button"
        onClick={onAction}
        style={{
          minWidth: 240,
          marginTop: 30,
          padding: "12px 18px",
          border: `1px solid ${
            success
              ? "rgba(116,201,155,0.38)"
              : "rgba(232,160,109,0.38)"
          }`,
          borderRadius: 8,
          background: toneSoft,
          color: "rgba(244,239,224,0.9)",
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        {actionLabel}
      </button>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  disabled = false,
}: {
  label: string;
  name: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <label style={labelStyle}>
      {label}
      <input
        name={name}
        type={type}
        required
        disabled={disabled}
        style={{ ...inputStyle, opacity: disabled ? 0.58 : 1 }}
      />
    </label>
  );
}

const labelStyle: CSSProperties = {
  display: "grid",
  gap: 7,
  marginTop: 10,
  fontFamily: "'DM Mono', monospace",
  fontSize: 10,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "rgba(245,235,210,0.48)",
};

const inputStyle: CSSProperties = {
  boxSizing: "border-box",
  width: "100%",
  padding: "10px 12px",
  border: "1px solid rgba(116,201,155,0.18)",
  borderRadius: 7,
  outline: "none",
  background: "rgba(255,255,255,0.025)",
  color: "#F4EBD0",
  fontFamily: "'EB Garamond', serif",
  fontSize: 16,
};
