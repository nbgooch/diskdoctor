import i2c from 'i2c-bus';
import 'dotenv/config';
import lsm6dsl from '../config/lsm6dsl';

export default class Accelerometer {
  bus: any
  config: any;
  counter: number;
  sensitivity: number;
  constructor() {
    console.log(`Creating accelerometer bus`);
    try {
      this.sensitivity = .122;
      this.counter = 0;
      this.config = lsm6dsl;
      this.bus = i2c.openSync(1);
    } catch (err: any) {
      console.error(`Failed to create accelerometer ${err}`);
      throw err;
    }
  }


    
  init() {
    console.log(`Initializing..`)
    try {
      // const wBuf = Buffer.from([0b10011111,0b11001000,0b01000100])
      // ODR 3.33 KHz, +/- 4g , BW = 400hz 0b10011111 0x9F
      this.bus.writeByteSync(this.config.LSM6DSL_ADDRESS, this.config.LSM6DSL_CTRL1_XL, 0b10011011);
      // Low pass filter enabled, BW9, composite filter 0b11001000 0xC8
      this.bus.writeByteSync(this.config.LSM6DSL_ADDRESS, this.config.LSM6DSL_CTRL8_XL, 0b11001000);
      // Enable Block Data update, increment during multi byte read 0b01000100 0x44
      this.bus.writeByteSync(this.config.LSM6DSL_ADDRESS, this.config.LSM6DSL_CTRL3_C, 0b01000100);

    } catch (e) {
      console.error(`Failed to initialize: ${e}`)
      throw e;
    } finally {
      console.log(`Finished initializing`);
    }
  }

  async readBlock() {
    console.log(`Reading...`)
    let loop = 10;
    while (this.counter < loop){
      let buf = Buffer.alloc(6);

      try {
        const bytes = this.bus.readI2cBlockSync(this.config.LSM6DSL_ADDRESS, this.config.LSM6DSL_OUTX_L_XL, buf.length, buf);
      } catch (err) {
        throw err;
      }
      this.calculateGs(buf);

      this.counter++;
      await new Promise(resolve => setTimeout(resolve, 2000));

    
    }
    console.log(`Successfully read ${loop} times`)
  }

  reusableCallback(err, res) {
    if (err) {
      console.error(`Recieved error: ${err}`);
      throw err;
    } else if (res) {
      console.log(`Read: ${res}`);
      return res;
    } else {
      console.log(`Wrote successfully`);
    }
  }

  calculateGs(buffer: Buffer) {
    let raw = [];
    raw[0] = (((buffer[0] | buffer[1] << 8) * this.sensitivity) / 1000);
    raw[1] = (((buffer[2] | buffer[3] << 8) * this.sensitivity) / 1000);
    raw[2] = (((buffer[4] | buffer[5] << 8) * this.sensitivity) / 1000);
    console.log(`Calculated gs
    x: ${raw[0]}
    y: ${raw[1]}
    z: ${raw[2]}`);
    return raw;
  }

}