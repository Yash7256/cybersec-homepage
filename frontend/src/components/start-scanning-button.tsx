const StartScanningButton = () => {
  return (
    <>
      <style>{`
        .gradient-wrapper {
          display: inline-block;
          border-radius: 62px;
          padding: 1px;
          background: conic-gradient(from 180deg, #8B5CF6FF 0%, #8B5CF6E6 3%, #8B5CF6B3 6%, #8B5CF680 9%, #8B5CF61A 12%, #8B5CF61A 15%, #8B5CF61A 18%, #8B5CF61A 21%, #F9731621 24%, #F9731621 27%, #F9731621 30%, #F9731621 33%, #F9731680 36%, #F97316B3 42%, #F97316E6 48%, #F97316E6 51%, #F97316FF 54%, #F97316FF 57%, #F97316E6 60%, #F97316B3 63%, #F9731680 66%, #F9731621 69%, #F9731621 72%, #F9731621 75%, #F9731621 78%, #8B5CF61A 81%, #8B5CF61A 84%, #8B5CF680 87%, #8B5CF6B3 90%, #8B5CF6E6 93%, #8B5CF6FF 96%, #8B5CF6FF 100%);
          overflow: hidden;
          transition: transform 0.6s ease-in-out;
        }
        .gradient-wrapper:hover {
          animation: spin 0.6s ease-in-out forwards;
        }
        .gradient-wrapper:hover .gradient-button {
          animation: spin-reverse 0.6s ease-in-out forwards;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
      <div className="gradient-wrapper">
        <button
          className="gradient-button"
          style={{
            borderRadius: "62px",
            border: "0.5px solid rgba(255, 255, 255, 0.07)",
            boxShadow:
              "inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 0 30px oklch(0.7 0.18 295 / 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "299px",
            height: "84px",
            padding: "12px 28px",
            background: "rgba(0, 0, 0, 0.80)",
            backdropFilter: "blur(6.451948165893555px)",
            color: "#fff",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px",
            fontWeight: 500,
            letterSpacing: "0.3px",
            cursor: "pointer",
            transition: "transform 0.6s ease-in-out",
          }}
          onClick={() => console.log("Scanning started")}
        >
          Start Scanning
        </button>
      </div>
    </>
  );
};

export default StartScanningButton;
