import { useEffect, useState } from "react";
import { SignJWT, jwtVerify } from "jose";

function App() {
  const payload = { userId: 123, name: "John Doe" };
  const secret = "your-256-bit-secret";
  const [cJwt, setCJwt] = useState("");
  const [vPJwt, setVPJwt] = useState("");
  const [vHJwt, setVHJwt] = useState("");

  const createToken = async () => {
    try {
      // Encode the secret key as a Uint8Array
      const secretKey = new TextEncoder().encode(secret);

      // Create the JWT
      const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(secretKey);

      console.log("JWT:", jwt);
      setCJwt(jwt);
      // Verify the JWT
      verifyToken(jwt, secretKey);
    } catch (error) {
      console.error("Error creating JWT:", error);
    }
  };

  const verifyToken = async (token, key) => {
    try {
      const { payload, protectedHeader } = await jwtVerify(token, key);
      console.log("Verified payload:", payload);
      console.log("Protected header:", protectedHeader);
      setVPJwt(payload);
      setVHJwt(protectedHeader);
    } catch (error) {
      console.error("Error verifying JWT:", error);
    }
  };

  useEffect(() => {
    createToken();
  }, []);

  return (
    <div>
      <h1>React JWT Example</h1>
      <h5>{cJwt}</h5>
      <h5>{JSON.stringify(vPJwt)}</h5>
      <h5>{JSON.stringify(vHJwt)}</h5>
    </div>
  );
}

export default App;
