export interface DecodedJWT {
	exp: number;
	iat: number;
	jti: string;
	name: string;
	token_type: 'access' | 'refresh' | '2fa';
	user_id: number;
}
