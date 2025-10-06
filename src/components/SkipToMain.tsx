// Accessibility: Skip to main content link
// Allows keyboard users to skip navigation and go directly to main content

const SkipToMain = () => {
  return (
    <a
      href="#main-content"
      className="skip-to-main"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
};

export default SkipToMain;