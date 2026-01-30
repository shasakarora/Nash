CREATE TABLE transactions(
	id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
	bet_id NOT NULL REFERENCES bets(id),
	user_id NOT NULL REFERENCES users(id),
	amount NUMERIC NOT NULL,
	description TEXT NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT NOW()
);