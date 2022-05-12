import PropTypes from 'prop-types';
import { OpCode } from '../types/types';
export function Progress({ progress }: {progress: OpCode | null}) {
  return (<div>
    <div>Progress:</div>
    <div className="loading"></div>
    {progress ? <div>{progress.name} {progress.fee} gas</div> : <div>initializing...</div>}
  </div>)
}

Progress.propTypes = {
  progress: PropTypes.object
};