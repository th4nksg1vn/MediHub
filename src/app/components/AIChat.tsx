"use client";
import { useState } from "react";

type Message = { id: string; from: "user" | "bot"; text: string };

export default function AIChat({
  onSend,
}: {
  onSend?: (msg: string) => Promise<unknown>;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim()) return;
    const userMsg: Message = {
      id: String(Date.now()),
      from: "user",
      text: input,
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    if (onSend) {
      try {
        const res = await onSend(userMsg.text);
        const botMsg: Message = {
          id: String(Date.now() + 1),
          from: "bot",
          text: String(res ?? "No response"),
        };
        setMessages((m) => [...m, botMsg]);
      } catch (err) {
        // log the error for debugging
        console.error(err);
        const botMsg: Message = {
          id: String(Date.now() + 2),
          from: "bot",
          text: "Error contacting AI",
        };
        setMessages((m) => [...m, botMsg]);
      }
    } else {
      // local stub response
      const botMsg: Message = {
        id: String(Date.now() + 3),
        from: "bot",
        text: "(AI stub) Thanks — we received your message.",
      };
      setMessages((m) => [...m, botMsg]);
    }
  }

  return (
    <div className="ai-chat card">
      <div className="ai-messages" style={{ maxHeight: 240, overflow: "auto" }}>
        {messages.map((m) => (
          <div key={m.id} className={`ai-msg ai-msg-${m.from}`}>
            <small>{m.from === "user" ? "You" : "Assistant"}</small>
            <div>{m.text}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="ai-input actions">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe symptoms or ask..."
        />
        <button className="hh-btn hh-btn-primary" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
