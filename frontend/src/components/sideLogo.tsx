
const SideLogo = () => {
  const logoStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
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
    transform: 'rotate(45deg)' // Rotate by 45 degrees
  };

  return (
    <aside style={logoStyle}>
      <img src="../../public/assets/logo.svg" alt="Logo" />
    </aside>
  );
};

export default SideLogo;
