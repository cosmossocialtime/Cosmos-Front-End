export function saveFormData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
}
 
export function getFormData(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}
 
export function clearFormData(key: string) {
    localStorage.removeItem(key);
}