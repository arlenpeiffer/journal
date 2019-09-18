import {
  ADD_ENTRY,
  EDIT_ENTRY,
  GET_JOURNAL,
  REMOVE_ENTRY
} from '../../../redux/actions';
import {
  addEntry,
  startAddEntry,
  editEntry,
  startEditEntry,
  getJournal,
  startGetJournal,
  removeEntry,
  startRemoveEntry
} from '../../../redux/actions/journal';
import { journal } from '../../testData';
import { database } from '../../../firebase';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import omit from 'lodash.omit';

const createMockStore = configureMockStore([thunk]);
const editedEntry = omit(journal[1], 'id');
const entry = omit(journal[0], 'id');
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
  test('should generate ADD_EXPENSE action object', () => {
    const action = addEntry(entry);
    expect(action).toEqual({
      type: ADD_ENTRY,
      payload: { entry }
    });
  });

  test('should generate EDIT_ENTRY action object', () => {
    const { id } = journal[0];
    const action = editEntry(editedEntry, id);
    expect(action).toEqual({
      type: EDIT_ENTRY,
      payload: { editedEntry, id }
    });
  });

  test('should generate GET_JOURNAL action object', () => {
    const action = getJournal(journal);
    expect(action).toEqual({
      type: GET_JOURNAL,
      payload: { journal }
    });
  });

  test('should generate REMOVE_ENTRY action object', () => {
    const { id } = journal[1];
    const action = removeEntry(id);
    expect(action).toEqual({
      type: REMOVE_ENTRY,
      payload: { id }
    });
  });
});

describe('async action tests', () => {
  const setupFirebaseJournal = arr => {
    const firebaseJournal = {};
    arr.forEach(entry => {
      firebaseJournal[entry.id] = { ...entry, id: null };
    });
    return firebaseJournal;
  };

  test('should add entry to Firebase and Redux', done => {
    database
      .ref(`users/${userId}/journal`)
      .set(setupFirebaseJournal([]))
      .then(() => {
        const store = createMockStore(userInfo);
        store
          .dispatch(startAddEntry(entry))
          .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
              type: ADD_ENTRY,
              payload: {
                entry: {
                  ...entry,
                  id: expect.any(String)
                }
              }
            });
            return database
              .ref(`users/${userId}/journal/${actions[0].payload.entry.id}`)
              .once('value');
          })
          .then(snapshot => {
            expect(snapshot.val()).toEqual(entry);
            done();
          });
      });
  });

  test('should modify entry in Firebase and Redux', done => {
    database
      .ref(`users/${userId}/journal/`)
      .set(setupFirebaseJournal([journal[0]]))
      .then(() => {
        const { id } = journal[0];
        const store = createMockStore(userInfo);
        store
          .dispatch(startEditEntry(editedEntry, id))
          .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
              type: EDIT_ENTRY,
              payload: { editedEntry, id }
            });
            return database.ref(`users/${userId}/journal/${id}`).once('value');
          })
          .then(snapshot => {
            expect(snapshot.val()).toEqual(editedEntry);
            done();
          });
      });
  });

  test('should get entries from Firebase and store them in Redux', done => {
    database
      .ref(`users/${userId}/journal`)
      .set(setupFirebaseJournal(journal))
      .then(() => {
        const store = createMockStore(userInfo);
        store.dispatch(startGetJournal()).then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual({
            type: GET_JOURNAL,
            payload: { journal }
          });
          done();
        });
      });
  });

  test('should remove entry from Firebase and Redux', done => {
    database
      .ref(`users/${userId}/journal`)
      .set(setupFirebaseJournal(journal))
      .then(() => {
        const { id } = journal[1];
        const store = createMockStore(userInfo);
        store
          .dispatch(startRemoveEntry(id))
          .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
              type: REMOVE_ENTRY,
              payload: { id }
            });
            return database.ref(`users/${userId}/journal/${id}`).once('value');
          })
          .then(snapshot => {
            expect(snapshot.val()).toEqual(null);
            done();
          });
      });
  });
});
