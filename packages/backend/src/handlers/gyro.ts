import i2c from 'i2c-bus';
import 'dotenv/config';

export default class Gyroscope {
  bus: any;
  address: any;
  constructor() {
    this.bus = i2c.openSync(1);
    this.address = process.env.GYROSCOPE_ADDRESS;
    this.init();
  }
    
  init() {
    // ODR 3.3 kHz, 2000 dps
    this.bus.i2cWriteSync(this.address, 0b10011100);
  }

}