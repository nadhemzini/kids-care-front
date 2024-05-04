import { IClass } from "./IClass"
import { IParent } from "./IParent"

export interface IEnfant {
    id: number
    fullname: string
    image: File | null
    gender: string
    parents: IParent
    classes: IClass
    parent_id: number
    class_id: number
}
