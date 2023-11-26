import i2c from 'i2c-bus';
import 'dotenv/config';
import lsm6dsl from '../config/lsm6dsl';

export default class Gyroscope {
  bus: any;
  config: any;
  constructor() {
    this.config = lsm6dsl;
    this.bus = i2c.openSync(1);
  }
    
  init() {
    console.log(`Initializing..`)
    try {
      // ODR 3.33 KHz, 2000dps
      this.bus.writeByteSync(this.config.LSM6DSL_ADDRESS, this.config.LSM6DSL_CTRL2_6, 0b10011100);

    } catch (e) {
      console.error(`Failed to initialize: ${e}`)
      throw e;
    } finally {
      console.log(`Finished initializing`);
    }
  }

}