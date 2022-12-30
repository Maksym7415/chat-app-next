import jwtDecode from 'jwt-decode';

export const jwtdecode = token => jwtDecode(token);
