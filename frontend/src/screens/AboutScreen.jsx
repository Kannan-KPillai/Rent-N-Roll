import React from 'react';

const AboutScreen = () => {
  return (
    <div style={{ height: '65rem', padding: '4rem', textAlign: 'center' }}>
      <h1 style={{ paddingBottom: '2rem', fontWeight: 'bold', color: 'red',fontFamily: 'Mina, sans-serif'  }}>
        ABOUT US
      </h1>

      <div style={{paddingBottom:'2rem'}}>
        <h2 style={{ fontWeight: 'bold' , color: 'black'}}>
          RENT <span style={{ color: 'red' }}>N</span> ROLL : Redefining Car Rental Experiences
        </h2>
        <h4 style={{ color: 'black' }}>
          Welcome to Rent N Roll, your gateway to a revolutionary car rental experience that's designed to transform the way you travel. We're not just a car rental platform; we're a community of car enthusiasts, adventure seekers, and forward-thinkers who believe in the power of shared mobility.
        </h4>
      </div>

      <div style={{paddingBottom:'2rem'}}>
        <h2 style={{ fontWeight: 'bold', color: 'black'}}>Our Vision: Driving Change, Together</h2>
        <h4 style={{  color: 'black' }}>
          At Rent N Roll, our vision is clear - to drive change in the way we access and experience transportation. We envision a world where every parked car becomes an opportunity, where owners can effortlessly share their vehicles and renters can embark on journeys with convenience and style.
        </h4>
      </div>

      <div style={{paddingBottom:'2rem'}}>
        <h2 style={{ fontWeight: 'bold', color: 'black'}}>Our Mission: Empowering You on the Go</h2>
        <h4 style={{ color: 'black' }}>
          Our mission is simple yet impactful - to empower you on the go. Whether you're a car owner looking to monetize your parked asset or a traveler seeking a reliable and diverse range of vehicles, Rent N Roll is your trusted partner. We bridge the gap, creating a win-win scenario that benefits both owners and renters.
        </h4>
      </div>

      <div style={{paddingBottom:'2rem'}}>
        <h2 style={{ fontWeight: 'bold', color: 'black' }}>Safety and Trust: Our Top Priority</h2>
        <h4 style={{  color: 'black' }}>
          Safety and trust are the cornerstones of Rent N Roll. We take every step to ensure that each vehicle and user on our platform undergoes a stringent verification process. Your peace of mind matters to us, and we're committed to building a community where trust flourishes.
        </h4>
      </div>

      <div style={{paddingBottom:'2rem'}}>
        <h2 style={{ fontWeight: 'bold', color: 'black' }}>The Road Ahead: Exciting Possibilities</h2>
        <h4 style={{ color: 'black' }}>
          The road ahead for Rent N Roll is filled with exciting possibilities. We're constantly innovating, expanding our offerings, and enhancing your experience. Stay tuned for new features, partnerships, and adventures that await you. Thank you for being a part of the Rent N Roll family. We're here to redefine your travel experiences, one rental at a time. Let's roll into a future where convenience, choice, and community converge.
        </h4>
      </div>
    </div>
  );
};

export default AboutScreen;
