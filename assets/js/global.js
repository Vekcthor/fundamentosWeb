async function sha256(string) {
  // Create a TextEncoder object
  const encoder = new TextEncoder();
  // Encode the string as a Uint8Array of UTF-8 bytes
  const data = encoder.encode(string);
  // Use the crypto.subtle.digest method to create a Promise that resolves to an ArrayBuffer containing the hash
  const hash = crypto.subtle.digest("SHA-256", data);
  // Use the Promise.then method to handle the resolved value
  const buffer = await hash;
  // Convert the ArrayBuffer to an array of bytes using the Uint8Array constructor
  const bytes = new Uint8Array(buffer);
  // Convert each byte to a hexadecimal string using the toString method with 16 as the radix
  // Use the padStart method to ensure each byte has two digits
  // Join the array of hexadecimal strings into one string using the join method
  const hex = bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return hex;
}
