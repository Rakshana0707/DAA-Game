import React, { useEffect } from 'react';
import { 
  HelpCircle, 
  X, 
  Target, 
  ListOrdered, 
  MousePointer, 
  BarChart3, 
  Lightbulb, 
  Cpu, 
  AlertTriangle, 
  CheckCircle2 
} from 'lucide-react';
import { getLevelGuide } from '../engine/helpGuides';

export default function HelpGuideModal({ isOpen, onClose, level = 1 }) {
  const guide = getLevelGuide(level);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !guide) return null;

  return (
    <div
      id="help-guide-modal"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem'
      }}
      onClick={(e) => {
        // Close if clicking outside the modal dialog
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-guide-title"
        style={{
          backgroundColor: '#0f172a',
          color: '#f8fafc',
          border: '1px solid #334155',
          borderRadius: '1rem',
          width: '100%',
          maxWidth: '780px',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          overflow: 'hidden'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #1e293b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#1e293b',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '0.5rem',
                backgroundColor: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                flexShrink: 0
              }}
            >
              <HelpCircle size={24} />
            </div>
            <div>
              <h2
                id="help-guide-title"
                style={{
                  margin: 0,
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: '#f8fafc',
                  letterSpacing: '-0.02em'
                }}
              >
                {guide.title}
              </h2>
              {guide.subtitle && (
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                  {guide.subtitle}
                </div>
              )}
            </div>
          </div>

          <button
            id="close-help-btn-top"
            onClick={onClose}
            className="btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 0.9rem',
              borderRadius: '0.5rem',
              border: '1px solid #475569',
              backgroundColor: '#334155',
              color: '#f8fafc',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 600,
              flexShrink: 0
            }}
            aria-label="Close Help Guide"
          >
            <X size={16} />
            <span>CLOSE</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div
          style={{
            padding: '1.5rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            color: '#cbd5e1'
          }}
        >
          {guide.sections.map((section) => {
            switch (section.type) {
              case 'text':
                return (
                  <div
                    key={section.id}
                    style={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '0.75rem',
                      padding: '1rem 1.25rem'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#38bdf8',
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        marginBottom: '0.5rem'
                      }}
                    >
                      <Target size={18} />
                      <span>{section.title}</span>
                    </div>
                    <p style={{ margin: 0, color: '#e2e8f0' }}>{section.content}</p>
                  </div>
                );

              case 'steps':
                return (
                  <div
                    key={section.id}
                    style={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '0.75rem',
                      padding: '1rem 1.25rem'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#60a5fa',
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        marginBottom: '0.5rem'
                      }}
                    >
                      <ListOrdered size={18} />
                      <span>{section.title}</span>
                    </div>
                    {section.intro && (
                      <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                        {section.intro}
                      </div>
                    )}
                    <ol
                      style={{
                        margin: 0,
                        paddingLeft: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem'
                      }}
                    >
                      {section.items.map((step, idx) => (
                        <li key={idx} style={{ color: '#f1f5f9', fontWeight: 500 }}>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                );

              case 'bullet-list':
                return (
                  <div
                    key={section.id}
                    style={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '0.75rem',
                      padding: '1rem 1.25rem'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: section.id === 'controls' ? '#a78bfa' : '#fbbf24',
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        marginBottom: '0.5rem'
                      }}
                    >
                      {section.id === 'controls' ? (
                        <MousePointer size={18} />
                      ) : (
                        <Lightbulb size={18} />
                      )}
                      <span>{section.title}</span>
                    </div>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem'
                      }}
                    >
                      {section.items.map((item, idx) => (
                        <li key={idx} style={{ color: '#e2e8f0' }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );

              case 'stats':
                return (
                  <div
                    key={section.id}
                    style={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '0.75rem',
                      padding: '1rem 1.25rem'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#34d399',
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        marginBottom: '0.5rem'
                      }}
                    >
                      <BarChart3 size={18} />
                      <span>{section.title}</span>
                    </div>
                    {section.intro && (
                      <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                        {section.intro}
                      </div>
                    )}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '0.75rem'
                      }}
                    >
                      {section.items.map((stat, idx) => (
                        <div
                          key={idx}
                          style={{
                            backgroundColor: '#0f172a',
                            border: '1px solid #334155',
                            borderRadius: '0.5rem',
                            padding: '0.75rem 1rem'
                          }}
                        >
                          <div
                            style={{
                              fontWeight: 700,
                              color: '#67e8f9',
                              fontSize: '0.95rem',
                              marginBottom: '0.25rem'
                            }}
                          >
                            {stat.name}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                            {stat.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );

              case 'daa':
                return (
                  <div
                    key={section.id}
                    style={{
                      backgroundColor: '#0f2744',
                      border: '1px solid #0284c7',
                      borderRadius: '0.75rem',
                      padding: '1rem 1.25rem'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: '#38bdf8',
                          fontWeight: 700,
                          fontSize: '1.05rem'
                        }}
                      >
                        <Cpu size={18} />
                        <span>{section.title}</span>
                      </div>
                      {section.badge && (
                        <span
                          style={{
                            backgroundColor: '#0284c7',
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.55rem',
                            borderRadius: '9999px',
                            textTransform: 'uppercase'
                          }}
                        >
                          {section.badge}
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        margin: 0,
                        color: '#bae6fd',
                        whiteSpace: 'pre-line'
                      }}
                    >
                      {section.content}
                    </p>
                  </div>
                );

              case 'alert':
                return (
                  <div
                    key={section.id}
                    style={{
                      backgroundColor: '#451a1a',
                      border: '1px solid #ef4444',
                      borderRadius: '0.75rem',
                      padding: '1rem 1.25rem'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#f87171',
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        marginBottom: '0.35rem'
                      }}
                    >
                      <AlertTriangle size={18} />
                      <span>{section.title}</span>
                    </div>
                    <p style={{ margin: 0, color: '#fecaca' }}>{section.content}</p>
                  </div>
                );

              case 'goal':
                return (
                  <div
                    key={section.id}
                    style={{
                      backgroundColor: '#064e3b',
                      border: '1px solid #10b981',
                      borderRadius: '0.75rem',
                      padding: '1rem 1.25rem'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#34d399',
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        marginBottom: '0.35rem'
                      }}
                    >
                      <CheckCircle2 size={18} />
                      <span>{section.title}</span>
                    </div>
                    <p style={{ margin: 0, color: '#a7f3d0', fontWeight: 600 }}>
                      "{section.content}"
                    </p>
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid #1e293b',
            backgroundColor: '#1e293b',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            Tip: You can re-open this guide anytime using the <strong>[? HELP / GUIDE]</strong> button.
          </span>
          <button
            id="close-help-btn-bottom"
            onClick={onClose}
            className="btn"
            style={{
              padding: '0.6rem 1.5rem',
              backgroundColor: '#0284c7',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span>GOT IT, CLOSE</span>
          </button>
        </div>
      </div>
    </div>
  );
}
