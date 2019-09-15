export const url = 'http://10.32.223.68:8000/web';
export const epidemiasRoute = url + '/epidemias';
export const epidemiasArea = (lat: number, lng: number) =>
    url + `/doencas-coord/${lat}/${lng}`;
export const getDoencas = url + '/doencas';
export const cadastraMedico = url + '/registra-medico';
export const enviaDadosInputcard = url + '/inclui';
export const doencasRoute = url + '/doencas2';
