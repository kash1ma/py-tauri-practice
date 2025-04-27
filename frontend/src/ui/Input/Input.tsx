import React, { FC } from "react"
import styles from "./Input.module.css"
import { TypesInput } from "../../types/enums/InputEnums"


interface IInputProps {
    initialValue: string | number
    type: TypesInput
    min?: number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<IInputProps> = ({initialValue, type, onChange, min}) => {


  return (
    <div>
        <input type={type} min={min} onChange={onChange} value={initialValue} />
    </div>
  )
}

export default Input
