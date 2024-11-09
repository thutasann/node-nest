function getUser() {
	return { id: 1, name: 'Alice' };
}

type ReturnUser = ReturnType<typeof getUser>;

const return_user: ReturnUser = { id: 1, name: 'ok' };
