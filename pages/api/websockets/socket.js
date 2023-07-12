export default function handler(req, res) {
  console.log("Test Websocket Connection");
  res.status(200).json({ message: "Connection established" });
}
