import Accelerometer from "./handlers/accel";

try {
  const a = new Accelerometer();

  a.init();
a.readBlock();
} catch (err) {
  console.error(`Main failed with: ${err}`);
}
