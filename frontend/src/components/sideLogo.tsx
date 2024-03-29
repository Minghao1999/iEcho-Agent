
const SideLogo = () => {
  const logoStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    fontWeight: 'bolder',
    fontSize: 'larger',
    border: '1px solid black',
    backgroundImage: `linear-gradient(
      to right bottom,
      #f8d163 0%,
      #f8d163 33.33%,
      #d8fce3 33.33%,
      #d8fce3 66.66%,
      #7cb789 66.66%,
      #7cb789 100%,
      white 100% /* White color stop at 100% */
    )`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    transform: 'rotate(45deg)', // Rotate by 45 degrees
    margin: '20px', // Add some margin
  };

  // Media query for smaller screens (e.g., mobile)
  const smallerScreen = '@media (max-width: 768px)';

  // Responsive styles for smaller screens
  const responsiveStyles = {
    [smallerScreen]: {
      width: '50%', // Adjust width for smaller screens
      fontSize: 'smaller', // Adjust font size for smaller screens
    },
  };

  return (
    <aside style={{ ...logoStyle, ...responsiveStyles[smallerScreen] }}>
      <img 
        src="../../assets/logo.svg" 
        alt="Logo" 
        style={{ maxWidth: '100%', height: 'auto' }} // Make the image responsive
      />
    </aside>
  );
};

export default SideLogo;
