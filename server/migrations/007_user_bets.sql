CREATE TABLE user_bets(
	id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
	bet_id UUID REFERENCES bets(id) ON DELETE CASCADE,
	user_id UUID REFERENCES users(id) ON DELETE CASCADE,
	amount NUMERIC NOT NULL,
	selected_option TEXT NOT NULL,
	status TEXT NOT NULL DEFAULT "active",
	created_at TIMESTAMP NOT NULL DEFAULT NOW()
);