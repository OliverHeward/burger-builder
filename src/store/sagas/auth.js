import axios from 'axios';
import { delay } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';
import * as actions from '../actions/index';
/*

 *  turns the function into a generator, its a next generation javascript feature.
    It is a function that executes incrementally, this means we can call them but they don't start and    execute immediately. But we can pause them during function execution to wait for Async code to finish first.

    For our localStorage code to work, we have to prepend 'yield' to the start of them 
    This simply means, that this should be finished before it moves onto the next step.
    So this will work going token => expirationDate => localId => put()


 */

export function* logoutSaga(action) { 
    yield call([localStorage, 'removeItem'], "token");
    yield call([localStorage, 'removeItem'], "expirationDate");
    yield call([localStorage, 'removeItem'], "localId");
    yield put(actions.logoutSucceed());
};

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
};

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
        
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyACLd9WV5rvrKhX235dOvX6KRvqhn3xIsM';

    if(!action.isSignup){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACLd9WV5rvrKhX235dOvX6KRvqhn3xIsM';
    };

    try {
        const response = yield axios.post(url, authData);
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.userId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
        yield put(actions.authFail(error.response.data.error));
    }
};

export function* authCheckStateSaga(action) {
        const token = yield localStorage.getItem('token');
        if (!token) {
            yield put(actions.logout());
        } else {
            const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                yield put(actions.logout());
        } else {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
};