import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { ipcRenderer } from 'electron';
import axios from 'axios';

import { changeCategory, deleteActivity } from '../actions/activityActions'
import ProductivityScore from './ProductivityScore.jsx';
import ActivityGroup from '../components/DashboardView/ActivityGroup.jsx';

import Paper from 'material-ui/Paper';

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const {activities, changeCategory, deleteActivity, preferences, user } = this.props;
    return (
      <div style={{background: '#555'}}>
        <Paper style={{display: 'inline-block', background: '#AAA', margin: '0', padding: '5px', width: '75%', minHeight: '500px', maxHeight: '550px', overflowY: 'scroll', verticalAlign: 'top'}}>
          <ActivityGroup
            category='productive'
            activities={activities.productive}
            changeCategory={changeCategory}
            deleteActivity={deleteActivity}
            preferences={preferences}
            user={user}
          />
          <ActivityGroup
            category='neutral'
            activities={activities.neutral}
            changeCategory={changeCategory}
            deleteActivity={deleteActivity}
            preferences={preferences}
            user={user}
          />
          <ActivityGroup
            category='distracting'
            activities={activities.distracting}
            changeCategory={changeCategory}
            deleteActivity={deleteActivity}
            preferences={preferences}
            user={user}
          />
        </Paper>
        <Paper style={{display: 'inline-block', background: '#BBB', margin: '0', padding: '5px', width: '20%', minHeight: '500px', maxHeight: '550px', verticalAlign: 'top'}}>
          <ProductivityScore />
        </Paper>
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  activities: state.activities,
  preferences: state.preferences,
  user: state.user.user
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (activity, oldCat, newCat, user) => {
      // console.log('user trying to change cats is', user)
      if (oldCat !== newCat) dispatch(changeCategory(activity, oldCat, newCat, user));
    },
    deleteActivity: (activity, category, isTracked) => {
      console.log('dispatching deleteActivity and isTracked is:', isTracked)
      dispatch(deleteActivity(activity, category, isTracked));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);

