import meterImage from "@/assets/meter-closeup.png";
import hydrotraceIcon from "@/assets/hydrotrace-circle-logo.png";
import { Check, CheckCheck, MapPin, Camera } from "lucide-react";

const WhatsAppMockup = () => {
  return (
    <section className="py-20 px-4 bg-[#faf7ef]">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="heading-xl mb-4">Accessible via WhatsApp</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          No app downloads. No training. Farmers interact with HydroTrace through the messaging platform they already use every day.
        </p>
      </div>

      {/* Phone Frame */}
      <div className="mx-auto w-[340px] sm:w-[380px] rounded-[3rem] border-[8px] border-[#1a1a1a] bg-[#1a1a1a] shadow-2xl overflow-hidden relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-[#1a1a1a] rounded-b-2xl z-20" />

        {/* Status bar */}
        <div className="bg-[#075e54] text-white text-[10px] flex justify-between items-center px-6 pt-8 pb-1 font-sans">
          <span>9:41</span>
          <div className="flex gap-1 items-center">
            <span>●●●●</span>
            <span>WiFi</span>
            <span>🔋</span>
          </div>
        </div>

        {/* WhatsApp Header */}
        <div className="bg-[#075e54] text-white flex items-center gap-3 px-3 pb-3 pt-1">
          <svg viewBox="0 0 24 24" className="w-5 h-5 opacity-80" fill="white"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          <img src={hydrotraceIcon} alt="HydroTrace" className="w-9 h-9 rounded-full border-2 border-white/30" />
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm">HydroTrace</span>
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#25d366]" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </div>
            <span className="text-[10px] opacity-70">Business Account</span>
          </div>
        </div>

        {/* Chat Area */}
        <div className="bg-[#ece5dd] px-3 py-4 space-y-2 min-h-[520px]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'p\' width=\'40\' height=\'40\' patternUnits=\'userSpaceOnUse\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1\' fill=\'%23d4ccb8\' opacity=\'0.3\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill=\'url(%23p)\' width=\'200\' height=\'200\'/%3E%3C/svg%3E")' }}>
          
          {/* Date separator */}
          <div className="flex justify-center">
            <span className="bg-white/80 text-[11px] text-gray-600 px-3 py-1 rounded-lg shadow-sm">TODAY</span>
          </div>

          {/* User: Quota question */}
          <OutgoingBubble time="09:12">
            What is my remaining Quota?
          </OutgoingBubble>

          {/* Bot: Quota response */}
          <IncomingBubble time="09:12">
            <div className="font-mono text-xs space-y-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              <p className="font-semibold">📊 Water Quota Status</p>
              <p>License: <span className="font-semibold">WUL-2024-0847</span></p>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span>Used</span>
                  <span>12,400 / 20,000 m³</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-[#25d366] h-2.5 rounded-full" style={{ width: '62%' }} />
                </div>
                <p className="text-[10px] text-gray-500">62% consumed · 7,600 m³ remaining</p>
              </div>
            </div>
          </IncomingBubble>

          {/* Bot: Submit prompt */}
          <IncomingBubble time="09:12">
            <p className="text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              📷 Please submit your meter reading for <span className="font-semibold">March 2026</span>.
            </p>
          </IncomingBubble>

          {/* User: Meter photo */}
          <OutgoingBubble time="09:14" noPadding>
            <div className="relative">
              <img src={meterImage} alt="Meter reading" className="rounded-lg w-full max-w-[200px]" />
              <div className="absolute bottom-1 left-2 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded flex items-center gap-1">
                <Camera className="w-3 h-3" /> Photo
              </div>
            </div>
          </OutgoingBubble>

          {/* Bot: OCR result */}
          <IncomingBubble time="09:14">
            <div className="text-xs space-y-1" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              <p>✅ Meter reading detected:</p>
              <p className="font-bold text-lg text-[#075e54]">12,847 m³</p>
              <p className="text-[10px] text-gray-500">Confidence: 98.2% · AI-verified</p>
              <p className="mt-1">📍 Please share your location to confirm.</p>
            </div>
          </IncomingBubble>

          {/* User: Location */}
          <OutgoingBubble time="09:15">
            <div className="flex items-center gap-2 text-xs">
              <div className="bg-[#25d366]/20 p-1.5 rounded-full">
                <MapPin className="w-4 h-4 text-[#075e54]" />
              </div>
              <div>
                <p className="font-semibold text-[11px]">Location shared</p>
                <p className="text-[9px] text-gray-500">-29.8587, 31.0218</p>
              </div>
            </div>
          </OutgoingBubble>

          {/* Bot: Summary */}
          <IncomingBubble time="09:15">
            <div className="text-xs space-y-1.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              <p className="font-semibold">📋 Submission Summary</p>
              <div className="space-y-0.5 text-[11px]">
                <p className="flex items-center gap-1"><Check className="w-3 h-3 text-[#25d366]" /> Reading: 12,847 m³</p>
                <p className="flex items-center gap-1"><Check className="w-3 h-3 text-[#25d366]" /> GPS: Verified ✓</p>
                <p className="flex items-center gap-1"><Check className="w-3 h-3 text-[#25d366]" /> Timestamp: 02 Mar 2026, 09:15</p>
                <p className="flex items-center gap-1"><Check className="w-3 h-3 text-[#25d366]" /> Status: Recorded on-chain</p>
              </div>
              <div className="bg-[#dcf8c6] rounded px-2 py-1 mt-1 text-[10px]">
                🔗 Tx: <span className="font-mono text-[#075e54]">0x7f3a...e2b1</span>
              </div>
            </div>
          </IncomingBubble>
        </div>

        {/* Input bar */}
        <div className="bg-[#f0f0f0] flex items-center gap-2 px-3 py-2">
          <div className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-gray-400">
            Type a message
          </div>
          <div className="w-9 h-9 bg-[#25d366] rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </div>
        </div>
      </div>
    </section>
  );
};

/* Bubble components */
const OutgoingBubble = ({ children, time, noPadding }: { children: React.ReactNode; time: string; noPadding?: boolean }) => (
  <div className="flex justify-end">
    <div className={`bg-[#dcf8c6] rounded-lg rounded-tr-none shadow-sm max-w-[75%] ${noPadding ? 'p-1' : 'px-3 py-2'}`}>
      <div className="text-[13px] text-gray-800">{children}</div>
      <div className="flex justify-end items-center gap-1 mt-0.5">
        <span className="text-[9px] text-gray-500">{time}</span>
        <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
      </div>
    </div>
  </div>
);

const IncomingBubble = ({ children, time }: { children: React.ReactNode; time: string }) => (
  <div className="flex justify-start">
    <div className="bg-white rounded-lg rounded-tl-none shadow-sm max-w-[80%] px-3 py-2">
      <div className="text-[13px] text-gray-800">{children}</div>
      <div className="flex justify-end mt-0.5">
        <span className="text-[9px] text-gray-500">{time}</span>
      </div>
    </div>
  </div>
);

export default WhatsAppMockup;
