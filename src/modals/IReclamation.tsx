import { IParent } from "./IParent"

export interface IReclamation {
    parents: IParent
    id: number
    title: string
    statue: boolean
    description: string
    parent_id: number

}
