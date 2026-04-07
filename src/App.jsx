import { useState, useEffect, useRef } from "react";
import "./App.css";
const phrases = [
  "Katbghini ????",
  "wach mtakda !",
  "gha katkdbi",
  "wach mtakda !",
  "fakri mzn !",
  "lah ihdik gha fakri !",
  "Aghir goli ah !!!!!",
];

function Particle({ x, y, color, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1200);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      style={{
        position: "fixed", left: x, top: y, width: 10, height: 10,
        borderRadius: 2, background: color, pointerEvents: "none",
        animation: "confettiFall 1.2s ease forwards",
      }}
    />
  );
}
let pid = 0;
const COLORS = ["#E0709A","#FFD700","#7B61FF","#FF6B6B","#43E97B","#38F9D7"];

export default function App() {
  const [step, setStep] = useState(0);
  const [text , setText] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [particles, setParticles] = useState([]);
  const appRef = useRef(null);

  const laSize = 56 + step * 18;
  const laSizes = 56 ;
  const laFs   = 18 + step * 4;
  const laFss  = 18 ;
  const ahSize = laSize + 16;
  const ahFs   = laFs + 2;

  function spawn(n = 20) {
    const rect = appRef.current?.getBoundingClientRect() ?? { left: 0, top: 0, width: 400, height: 600 };
    const newP = Array.from({ length: n }, () => ({
      id: pid++,
      x: rect.left + Math.random() * rect.width,
      y: rect.top  + Math.random() * rect.height * 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
    setParticles(p => [...p, ...newP]);
  }

  function removeParticle(id) {
    setParticles(p => p.filter(x => x.id !== id));
  }

  function handleLa() {
    if (accepted) return;
     setStep(s => s + 1);
       if (text === 6) {
    setText(6);
  }else {
    setText(s => s + 1);
  }
  }



  function handleAh() {
    if (accepted) { spawn(40); return; }
    setAccepted(true);
    spawn(50);
  }

  return (
    <>
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0)    rotate(0deg);   opacity: 1; }
          100% { transform: translateY(260px) rotate(540deg); opacity: 0; }
        }
        @keyframes floatUp {
          from { transform: translateY(0) scale(1); opacity: 1; }
          to   { transform: translateY(-180px) scale(0.4); opacity: 0; }
        }
        @keyframes msgPop {
          0%   { transform: scale(0.75); opacity: 0; }
          60%  { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1);    opacity: 1; }
        }
        @keyframes heartbeat {
          0%,100% { transform: scale(1); }
          20%     { transform: scale(1.3); }
          40%     { transform: scale(1); }
          60%     { transform: scale(1.18); }
        }
        @keyframes celebIn {
          0%   { opacity: 0; transform: scale(0.6) rotate(-4deg); }
          70%  { transform: scale(1.06) rotate(1deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .msg-anim  { animation: msgPop 0.35s cubic-bezier(.34,1.56,.64,1) both; }
        .celeb-anim { animation: celebIn 0.55s cubic-bezier(.34,1.56,.64,1) both; }
        .ah-pulse  { animation: heartbeat 0.75s ease infinite; }
      `}</style>

      {particles.map(p => (
        <Particle key={p.id} {...p} onDone={() => removeParticle(p.id)} />
      ))}

      <div
        ref={appRef}
        className="h-screen  flex flex-col items-center justify-center gap-8"
      >
        {!accepted ? (
          <>
            <h1
              key={step}
              className="text-4xl text-[#E0709A] msg-anim font-semibold font-stretch-ultra-expanded "
              
            >
              {phrases[text]}
            </h1>

            <div className=" flex items-center  space-x-6 ">
              <button
                onClick={handleAh}
                style={{
                  width: ahSize, height: ahSize, fontSize: ahFs,
                  margin: 10,
                  background: "#E0709A", color: "#fff", border: "none",
                  borderRadius: ahSize * 0.28, fontWeight: 600,
                  cursor: "pointer", transition: "all 0.35s cubic-bezier(.34,1.56,.64,1)",
                }}
               
              >
                AH
              </button>

              <button
                onClick={handleLa}
                style={{
                  width: laSizes, height: laSizes, fontSize: laFss,
                  background: "#E0709A", color: "#fff", border: "none",
                  borderRadius: laSizes * 0.28, fontWeight: 600,
                  cursor: "pointer", transition: "all 0.35s cubic-bezier(.34,1.56,.64,1)",
                }}
              >
                LA
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-6 celeb-anim">
            <p style={{ fontSize: 42, margin: 0 }}>💖</p>
            <h1
              className="text-3xl font-medium text-center"
              style={{ color: "#E0709A" }}
            >
              hta ana 
            </h1>


          </div>
        )}
      </div>
    </>
  );
}