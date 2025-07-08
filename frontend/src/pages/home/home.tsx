
const Home: React.FC = () => {
  return (
    <section 
      id="hero"
      style={{ 
        height: '400px', 
        backgroundImage: 'url(https://via.placeholder.com/1200x400)', 
        backgroundSize: 'cover',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '32px',
        fontWeight: 'bold'
      }}
    >
      Welcome in the TEST.
    </section>
  );
};

export default Home;