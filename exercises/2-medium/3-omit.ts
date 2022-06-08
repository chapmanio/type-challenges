/*
  3 - Omit
  -------
  by Anthony Fu (@antfu) #medium #union #built-in

  ### Question

  Implement the built-in `Omit<T, K>` generic without using it.

  Constructs a type by picking all properties from `T` and then removing `K`

  For example

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyOmit<Todo, 'description' | 'title'>

  const todo: TodoPreview = {
    completed: false,
  }
  ```

  > View on GitHub: https://tsch.js.org/3
*/


/* _____________ Your Code Here _____________ */

/*
  NOTES
  - `keyof` is used to create a union of all keys, eg. `'description' | 'completed'`
  - `keyof any` = `string | number | symbol` which are the allowed types for an object
  - `extends` creates a conditional statement, e.g.  T extends K = if T is assignable to the type K
  - Using `never` with the `extends` conditional means the key will not be included/is ignored
*/

type MyPick<ObjectType, Keys extends keyof ObjectType> = {
  [Property in Keys]: ObjectType[Property];
};

type MyExclude<UnionType, KeyToExclude> = UnionType extends KeyToExclude ? never : UnionType;

type MyOmit<ObjectType, Keys extends keyof any> = MyPick<ObjectType, MyExclude<keyof ObjectType, Keys>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
]

type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3/answer
  > View solutions: https://tsch.js.org/3/solutions
  > More Challenges: https://tsch.js.org
*/
