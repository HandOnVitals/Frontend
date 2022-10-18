export interface LoginBaseFormData {
	email: string;
	password: string;
}

export interface Login2FAFormData {
	otp1: string;
	otp2: string;
	otp3: string;
	otp4: string;
	otp5: string;
	otp6: string;
}

export interface Token2FA {
	'2faAccess': string;
}

export interface TokensAccess {
	access: string;
	refresh: string;
}

export interface AccessFormData {
	snsNumber: string;
}

export interface RefreshToken {
	access: string;
}
