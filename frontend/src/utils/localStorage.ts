
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export function setOnLocalStorage (key: string, value: string): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.log(err)
  }
}

export function getFromLocalStorage (key: string, initialState: any): any {
  try {
    const value = localStorage.getItem(key)
    const user = value ? JSON.parse(value) : initialState

    if (user) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        petPreference: user.petPreference,
        admin: user.admin
      }
    }
  } catch (err) {
    console.log(err)
  }
}
