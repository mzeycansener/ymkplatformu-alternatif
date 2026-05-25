import React, { useState, useRef, useEffect } from 'react';
import styles from './SpinWheel.module.css';

const segments = [
  "%10 İndirim", "Bedava Kahve", "15₺ Kupon", "Tekrar Dene",
  "%5 İndirim", "Sürpriz Ürün", "20₺ Kupon", "50₺ JACKPOT"
];

export default function SpinWheel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prize, setPrize] = useState(null);
  const canvasRef = useRef(null);
  const wheelRotation = useRef(0);

  useEffect(() => {
    if (isOpen && !prize && canvasRef.current) {
      drawWheel(0);
    }
  }, [isOpen, prize]);

  const drawWheel = (rotation) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 5; 

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw outer stroke
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 2, 0, 2 * Math.PI);
    ctx.fillStyle = '#E85D26'; // var(--color-accent)
    ctx.fill();

    const arcSize = (2 * Math.PI) / segments.length;

    for (let i = 0; i < segments.length; i++) {
      const angle = rotation + i * arcSize;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angle, angle + arcSize);
      ctx.fillStyle = i % 2 === 0 ? '#FFF5F0' : '#FEE8DF';
      ctx.fill();
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#E85D26';
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle + arcSize / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#18181B'; // var(--color-ink)
      ctx.font = '700 14px "Plus Jakarta Sans"';
      ctx.fillText(segments[i], radius - 16, 5);
      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(centerX, centerY, 48, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#E85D26';
    ctx.stroke();

    ctx.fillStyle = '#18181B';
    ctx.font = '700 16px "Plus Jakarta Sans"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('KAPI', centerX, centerY);
  };

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setPrize(null);

    const spinDuration = 3000;
    const minSpins = 5;
    const randomSegmentIndex = Math.floor(Math.random() * segments.length);
    const segmentArc = (2 * Math.PI) / segments.length;
    
    const targetAngle = -Math.PI/2 - (randomSegmentIndex * segmentArc) - (segmentArc / 2);
    const totalRotation = targetAngle + (minSpins * 2 * Math.PI);
    
    const startRotation = wheelRotation.current;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3); 
      
      const currentRotation = startRotation + (totalRotation - startRotation) * easeOut;
      wheelRotation.current = currentRotation % (2 * Math.PI);
      
      drawWheel(wheelRotation.current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setPrize(segments[randomSegmentIndex]);
        
        if (window.confetti) {
          window.confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#E85D26', '#FAFAF8', '#18181B']
          });
        }
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <>
      <section className={styles.campaignSection}>
        <div className={styles.bgBlob}></div>
        <div className={`container`}>
          <div className={styles.campaignCard} onClick={() => setIsOpen(true)}>
            
            <div className={styles.cardText}>
              <div className={styles.badge}>🎁 GÜNÜN FIRSATI</div>
              <h2 className={styles.cardTitle}>Şansını Dene, İndirimi Kap!</h2>
              <p className={styles.cardSubtitle}>
                Dikdörtgen kutulardan sıkıldık! Çarkı çevir, sürpriz indirimleri anında sepette kullan.
              </p>
              <button className={styles.cardBtn}>Hemen Çevir 🎡</button>
            </div>

            <div className={styles.cardWheelWrap}>
              <svg viewBox="0 0 100 100" className={styles.svgWheel}>
                {/* Outer Rim */}
                <circle cx="50" cy="50" r="46" fill="#18181B" stroke="#E85D26" strokeWidth="8"/>
                
                {/* Slices */}
                <path d="M50 50 L50 8 A42 42 0 0 1 80 20 Z" fill="#FFF5F0" />
                <path d="M50 50 L80 20 A42 42 0 0 1 92 50 Z" fill="#E85D26" />
                <path d="M50 50 L92 50 A42 42 0 0 1 80 80 Z" fill="#FFF5F0" />
                <path d="M50 50 L80 80 A42 42 0 0 1 50 92 Z" fill="#E85D26" />
                <path d="M50 50 L50 92 A42 42 0 0 1 20 80 Z" fill="#FFF5F0" />
                <path d="M50 50 L20 80 A42 42 0 0 1 8 50 Z" fill="#E85D26" />
                <path d="M50 50 L8 50 A42 42 0 0 1 20 20 Z" fill="#FFF5F0" />
                <path d="M50 50 L20 20 A42 42 0 0 1 50 8 Z" fill="#E85D26" />

                {/* Center pin */}
                <circle cx="50" cy="50" r="14" fill="#FFE600" stroke="#18181B" strokeWidth="4"/>
                <circle cx="50" cy="50" r="5" fill="#18181B" />
                
                {/* Inner dots/lights on rim */}
                <circle cx="50" cy="8" r="2" fill="#FFE600" />
                <circle cx="80" cy="20" r="2" fill="#FFE600" />
                <circle cx="92" cy="50" r="2" fill="#FFE600" />
                <circle cx="80" cy="80" r="2" fill="#FFE600" />
                <circle cx="50" cy="92" r="2" fill="#FFE600" />
                <circle cx="20" cy="80" r="2" fill="#FFE600" />
                <circle cx="8" cy="50" r="2" fill="#FFE600" />
                <circle cx="20" cy="20" r="2" fill="#FFE600" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {isOpen && (
        <div className={styles.overlay} onClick={() => !isSpinning && setIsOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button 
              className={styles.closeBtn} 
              onClick={() => !isSpinning && setIsOpen(false)}
            >
              ✕
            </button>
            
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Günlük Çarkın</h2>
              <p className={styles.modalSubtitle}>Sürpriz indirimini kazanmak için çevir!</p>
            </div>

            {!prize ? (
              <div className={styles.wheelArea}>
                <div className={styles.pointer}></div>
                <canvas ref={canvasRef} width="340" height="340" className={styles.canvas}></canvas>
                <button 
                  className={styles.spinBtn} 
                  onClick={spin}
                  disabled={isSpinning}
                  style={{ opacity: isSpinning ? 0.5 : 1 }}
                >
                  ÇEVİR
                </button>
              </div>
            ) : (
              <div className={styles.winState}>
                <h3 className={styles.prizeName}>{prize}</h3>
                <p className={styles.prizeDesc}>Tebrikler! Kupon kodunu kopyala ve sepette uygula.</p>
                <div 
                  className={styles.couponCode}
                  onClick={() => navigator.clipboard.writeText('KAPI-KAZAN-23X')}
                >
                  KAPI-KAZAN-23X
                </div>
                <button className={styles.ghostBtn} onClick={() => setIsOpen(false)}>
                  Kapat
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
