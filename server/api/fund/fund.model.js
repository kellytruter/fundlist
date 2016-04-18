'use strict';

import mongoose from 'mongoose';

var FundSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Fund', FundSchema);
