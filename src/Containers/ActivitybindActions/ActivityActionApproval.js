import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  loadActivities,
  addActivity,
  editActivity,
  removeActivity,
} from '../../redux/ActivityRedux/actions/activityActions';

const mapStateToProps = (state) => ({
  activities: state.activityState.activities,
  error: state.activityState.error,
});

const mapDispatchToProps = (dispatch) => 
  bindActionCreators(
    {
      loadActivities,
      addActivity,
      editActivity,
      removeActivity,
    },
    dispatch
  );

const ActivityApproval = (Component) =>
  connect(mapStateToProps, mapDispatchToProps)(Component);

export default ActivityApproval;
