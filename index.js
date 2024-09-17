const decrypt = (jwt) => {
  try {
    const [header, payload, signature] = jwt.split(".");
    if (!header || !payload || !signature)
      throw new Error("invalid jwt format");

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "===".slice(0, (4 - (base64.length % 4)) % 4);
    const decoded = atob(base64 + padding);
    const parsed = JSON.parse(decoded);

    if (!parsed.hasOwnProperty("exp"))
      throw new Error("no exp field found in claims");
    if (parsed.exp < Date.now() / 1000) throw new Error("token expired");

    return parsed;
  } catch (error) {
    console.error(`jwt decryption failed: ${error.message}`);
  }
};

const invalidFormat = "invalid";
const invalidAtob =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikplc3NlIiwiaWF0IjoxNTE2MjM5MDIyLCJle.JndOwtjd2ON8L3tFILyApwRe10YhkYmXmpEpc0wvuvY";
const invalidParse = "ey.eyK._D";
const invalidNoExp =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikplc3NlIiwiaWF0IjoxNTE2MjM5MDIyfQ._DlXUGrDP-vOcPb7fsHbDebLromT-D1mNR0p4Q6KFNI";
const invalidExp =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikplc3NlIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.JndOwtjd2ON8L3tFILyApwRe10YhkYmXmpEpc0wvuvY";

const res = decrypt(invalidAtob);

console.log(res);
