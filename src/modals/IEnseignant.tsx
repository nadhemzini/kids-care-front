import { IClass } from "./IClass"
import { IMatiere } from "./IMatiere"

export interface IEnseignant {
    id: number
    fullname: string
    email: string
    telephone: string
    image: File | null
    gender: string
    role?: string
    classes?: IClass[]
    matieres?: IMatiere[]

}
