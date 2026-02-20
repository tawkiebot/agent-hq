"use client"

export default function MicroAnimations() {
  return (
    <style jsx global>{`
      :root {
        --ease-out-smooth: cubic-bezier(0.22, 1, 0.36, 1);
      }

      /* Generic transition helper */
      .u-anim {
        transition-property: transform, opacity, box-shadow, background-color, border-color, color, filter;
        transition-duration: 180ms;
        transition-timing-function: var(--ease-out-smooth);
        will-change: transform;
      }

      /* Hover lift and press feedback (attach on interactive elements) */
      .u-lift:hover {
        transform: translateY(-1px);
      }
      .u-press:active {
        transform: translateY(0.5px) scale(0.997);
      }

      /* Card-level motion (subtle lift on hover, tiny settle on active/focus) */
      .u-card {
        transition: transform 180ms var(--ease-out-smooth), border-color 180ms var(--ease-out-smooth),
          box-shadow 180ms var(--ease-out-smooth), background-color 180ms var(--ease-out-smooth);
        will-change: transform;
      }
      .u-card:hover {
        transform: translateY(-1px);
      }
      .u-card:active {
        transform: translateY(0) scale(0.999);
      }
      .u-card:focus-visible {
        transform: translateY(-0.5px);
        outline: none;
      }

      /* Subtle pop-in for overlay and fade-in for connector */
      .u-pop {
        animation: micro-pop 160ms var(--ease-out-smooth) both;
      }
      @keyframes micro-pop {
        from {
          opacity: 0;
          transform: translateY(2px) scale(0.995);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      .u-fade {
        animation: fade-in 140ms ease-out both;
      }
      @keyframes fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      /* Respect user preference */
      @media (prefers-reduced-motion: reduce) {
        .u-anim,
        .u-card {
          transition: none !important;
        }
        .u-lift:hover,
        .u-press:active,
        .u-card:hover,
        .u-card:active,
        .u-card:focus-visible {
          transform: none !important;
        }
        .u-pop,
        .u-fade {
          animation: none !important;
        }
      }
    `}</style>
  )
}
