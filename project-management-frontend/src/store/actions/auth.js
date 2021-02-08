import * as actionTypes from "../actions/actionTypes";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, name) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
        name:name
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("name")
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

export const auth = (email, password, isSignUp, name) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
            name: name
        };

        let url = "http://localhost:8080/auth/signup";
        let method = 'PUT'

        if (!isSignUp) {
            url = "http://localhost:8080/auth/login";
            method = "POST"
        }
        fetch(url, {
    method: method,
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        name: authData.name
    })
})
    .then(res => {
        if (res.status === 422) {
            throw new Error('Validation failed.');
        }
        else if(res.status !== 200 && res.status !== 201) {
            throw new Error('Could not authenticate you!');
        }
        return res.json();
    })
    .then(resData => {
        dispatch(authSuccess(resData.token, resData.userId, resData.name));
        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.userId);
        localStorage.setItem('name', resData.name);
        console.log("token is now", localStorage.getItem("token"));
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
            new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        dispatch(checkAuthTimeout(remainingMilliseconds));
    })
    .catch(error => {
        dispatch(authFail(error))
    })
    }
};

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem("expiryDate"));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem("userId");
                dispatch(authSuccess(token, userId));
                dispatch(
                    checkAuthTimeout(
                        (expirationDate.getTime() - new Date().getTime())
                    )
                );
            }
        }
    };
};
