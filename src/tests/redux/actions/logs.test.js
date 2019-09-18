import {
  ADD_FOOD,
  ADD_MOVEMENT,
  ADD_NSAID,
  ADD_SUPPLEMENT,
  GET_LOGS,
  REMOVE_SUPPLEMENT
} from '../../../redux/actions';
import {
  addFood,
  startAddFood,
  addMovement,
  startAddMovement,
  addNsaid,
  addSupplement,
  getLogs,
  startGetLogs,
  startAddSupplement,
  removeSupplement,
  startRemoveSupplement
} from '../../../redux/actions/logs';
import { logs } from '../../testData';
import { database } from '../../../firebase';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const createMockStore = configureMockStore([thunk]);
const food = 'matcha latte';
const movement = 'swimming';
const nsaid = 'Celebrex';
const supplements = ['B-12', 'Cod Liver Oil'];
const userId = 'testUser';
const userInfo = {
  user: {
    userInfo: {
      id: userId,
      isLoggedIn: true
    }
  }
};

describe('action generator tests', () => {
  test('should generate ADD_FOOD action object', () => {
    const action = addFood(food);
    expect(action).toEqual({
      type: ADD_FOOD,
      payload: { food }
    });
  });

  test('should generate ADD_MOVEMENT action object', () => {
    const action = addMovement(movement);
    expect(action).toEqual({
      type: ADD_MOVEMENT,
      payload: { movement }
    });
  });

  test('should generate ADD_NSAID action object', () => {
    const action = addNsaid(nsaid);
    expect(action).toEqual({
      type: ADD_NSAID,
      payload: { nsaid }
    });
  });

  test('should generate ADD_SUPPLEMENT action object', () => {
    const supplement = supplements[0];
    const action = addSupplement(supplement);
    expect(action).toEqual({
      type: ADD_SUPPLEMENT,
      payload: { supplement }
    });
  });

  test('should generate GET_LOGS action object', () => {
    const action = getLogs(logs);
    expect(action).toEqual({
      type: GET_LOGS,
      payload: { logs }
    });
  });

  test('should generate REMOVE_SUPPLEMENT action object', () => {
    const supplement = supplements[1];
    const action = removeSupplement(supplement);
    expect(action).toEqual({
      type: REMOVE_SUPPLEMENT,
      payload: { supplement }
    });
  });
});

describe('async action tests', () => {
  beforeEach(done => {
    database
      .ref(`users/${userId}/logs`)
      .set(logs)
      .then(() => done());
  });

  test('should add food to Firebase and Redux', done => {
    const store = createMockStore(userInfo);
    store
      .dispatch(startAddFood(food))
      .then(ref => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: ADD_FOOD,
          payload: { food }
        });
        return database
          .ref(`users/${userId}/logs/food/${ref.key}`)
          .once('value');
      })
      .then(snapshot => {
        expect(snapshot.val()).toEqual(food);
        done();
      });
  });

  test('should add movement to Firebase and Redux', done => {
    const store = createMockStore(userInfo);
    store
      .dispatch(startAddMovement(movement))
      .then(ref => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: ADD_MOVEMENT,
          payload: { movement }
        });
        return database
          .ref(`users/${userId}/logs/movement/${ref.key}`)
          .once('value');
      })
      .then(snapshot => {
        expect(snapshot.val()).toEqual(movement);
        done();
      });
  });

  test('should add supplement to Firebase and Redux', done => {
    const supplement = supplements[0];
    const store = createMockStore(userInfo);
    store
      .dispatch(startAddSupplement(supplement))
      .then(ref => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: ADD_SUPPLEMENT,
          payload: { supplement }
        });
        return database
          .ref(`users/${userId}/logs/supplements/${ref.key}`)
          .once('value');
      })
      .then(snapshot => {
        expect(snapshot.val()).toEqual(supplement);
        done();
      });
  });

  test('should get logs from Firebase and store them in Redux', done => {
    const store = createMockStore(userInfo);
    store.dispatch(startGetLogs()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: GET_LOGS,
        payload: { logs }
      });
      done();
    });
  });

  test('should remove supplement from Firebase and Redux', done => {
    const supplement = supplements[1];
    const store = createMockStore(userInfo);
    store
      .dispatch(startRemoveSupplement(supplement))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: REMOVE_SUPPLEMENT,
          payload: { supplement }
        });
        return database.ref(`users/${userId}/logs/supplements`).once('value');
      })
      .then(snapshot => {
        expect(snapshot.val()).toEqual(
          expect.not.objectContaining({
            [expect.any(String)]: supplement
          })
        );
        done();
      });
  });
});
