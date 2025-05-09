import type { Greeting } from '../types/Greeting'

export class GreetingModel {
  private readonly data: Greeting

  constructor(id: number, name: string) {
    this.data = {
      id,
      name,
      message: `Hi ${name}, welcome back!`,
    }
  }

  getGreeting(): Greeting {
    return this.data
  }
}
