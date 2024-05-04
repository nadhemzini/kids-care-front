import { IEnseignant } from "./IEnseignant"

export interface IHomework {
    enseignants?: IEnseignant
    id: number
    title: string
    description: string
    enseignant_id?: number | null

}
