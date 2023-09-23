import React from "react";

const OwnerTermsNConditions = () => {
  return (
    <div
      style={{
        height: "60rem",
        padding: "4rem",
        paddingLeft: "6rem",
        paddingRight: "6rem",
      }}
    >
      <h1 style={{ textAlign: "center", fontFamily: "Mina, sans-serif" }}>
        TERMS & CONDITIONS
      </h1>
      <h3 style={{ color: "black", paddingTop: "2rem" }}>
        We appreciate your interest in listing your vehicle with RENT
        <span style={{ color: "red" }}> N</span> ROLL. We want to inform you
        about our pricing structure, which is tailored to different vehicle
        categories and is governed by our terms and policies.
      </h3>

      <div>
        <h3 style={{ color: "black", paddingTop: "2rem" }}>
         <span style={{fontWeight: 'bold'}}>1. Customized Pricing:</span>  We understand that each vehicle is unique, and
          its value may vary depending on factors such as make, model, age, and
          condition. Hence, we allow you to set a rental price that reflects
          your car's individual characteristics. This ensures that you receive
          fair compensation for sharing your vehicle with our community of
          responsible renters.
        </h3>
      </div>
      <div>
        <h3 style={{ color: "black", paddingTop: "2rem" }}>
         <span style={{fontWeight: 'bold'}}>2. Additional Kilometer Charges:</span>  Additionally, we offer flexibility in
          managing extra kilometers driven during the rental period. The charges
          for additional kilometers are based on the category of your vehicle
          and are aligned with our policy to ensure fairness for both owners and
          renters.
        </h3>
      </div>
      <div>
        <h3 style={{ color: "black", paddingTop: "2rem" }}>
          Please rest assured that our goal is to create a transparent and
          mutually beneficial experience for all parties involved. By allowing
          you to customize your pricing and outlining additional kilometer
          charges according to the vehicle category, we aim to provide a clear
          understanding of how your earnings are determined.
        </h3>
      </div>
      <div>
        <h3 style={{ color: "black", paddingTop: "2rem" }}>
          We invite you to visit our platform and log in to your owner account,
          where you can find detailed information about setting rental rates,
          specifying extra kilometer charges, and reviewing our comprehensive
          terms and policies. Should you have any questions or require further
          assistance, our dedicated support team is available to guide you
          through the process.
        </h3>
      </div>
    </div>
  );
};

export default OwnerTermsNConditions;
