import { FieldTypes } from '../enums/survey-field-types'

export interface FormFields {
  type: FieldTypes
  label?: string
  options?: string[]
  matrixRow?: string[]
  matrixColumn?: string[]
}
