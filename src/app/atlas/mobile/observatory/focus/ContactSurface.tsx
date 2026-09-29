import { useState, type FormEvent } from "react";
import { T } from "../../components/mobileShared";
import { OBSERVATORY_CONTENT } from "../config/observatoryContent";

type State = "idle" | "sending" | "success" | "error";
const GREEN = "#33D1A1";

export default function ContactSurface() {
  const [state, setState] = useState<State>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const form = event.currentTarget;
    setState("sending");

    try {
      // Mobile v1 preserves Desktop's interaction model. The production
      // contact transport can be connected after this surface is validated.
      await new Promise((resolve) => window.setTimeout(resolve, 900));
      form.reset();
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <Result
        tone={GREEN}
        eyebrow="Transmission received"
        title="Message delivered"
        message="Your signal has entered the Observatory. I’ll respond through the email address you provided."
        action="Send another message"
        onAction={() => setState("idle")}
      />
    );
  }

  if (state === "error") {
    return (
      <Result
        tone="#E8A06D"
        eyebrow="Transmission interrupted"
        title="Message not delivered"
        message="The channel could not complete the transmission. Please check the connection and try again."
        action="Try again"
        onAction={() => setState("idle")}
      />
    );
  }

  const sending = state === "sending";

  return (
    <form
      onSubmit={submit}
      aria-busy={sending}
      style={{
        position: "relative",
        padding:
          "34px 24px calc(76px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <style>{`
        @keyframes observatoryContactSweep {
          from { transform: translateY(-130%); opacity: 0; }
          20% { opacity: 0.72; }
          80% { opacity: 0.34; }
          to { transform: translateY(900%); opacity: 0; }
        }
      `}</style>

      {sending && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 72,
            background:
              "linear-gradient(180deg, transparent, rgba(51,209,161,0.18), transparent)",
            filter: "blur(1.5px)",
            animation:
              "observatoryContactSweep 900ms ease-in-out infinite",
          }}
        />
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: T.mono,
          fontSize: 8,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: GREEN,
          opacity: 0.80,
        }}
      >
        <span
          aria-hidden
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: GREEN,
            boxShadow: "0 0 12px rgba(51,209,161,0.62)",
          }}
        />
        {sending ? "Transmitting" : "Channel open"}
      </div>

      <p
        style={{
          margin: "18px 0 22px",
          fontFamily: T.serif,
          fontSize: 18,
          lineHeight: 1.5,
          color: T.body,
          opacity: 0.78,
        }}
      >
        {OBSERVATORY_CONTENT.contact.intro}
      </p>

      <Field label="Name" name="name" disabled={sending} />
      <Field
        label="Email"
        name="email"
        type="email"
        disabled={sending}
      />

      <label
        style={{
          display: "grid",
          gap: 7,
          marginTop: 16,
          fontFamily: T.mono,
          fontSize: 7,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: T.body,
          opacity: 0.58,
        }}
      >
        Message
        <textarea
          name="message"
          rows={6}
          required
          disabled={sending}
          className="observatory-mobile-focusable"
          style={{
            width: "100%",
            minHeight: 128,
            resize: "vertical",
            boxSizing: "border-box",
            border: "0.5px solid rgba(51,209,161,0.26)",
            borderRadius: 3,
            outline: "none",
            background: "rgba(255,255,255,0.025)",
            padding: "12px",
            fontFamily: T.serif,
            fontSize: 16,
            lineHeight: 1.45,
            color: "#F0E9D8",
            opacity: sending ? 0.55 : 1,
          }}
        />
      </label>

      <button
        type="submit"
        disabled={sending}
        className="observatory-mobile-focusable"
        style={{
          width: "100%",
          minHeight: 50,
          marginTop: 18,
          border: "0.75px solid rgba(51,209,161,0.38)",
          borderRadius: 3,
          background: sending
            ? "rgba(51,209,161,0.12)"
            : "rgba(51,209,161,0.06)",
          fontFamily: T.mono,
          fontSize: 8,
          letterSpacing: "0.18em",
          color: "#E9F6EF",
          cursor: sending ? "wait" : "pointer",
          opacity: sending ? 0.72 : 1,
        }}
      >
        {sending ? "TRANSMITTING…" : "TRANSMIT MESSAGE"}
      </button>

      <div
        style={{
          marginTop: 14,
          textAlign: "center",
          fontFamily: T.mono,
          fontSize: 6.5,
          letterSpacing: "0.10em",
          color: T.body,
          opacity: 0.34,
        }}
      >
        {OBSERVATORY_CONTENT.contact.replyNote}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  disabled,
}: {
  label: string;
  name: string;
  type?: string;
  disabled: boolean;
}) {
  return (
    <label
      style={{
        display: "grid",
        gap: 7,
        marginTop: 16,
        fontFamily: T.mono,
        fontSize: 7,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: T.body,
        opacity: 0.58,
      }}
    >
      {label}
      <input
        name={name}
        type={type}
        required
        disabled={disabled}
        className="observatory-mobile-focusable"
        style={{
          minHeight: 44,
          boxSizing: "border-box",
          border: "0.5px solid rgba(51,209,161,0.26)",
          borderRadius: 3,
          outline: "none",
          background: "rgba(255,255,255,0.025)",
          padding: "10px 12px",
          fontFamily: T.serif,
          fontSize: 16,
          color: "#F0E9D8",
          opacity: disabled ? 0.55 : 1,
        }}
      />
    </label>
  );
}

function Result({
  tone,
  eyebrow,
  title,
  message,
  action,
  onAction,
}: {
  tone: string;
  eyebrow: string;
  title: string;
  message: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        minHeight: "calc(100% - 20px)",
        display: "grid",
        placeItems: "center",
        alignContent: "center",
        padding: "54px 24px 90px",
        textAlign: "center",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "relative",
          width: 84,
          height: 84,
        }}
      >
        {[84, 54].map((size) => (
          <span
            key={size}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: size,
              height: size,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: `0.5px solid ${tone}55`,
            }}
          />
        ))}
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 12,
            height: 12,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: tone,
            boxShadow: `0 0 20px ${tone}88`,
          }}
        />
      </div>

      <div
        style={{
          marginTop: 22,
          fontFamily: T.mono,
          fontSize: 8,
          letterSpacing: "0.18em",
          color: tone,
          opacity: 0.78,
        }}
      >
        {eyebrow.toUpperCase()}
      </div>

      <h2
        style={{
          margin: "12px 0 0",
          fontFamily: T.serif,
          fontSize: 28,
          fontWeight: 600,
          color: "#F0E9D8",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          margin: "16px 0 0",
          maxWidth: 310,
          fontFamily: T.serif,
          fontSize: 15,
          lineHeight: 1.58,
          color: T.body,
          opacity: 0.72,
        }}
      >
        {message}
      </p>

      <button
        type="button"
        onClick={onAction}
        className="observatory-mobile-focusable"
        style={{
          minWidth: 220,
          minHeight: 48,
          marginTop: 28,
          border: `0.75px solid ${tone}55`,
          borderRadius: 3,
          background: `${tone}0F`,
          fontFamily: T.mono,
          fontSize: 8,
          letterSpacing: "0.16em",
          color: "#F0E9D8",
          cursor: "pointer",
        }}
      >
        {action.toUpperCase()}
      </button>
    </div>
  );
}
