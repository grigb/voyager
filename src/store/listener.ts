import {Query} from 'compassql/build/src/query/query';
import {Store} from 'redux';
import {Data} from 'vega-lite/build/src/data';
import {State} from '../models/index';
import {dispatchQueries} from '../queries/index';
import {selectData, selectQuery} from '../selectors/index';

export function createQueryListener(store: Store<State>) {
  let data: Data;
  let query: Query;
  return () => {
    const state = store.getState();
    const previousQuery = query;
    query = selectQuery(state);

    const previousData = data;
    data = selectData(state);

    if (!data) {
      return;
    }

    // Check if either query or data has changed, need to submit a new query.
    if (previousQuery !== query || previousData !== data) {
      dispatchQueries(store, query);
    }
  };
}
