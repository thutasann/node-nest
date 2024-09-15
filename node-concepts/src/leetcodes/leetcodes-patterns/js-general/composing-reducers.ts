interface IState {
	count: number;
	loggedIn: boolean;
}

interface IAction {
	type: 'INCREMENT' | 'DECREMENT' | 'LOGIN' | 'LOGOUT';
}

const counterReducer = (state: number, action: IAction): number => {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
};

const authReducer = (state: boolean, action: IAction): boolean => {
	switch (action.type) {
		case 'LOGIN':
			return true;
		case 'LOGOUT':
			return false;
		default:
			return state;
	}
};

const rootReducer = (state: IState, action: IAction): IState => {
	return {
		count: counterReducer(state.count, action),
		loggedIn: authReducer(state.loggedIn, action),
	};
};

const initialState: IState = { count: 0, loggedIn: false };
const actions: IAction[] = [
	{
		type: 'INCREMENT',
	},
	{ type: 'LOGIN' },
];

const finalState = actions.reduce(rootReducer, initialState);
console.log('finalState', finalState);
