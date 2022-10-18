import updateAll from './update.mjs';
import writeReadme from './writeMd.mjs';

const newAdded = await updateAll();
if(newAdded.length > 0){
  writeReadme(newAdded);
}
