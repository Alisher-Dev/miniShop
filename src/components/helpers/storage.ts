export function FindStorage(name: string) {
  return localStorage.getItem(name);
}

export function AddStorage(name: string, data: any) {
  localStorage.setItem(name, data);
}
